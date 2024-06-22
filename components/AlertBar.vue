<template>
  <div
    class="alert text-start justify-items-start grid-flow-col pr-8 relative border-2 grid grid-cols-[1rem,_auto] gap-8 hover:swap-active"
    :class="[{ 'alert-animate': clickable, 'cursor-pointer': clickable }, borderColor[severity]]"
    @click="dismiss"
  >
    <template v-if="dismissable">
      <button
        class="btn btn-square btn-xs btn-ghost absolute right-1 top-1"
        type="button"
      >
        <!-- dismissable && dismissedIn > 0 -->
        <span
          v-if="isPositive(dismissedIn)"
          class="swap"
        >
          <span
            class="swap-off radial-progress"
            :style="progressStyle"
            role="progressbar"
          ></span>

          <span class="swap-on inline-grid w-4 h-4 place-content-center">
            <Icon name="fa6-solid:xmark" />
          </span>
        </span>

        <!-- dismissable && dismissedIn == 0 -->
        <Icon
          v-else
          name="fa6-solid:xmark"
        />
      </button>
    </template>

    <template v-else>
      <div class="flex justify-center items-center text-xs leading-none h-6 w-6 p-0 absolute right-1 top-1">
        <!-- !dismissable && dismissedIn > 0 -->
        <div
          v-if="isPositive(dismissedIn)"
          class="radial-progress"
          :style="progressStyle"
          role="progressbar"
        ></div>

        <!-- !dismissable && dismissedIn == 0 (this shouldn't happen) -->
        <template v-else>
          This alert is here forever. Sorry.
        </template>
      </div>
    </template>

    <div :class="iconColor[severity]">
      <Icon :name="iconName[severity]" />
    </div>

    <div class="-indent-4">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  severity: {
    type: String,
    default: "info",
    validator(value, _) {
      if (["info", "success", "warning", "error"].includes(value)) {
        return true
      } else if (["alert", "notice"].includes(value)) {
        console.log("'alert' and 'notice' severity are deprecated. Use 'error' and 'info' instead.")
        return true
      } else {
        return false
      }
    }
  },

  dismissable: {
    type: Boolean,
    default: true
  },

  dismissedIn: {
    type: Number,
    default: 0
  },

  dismissOnLeave: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["dismiss"])

props.severity = normalizeSeverity(props.severity)
const clickable = props.dismissable

const borderColor = {
  error: "border-error/50",
  warning: "border-warning/50",
  success: "border-success/50",
  info: "border-info/50"
}

const iconColor = {
  error: "text-error",
  warning: "text-warning",
  success: "text-success",
  info: "text-info"
}

const iconName = {
  error: "fa6-solid:triangle-exclamation",
  warning: "fa6-solid:circle-exclamation",
  success: "fa6-solid:circle-check",
  info: "fa6-solid:circle-info"
}

const ticks = ref(props.dismissedIn)
const tickInterval = 100 // 100ms
const intervalID = ref(0)

const progress = computed(() => (
  ticks.value / props.dismissedIn * 100
))

const progressStyle = computed(() => ({
  "--value": progress.value,
  "--size": "1rem",
  "--thickness": "0.25rem"
}))

if (isPositive(props.dismissedIn)) {
  onMounted(() => {
    intervalID.value = setInterval(() => {
      ticks.value = ticks.value - tickInterval
    }, tickInterval)
  })

  onUnmounted(() => clearInterval(intervalID.value))

  watch(progress, (newProgress) => {
    if (newProgress < 0.1) {
      emit("dismiss")
      clearInterval(intervalID.value)
    }
  })
}

function dismiss() {
  if (props.dismissable) {
    emit("dismiss")
  }
}

function normalizeSeverity(severity) {
  switch (severity) {
    case "error":
    case "warning":
    case "success":
    case "info":
      return severity

    // deprecated
    case "alert":
      return "error"

    // deprecated
    case "notice":
    default:
      return "info"
  }
}
</script>

<style scoped>
.alert-animate {
  animation: button-pop var(--animation-btn, 0.25s) ease-out;

  &:hover .btn-ghost {
    @apply bg-base-content border-opacity-0 bg-opacity-20;
  }

  &:active:hover,
  &:active:focus {
    animation: button-pop 0s ease-out;
    transform: scale(var(--btn-focus-scale, 0.97));
  }
}
</style>
