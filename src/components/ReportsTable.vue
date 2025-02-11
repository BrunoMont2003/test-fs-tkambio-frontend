<script setup lang="ts">
import { format } from 'date-fns';
import type { Report, PaginationMetadata } from '../types/Report';
import Pagination from './Pagination.vue';

defineProps<{
  reports: Report[];
  isLoading: boolean;
  metadata: PaginationMetadata;
}>();

defineEmits<{
  (e: 'download', reportLink: string): void;
  (e: 'page-change', page: number | string): void;
}>();
</script>

<template>
  <div class="reports-table-container">
    <div v-if="isLoading" class="loading">
      Cargando reportes...
    </div>
    
    <template v-else>
      <table class="reports-table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Fecha de creación</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="report in reports" :key="report.id">
            <td>{{ report.title }}</td>
            <td>{{ format(new Date(report.createdAt), 'dd/MM/yyyy HH:mm:ss') }}</td>
            <td>
              <button 
                class="btn btn-secondary"
                @click="$emit('download', report.reportLink)"
                :disabled="report.status === 'pending'"
              >
                Descargar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        v-if="metadata.totalPages > 1"
        :current-page="metadata.currentPage"
        :total-pages="metadata.totalPages"
        @page-change="$emit('page-change', $event)"
      />
    </template>
  </div>
</template>

