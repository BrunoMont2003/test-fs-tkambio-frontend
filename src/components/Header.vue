<script setup lang="ts">
</script>
<template>
    <header class="header">
        <img src="../assets/images/logo.svg" alt="Logo tkambio" />
    </header>
</template>

<style lang="scss" scoped>
@import '../assets/styles/main.scss';

.header {
    background: $primary-gradient;
    padding: 1.5rem;
    @include flex-center();
}
</style>