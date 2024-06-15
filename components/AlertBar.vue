<template>
  <div
    class="alert text-start justify-items-start grid-flow-col pr-8 relative border-2 grid grid-cols-[1rem,_auto] gap-8 hover:swap-active"
    :class="[{ 'alert-animate': canDismiss, 'cursor-pointer': canDismiss }, borderColor]"
    @click="dismiss"
  >
    <template v-if="canDismiss">
      <!-- canDismiss && dismissedIn > 0 -->
      <button
        v-if="isPositive(dismissedIn)"
        class="btn no-animation btn-square btn-xs btn-ghost absolute right-1 top-1"
        type="button"
      >
        <span class="swap">
          <span
            class="radial-progress swap-off"
            :style="progressStyle"
            role="progressbar"
          ></span>

          <span class="swap-on inline-grid w-4 h-4 place-content-center">
            <Icon name="fa6-solid:xmark" />
          </span>
        </span>
      </button>

      <!-- canDismiss && dismissedIn == 0 -->
      <button
        v-else
        class="btn no-animation btn-square btn-xs btn-ghost absolute right-1 top-1"
        type="button"
      >
        <Icon name="fa6-solid:xmark" />
      </button>
    </template>

    <template v-else>
      <!-- !canDismiss && dismissedIn > 0 -->
      <div
        v-if="isPositive(dismissedIn)"
        class="flex justify-center items-center text-xs leading-none h-6 w-6 p-0 absolute right-1 top-1"
      >
        <div
          class="radial-progress"
          :style="progressStyle"
          role="progressbar"
        ></div>
      </div>

      <!-- !canDismiss && dismissedIn == 0 (WARNING: this shouldn't happen) -->
      <div
        v-else
        class="flex justify-center items-center text-xs leading-none h-6 w-6 p-0 absolute right-1 top-1"
      >
        This alert is here forever. Sorry.
      </div>
    </template>

    <div
      :class="iconColor"
    >
      <Icon :name="icon" />
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
  canDismiss: {
    type: Boolean,
    default: true
  },
  dismissedIn: {
    type: Number,
    default: 4 * 1000
  },
  dismissOnLeave: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(["dismiss"])

const borderColor = computed(() => `border-${severityColor(props.severity)}/50`)
const iconColor = computed(() => `text-${severityColor(props.severity)}`)

const icon = computed(() => {
  switch (props.severity) {
    case "error":
    case "alert":
      return "fa6-solid:triangle-exclamation"

    case "warning":
      return "fa6-solid:circle-exclamation"

    case "success":
      return "fa6-solid:circle-check"

    case "info":
    default:
      return "fa6-solid:circle-info"
  }
})

const ticks = ref(0)
const tickInterval = 100 // 100ms
let intervalID = null

const progress = computed(() => (
  100 * (1 - (ticks.value * tickInterval / props.dismissedIn))
))

const progressStyle = computed(() => ({
  "--value": progress.value,
  "--size": "1rem",
  "--thickness": "0.25rem"
}))

if (isPositive(props.dismissedIn)) {
  onMounted(() => {
    intervalID = setInterval(() => {
      ticks.value++
    }, tickInterval)
  })

  onUnmounted(() => clearInterval(intervalID))

  watch(progress, (newProgress) => {
    if (!isPositive(newProgress)) {
      emit("dismiss")
      clearInterval(intervalID)
    }
  })
}

function dismiss() {
  if (props.canDismiss) {
    emit("dismiss")
  }
}

function severityColor(severity) {
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

  @media (hover: hover) {
    &:hover::before {
      @apply absolute top-0 left-0 w-full h-full;
      content: "";
    }

    &:hover .btn-ghost {
      @apply bg-base-content border-opacity-0 bg-opacity-20;
    }
  }

  &:active:hover,
  &:active:focus {
    animation: button-pop 0s ease-out;
    transform: scale(var(--btn-focus-scale, 0.97));
  }
}

.btn-fake {
  &:active:hover,
  &:active:focus {
    @apply !animate-none !scale-100;
  }

  & {
    @media (hover: hover) {
      &:hover {
        @apply !border-inherit !bg-inherit !pointer-events-none;
      }
    }

    &.btn-active {
      @apply !border-inherit !bg-inherit !pointer-events-none;
    }

    &:focus-visible {
      @apply !outline-none;
    }
  }

  &.btn-info {
    @media (hover: hover) {
      &:hover {
        @apply !border-inherit !bg-inherit;
      }
    }

    &.btn-active {
      @apply !border-inherit !bg-inherit;
    }
  }

  &.btn-error {
    @media (hover: hover) {
      &:hover {
        @apply !border-inherit !bg-inherit;
      }
    }

    &.btn-active {
      @apply !border-inherit !bg-inherit;
    }
  }

  &.btn-ghost {
    @media (hover: hover) {
      &:hover {
        @apply !bg-transparent !bg-opacity-0;
      }
    }

    &.btn-active {
      @apply !bg-transparent !bg-opacity-0;
    }
  }

  &.hi-there-tree-shaker {
    @apply text-info text-success text-warning text-error;
    @apply text-info-content text-success-content text-warning-content text-error-content;
    @apply bg-info bg-success bg-warning bg-error;
    @apply border-info/50 border-success/50 border-warning/50 border-error/50;
  }
}
</style>
