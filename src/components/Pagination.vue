<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits<{
  (e: 'page-change', page: number): void;
}>();

const pages = computed(() => {
  if (props.totalPages <= 1) return [];
  
  const delta = 2; 
  const range: (number | string)[] = [];
  
  range.push(1);
  
  let from = Math.max(2, props.currentPage - delta);
  let to = Math.min(props.totalPages - 1, props.currentPage + delta);
  
  if (props.currentPage - delta <= 2) {
    to = Math.min(props.totalPages - 1, 5);
  }
  
  if (props.currentPage + delta >= props.totalPages - 1) {
    from = Math.max(2, props.totalPages - 4);
  }
  
  if (from > 2) {
    range.push('...');
  }
  
  for (let i = from; i <= to; i++) {
    range.push(i);
  }
  
  if (to < props.totalPages - 1) {
    range.push('...');
  }
  
  if (props.totalPages > 1) {
    range.push(props.totalPages);
  }
  
  return range;
});

const isFirstPage = computed(() => props.currentPage === 1);
const isLastPage = computed(() => props.currentPage === props.totalPages);
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <button
      class="btn btn-secondary pagination-btn"
      :disabled="isFirstPage"
      @click="emit('page-change', currentPage - 1)"
    >
      Anterior
    </button>

    <div class="pagination-numbers">
      <button
        v-for="page in pages"
        :key="page"
        class="btn pagination-number"
        :class="{
          'btn-primary': page === currentPage,
          'btn-secondary': page !== currentPage && page !== '...',
          'pagination-dots': page === '...'
        }"
        :disabled="page === '...'"
        @click="page !== '...' && emit('page-change', Number(page))"
      >
        {{ page }}
      </button>
    </div>

    <button
      class="btn btn-secondary pagination-btn"
      :disabled="isLastPage"
      @click="emit('page-change', currentPage + 1)"
    >
      Siguiente
    </button>
  </div>
</template>
