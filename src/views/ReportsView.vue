<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import ReportModal from '../components/ReportModal.vue';
import ReportsTable from '../components/ReportsTable.vue';
import Header from '../components/Header.vue';
import { useReports } from '../composables/useReports';

import { useAuth } from '../composables/useAuth';
const { logout } = useAuth();
const route = useRoute();
const showModal = ref(false);
const {
  reports,
  isLoading,
  error,
  metadata,
  fetchReports,
  changePage,
  downloadReport
} = useReports();

onMounted(() => {
  fetchReports(Number(route.query.page) || 1);
});

const handlePageChange = (page: number | string) => {
  changePage(Number(page));
};

const handleReportGenerated = () => {
  showModal.value = false;
  fetchReports(1);
  changePage(1);
};
</script>

<template>
  <div class="app">
    <Header></Header>
    <main class="container">
      <div class="reports-header">
        <h2>Generador de reportes TK</h2>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <ReportsTable :reports="reports" :isLoading="isLoading" :metadata="metadata" @download="downloadReport"
        @page-change="handlePageChange" />

      <ReportModal v-if="showModal" @close="showModal = false" @report-generated="handleReportGenerated" />

      <div class="reports-view-actions">
        <button class="btn-create-report" @click="showModal = true">
          Crear reporte
        </button>
        <button class="btn-logout" @click="logout">
          Cerrar sesión
        </button>
      </div>
    </main>
  </div>
</template>
<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.reports-header {
  @include flex-center();

  h2 {
    font-weight: normal;
    margin-bottom: 4rem;
  }
}

.reports-view-actions {
  margin-top: 2rem;
  gap: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .btn-create-report {
    @extend .btn;
    @extend .btn-secondary;
  }

  .btn-logout {
    @extend .btn;
    @extend .btn-ghost;
    color: $error-color;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>