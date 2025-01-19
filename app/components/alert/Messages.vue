<template>
  <div class="toast w-full md:w-[24rem] lg:w-[28rem] xl:w-[32rem] p-0 z-[9] whitespace-normal">
    <AlertItem
      v-for="[id, message] in alert.messages"
      :key="id"
      :severity="message.severity"
      :dismissable="message.dismissable"
      :dismissed-in="message.dismissedIn"
      :dismiss-on-leave="message.dismissOnLeave"
      @dismiss="alert.remove(id)"
    >
      {{ message.text }}
    </AlertItem>
  </div>
</template>

<script setup>
const alert = useAlert()
</script>

<style scoped>

</style>
