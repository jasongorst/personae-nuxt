<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId())
</script>

<style scoped>

</style>
