<template>
  <div :class="wrapperDivClass">
    <input
      v-model.lazy.trim="query"
      :id="id"
      :class="inputClass"
      placeholder="Search"
      type="search"
      v-bind="inputAttrs"
    >

    <button
      class="btn btn-neutral rounded-l-none h-full border-none outline-transparent active:translate-0!
        [transition-property:color,background-color,box-shadow]"
      :class="[ buttonSize[size] ]"
      tabindex="-1"
      type="button"
    >
      <Icon name="fa6-solid:magnifying-glass" />
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  // class of input element
  class: {
    type: [ Array, Object, String ],
    default: () => ""
  },
  // id of input element
  id: {
    type: String,
    default: () => uuid()
  },
  // size of input (daisyui sizes)
  size: {
    type: String,
    default: "md",
    validator(value) {
      return [ "xl", "lg", "md", "sm", "xs" ].includes(value)
    }
  },
  // class of wrapper div
  wrapperClass: {
    type: [ Array, String ],
    default: () => ""
  }
})

const attrs = useAttrs()
const personae = usePersonae()
const { query } = storeToRefs(personae)

const inputAttrs = computed(() => _omit(attrs, [ "class", "id", "size" ]))

const inputSize = {
  xl: "input-xl",
  lg: "input-lg",
  md: "input-md",
  sm: "input-sm",
  xs: "input-xs"
}

const buttonSize = {
  xl: "btn-xl",
  lg: "btn-lg",
  md: "btn-md",
  sm: "btn-sm",
  xs: "btn-xs"
}

const defaultWrapperClass = [ "input", inputSize[props.size], "w-52", "lg:w-60", "pr-0" ]
const wrapperDivClass = computed(() => twMerge(defaultWrapperClass, props.wrapperClass))

const defaultInputClass = [ "grow" ]
const inputClass = computed(() => twMerge(defaultInputClass, props.class))
</script>

<style scoped>

</style>
