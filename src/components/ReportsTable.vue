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
            <td>{{ format(new Date(report.createdAt), 'dd/MM/yyyy') }}</td>
            <td>
              <button class="btn-report-table-download" @click="$emit('download', report.reportLink)"
                :disabled="report.status === 'pending'">
                Descargar
                <img src="../assets/icons/download-icon.svg" alt="Descargar" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination v-if="metadata.totalPages > 1" :current-page="metadata.currentPage" :total-pages="metadata.totalPages"
        @page-change="$emit('page-change', $event)" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.reports-table-container {
  width: 100%;
  overflow-x: auto;
  background-color: $primary-color;
  margin: 0 auto;
  width: 690px;
  height: 412px;
  gap: 10px;
  border-radius: 10px;
  padding-top: 10px;
  padding-right: 30px;
  padding-bottom: 40px;
  padding-left: 30px;

  .loading {
    color: white;
  }

  & table,
  & thead,
  & tbody,
  & tr,
  & th,
  & td {
    border-collapse: collapse;
    color: white;
    border: 0;
    padding: 1rem 0rem;
    text-align: left;

  }

  & th {
    border-bottom: 4px solid white;

    &:nth-child(1) {
      text-align: left;
    }

    &:nth-child(2) {
      text-align: center;
    }

    &:nth-child(3) {
      text-align: right;
    }
  }

  & table {
    width: 100%;
    background-color: $primary-color;

    & tr {
      & td {
        border-bottom: 1px solid $border-color;
        width: 33.33%;
      }

      & td:nth-child(1) {
        text-align: left;
      }

      & td:nth-child(2) {
        position: relative;
        text-align: center;

        &::before {
          content: '';
          position: absolute;
          width: 4px;
          height: 24px;
          background-color: $border-color;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }

        &::after {
          content: '';
          position: absolute;
          width: 4px;
          height: 24px;
          background-color: $border-color;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }

      & td:nth-child(3) {
        text-align: right;
      }

      &:last-child td {
        border-bottom: none;
      }
    }
  }

  .btn-report-table-download {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
    background-color: transparent;

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &:hover {
      text-decoration: underline;
    }

    color: white;
    font-weight: bold !important;

  }
}
</style>