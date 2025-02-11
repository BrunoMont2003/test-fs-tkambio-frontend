import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Report, PaginationMetadata } from '../types/Report';
import { reportsService } from '../services/report';

export function useReports() {
  const route = useRoute();
  const router = useRouter();

  const reports = ref<Report[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const metadata = ref<PaginationMetadata>({
    totalReports: 0,
    currentPage: 1,
    totalPages: 1
  });

  const fetchReports = async (page?: number) => {
    try {
      isLoading.value = true;
      error.value = null;
      const currentPage = page || Number(route.query.page) || 1;

      const response = await reportsService.listReports(currentPage);
      reports.value = response.reports;
      metadata.value = response.metadata;

      if (currentPage !== Number(route.query.page)) {
        await router.replace({
          query: { ...route.query, page: currentPage.toString() }
        });
      }
    } catch (e) {
      error.value = 'Error al cargar los reportes';
      console.error(e);
    } finally {
      isLoading.value = false;
    }
  };

  watch(
    () => route.query.page,
    (newPage) => {
      if (newPage && Number(newPage) !== metadata.value.currentPage) {
        fetchReports(Number(newPage));
      }
    }
  );

  const changePage = async (page: number) => {
    await router.push({
      query: { ...route.query, page: page.toString() }
    });
  };

  const downloadReport = async (reportLink: string) => {
    try {
      window.open(reportLink, '_blank');
    } catch (e) {
      error.value = 'Error al descargar el reporte';
      console.error(e);
    }
  };

  return {
    reports,
    isLoading,
    error,
    metadata,
    fetchReports,
    changePage,
    downloadReport
  };
}