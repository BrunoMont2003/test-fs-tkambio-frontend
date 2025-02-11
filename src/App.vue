<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { useAuth } from './composables/useAuth';

const { verifyToken } = useAuth();

onMounted(async () => {
  await verifyToken();
});
</script>

<template>
  <RouterView />
</template>