<template>
  <NavSignIn
    :open="showSignInModal"
    @close="closeModal"
  />

  <div
    class="relative w-full xl:max-w-screen-xl xl:mx-auto"
    data-testid="base-container"
  >
    <div>
      <NavBar />

      <FilterList />
    </div>

    <div class="sticky top-4 lg:mt-4 w-full h-0 flex flex-row-reverse z-[1000]">
      <AlertMessages class="static!" />
    </div>

    <slot />
  </div>
</template>

<script setup>
const showSignInModal = useState("showSignInModal")
callOnce(() => showSignInModal.value = false)

function closeModal() {
  showSignInModal.value = false
}
</script>

<style scoped>

</style>
