<script setup lang="ts">
import { ref } from 'vue';
import FloatingLabelInput from '../components/FloatingLabelInput.vue';
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
      <h3>Reporte por fecha de nacimiento</h3>
      <h5>Ingresa los siguientes datos para generar tu reporte</h5>

      <form @submit.prevent="handleSubmit" class="report-form">
        <FloatingLabelInput type="text" id="title" v-model="form.title" label="Descripción del reporte" required />

        <span class="date-label">
          Fecha de nacimiento
        </span>
        <FloatingLabelInput id="birthDateFrom" v-model="form.birthDateFrom" type="date" label="Inicio" required />

        <FloatingLabelInput id="birthDateTo" v-model="form.birthDateTo" type="date" label="Fin" required />

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <div class="form-actions">
          <button type="submit" class="btn btn-secondary" :disabled="isSubmitting">
            {{ isSubmitting ? 'Generando...' : 'Generar reporte' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>



<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}



.modal-content {
  @include mobile {
    margin: 1px 10px;
  }

  @include tablet {
    margin: 1px 20px;
  }

  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h3 {
    text-align: center;
    margin-bottom: 1rem;
  }

  h5 {
    text-align: center;
    margin-bottom: 1rem;
    font-weight: normal;
    color: $text-primary;
  }

  .report-form {
    display: grid;
    gap: 1rem;
    margin-top: 2rem;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;

    .floating-label-input:nth-child(1) {
      grid-column: 1 / span 2;
    }

    .date-label {
      grid-column: 1 / span 2;
      font-size: 12px;
      color: #696969;
      margin-bottom: .5rem;
    }

    .form-actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      grid-column: 1 / span 2;

    }
  }

}
</style>