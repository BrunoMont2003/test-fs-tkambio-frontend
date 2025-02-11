<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import ReportModal from '../components/ReportModal.vue';
import ReportsTable from '../components/ReportsTable.vue';
import { useReports } from '../composables/useReports';

const route = useRoute();
const { logout } = useAuth();
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
  changePage(1);
};
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>tkambio</h1>
      <button class="btn btn-secondary" @click="logout">
        Cerrar sesión
      </button>
    </header>

    <main class="container">
      <div class="reports-header">
        <h2>Generador de reportes TK</h2>
        <button class="btn btn-primary" @click="showModal = true">
          Crear reporte
        </button>
      </div>

      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <ReportsTable
        :reports="reports"
        :isLoading="isLoading"
        :metadata="metadata"
        @download="downloadReport"
        @page-change="handlePageChange"
      />

      <ReportModal 
        v-if="showModal"
        @close="showModal = false"
        @report-generated="handleReportGenerated"
      />
    </main>
  </div>
</template>