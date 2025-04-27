<template>
  <NuxtLoadingIndicator />

  <BaseContainer>
    <NuxtPage />
  </BaseContainer>
</template>

<script setup>
// Use SSR-safe IDs for Headless UI
provideHeadlessUseId(() => useId())
</script>

<style scoped>

</style>
