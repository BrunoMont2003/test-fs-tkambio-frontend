<script setup lang="ts">
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';

const { login, isLoading, error } = useAuth();

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  if (!email.value || !password.value) return;
  
  try {
    await login(email.value, password.value);
  } catch (e) {
    console.error('Login error:', e);
  }
};
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>
      
      <form @submit.prevent="handleSubmit" class="login-form">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="correo@ejemplo.com"
          >
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            placeholder="************"
          >
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button 
          type="submit" 
          class="btn btn-primary btn-block"
          :disabled="isLoading"
        >
          {{ isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión' }}
        </button>
      </form>
    </div>
  </div>
</template>
