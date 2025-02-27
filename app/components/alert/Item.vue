<template>
  <div
    class="alert relative border-2 text-start justify-items-start pr-8 hover:swap-active
      grid grid-flow-col grid-cols-[1rem,_auto] gap-8"
    :class="[{ 'alert-animate': dismissable, 'cursor-pointer': dismissable }, borderColor[severity]]"
    @click="dismiss"
  >
    <template v-if="dismissable">
      <button
        class="absolute right-1 top-1 btn btn-square btn-xs btn-ghost"
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

          <span class="inline-grid w-4 h-4 place-content-center swap-on">
            <Icon name="ph:x-bold" />
          </span>
        </span>

        <!-- dismissable && dismissedIn == 0 -->
        <Icon
          v-else
          name="ph:x-bold"
        />
      </button>
    </template>

    <template v-else>
      <div class="absolute right-1 top-1 h-6 w-6 p-0 flex justify-center items-center text-xs leading-none">
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
    validator: (value) => ([ "info", "success", "warning", "error" ].includes(value))
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

const emit = defineEmits([ "dismiss" ])

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
  error: "ph:warning-fill",
  warning: "ph:warning-circle-fill",
  success: "ph:check-circle-fill",
  info: "ph:info-fill"
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
</script>

<style scoped>
@reference "~/assets/css/main.css";

@layer components {
  .alert-animate {
    animation: button-pop var(--animation-btn, 0.25s) ease-out;

    &:hover .btn-ghost {
      @apply bg-base-content border-current/0 bg-current/20;
    }

    &:active:hover,
    &:active:focus {
      animation: button-pop 0s ease-out;
      transform: scale(var(--btn-focus-scale, 0.97));
    }
  }
}
</style>
