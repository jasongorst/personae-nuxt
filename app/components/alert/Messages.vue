<template>
  <div class="toast toast-top toast-end w-full md:w-[24rem] lg:w-[28rem] xl:w-[32rem] absolute p-0 top-20 z-[9] whitespace-normal">
    <AlertItem
      v-for="[id, message] in alertStore.messages"
      :key="id"
      :severity="message.severity"
      :dismissable="message.dismissable"
      :dismissed-in="message.dismissedIn"
      :dismiss-on-leave="message.dismissOnLeave"
      @dismiss="alertStore.removeMessage(id)"
    >
      {{ message.text }}
    </AlertItem>
  </div>
</template>

<script setup>
const alertStore = useAlertStore()
</script>

<style scoped>

</style>
