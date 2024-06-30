<template>
  <div>
    <input
      type="hidden"
      :name="inputName"
      :id="inputId"
      :value="model"
    />

    <trix-editor
      class="trix-content"
      ref="trix"
      :input="inputId"
      :placeholder="placeholder"
      :autofocus="autofocus"
      @trix-change="handleTrixChange"
      @trix-focus="emitTrixFocus"
      @trix-blur="emitTrixBlur"
      @trix-before-initialize="emitTrixBeforeInitialize"
      @trix-initialize="emitTrixInitialize"
      @trix-paste="emitTrixPaste"
      @trix-selection-change="emitTrixSelectionChange"
      @trix-file-accept.prevent="emitTrixFileAccept"
      @trix-attachment-add="emitTrixAttachmentAdd"
      @trix-attachment-remove="emitTrixAttachmentRemove"
    />
  </div>
</template>

<script setup>
import "trix/dist/trix.css"
import "~/assets/css/trix-tailwind.css"
import Trix from "trix"

const model = defineModel({
  type: String,
  required: false,
  default: ""
})

const props = defineProps({
  // `id` of the hidden input field
  inputId: {
    type: String,
    default: () => uuid()
  },
  // `name` of the hidden input field
  inputName: {
    type: String,
    required: false,
    default: "content"
  },
  // editor placeholder content
  placeholder: {
    type: String,
    required: false,
    default: ""
  },
  // focus editor when attached
  autofocus: {
    type: Boolean,
    required: false,
    default: false
  },
  // override default editor config
  config: {
    type: Object,
    required: false,
    default: () => {}
  }
})

const emit = defineEmits([
  "trix-change",
  "trix-focus",
  "trix-blur",
  "trix-before-initialize",
  "trix-initialize",
  "trix-paste",
  "trix-selection-change",
  "trix-file-accept",
  "trix-attachment-add",
  "trix-attachment-remove"
])

const trix = ref(null)

onBeforeMount(() => {
  _merge(Trix.config, trixConfig)
  _merge(Trix.config, props.config)
})

function handleTrixChange(event) {
  model.value = event.target.value
}

// just re-emitting these
function emitTrixFocus(event) {
  emit("trix-focus", trix.editor, event)
}

function emitTrixBlur(event) {
  emit("trix-blur", trix.editor, event)
}

function emitTrixBeforeInitialize(event) {
  emit("trix-before-initialize", trix.editor, event)
}

function emitTrixInitialize(event) {
  emit("trix-initialize", trix.editor, event)
}

function emitTrixPaste(event) {
  emit("trix-paste", trix.editor, event)
}

function emitTrixSelectionChange(event) {
  emit("trix-selection-change", trix.editor, event)
}

function emitTrixFileAccept(file) {
  emit("trix-file-accept", file)
}

function emitTrixAttachmentAdd(file) {
  emit("trix-attachment-add", file)
}

function emitTrixAttachmentRemove(file) {
  emit("trix-attachment-remove", file)
}
</script>

<style scoped>
@import url("trix/dist/trix.css");
@import url("~/assets/css/trix-tailwind.css");
</style>
