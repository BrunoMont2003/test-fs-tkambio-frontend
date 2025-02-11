<script setup lang="ts">
import { ref } from 'vue';
import type { ReportFormData } from '../types/Report';
import { reportsService } from '../services/report';

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'report-generated'): void;
}>();

const form = ref<ReportFormData>({
  title: '',
  birthDateFrom: '1980-01-01',
  birthDateTo: '2010-01-01'
});

const error = ref<string | null>(null);
const isSubmitting = ref(false);

const validateForm = (): boolean => {
  if (!form.value.title.trim()) {
    error.value = 'El título es requerido';
    return false;
  }
  if (!form.value.birthDateFrom || !form.value.birthDateTo) {
    error.value = 'Las fechas son requeridas';
    return false;
  }
  if (new Date(form.value.birthDateFrom) > new Date(form.value.birthDateTo)) {
    error.value = 'La fecha inicial debe ser menor a la fecha final';
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  if (!validateForm()) return;
  
  try {
    isSubmitting.value = true;
    error.value = null;
    await reportsService.generateReport(form.value);
    emit('report-generated');
    emit('close');
  } catch (e) {
    error.value = 'Error al generar el reporte';
    console.error(e);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="emit('close')">
    <div class="modal-content">
      <h3>Nuevo Reporte</h3>
      
      <form @submit.prevent="handleSubmit" class="report-form">
        <div class="form-group">
          <label for="title">Título del reporte</label>
          <input
            id="title"
            v-model="form.title"
            type="text"
            required
            placeholder="Ingrese el título"
          >
        </div>

        <div class="form-group">
          <label for="birthDateFrom">Fecha inicio</label>
          <input
            id="birthDateFrom"
            v-model="form.birthDateFrom"
            type="date"
            required
          >
        </div>

        <div class="form-group">
          <label for="birthDateTo">Fecha fin</label>
          <input
            id="birthDateTo"
            v-model="form.birthDateTo"
            type="date"
            required
          >
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="emit('close')"
          >
            Cancelar
          </button>
          <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? 'Generando...' : 'Generar reporte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>