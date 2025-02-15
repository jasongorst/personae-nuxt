<template>
  <div>
    <input
      type="hidden"
      :name="name"
      :id="id"
      :value="model"
    />

    <trix-editor
      :class="trixEditorClass"
      ref="trix"
      :input="id"
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
      v-bind="$attrs"
    />
  </div>
</template>

<script setup>
import Trix from "trix"

defineOptions({
  inheritAttrs: false
})

const model = defineModel({
  type: String,
  required: false,
  default: ""
})

const props = defineProps({
  // class of trix-editor element
  class: {
    type: [ Array, Object, String ],
    default: () => ""
  },
  // id of hidden input field
  id: {
    type: String,
    default: () => uuid()
  },
  // name of hidden input field
  name: {
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

const defaultClass = [ "trix-content" ]
const trixEditorClass = computed(() => twMerge(defaultClass, props.class))

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

<style>
@import "trix/dist/trix.css";
@reference "~/assets/css/main.css";

trix-toolbar {
  .trix-button-group {
    @apply join border-none!;
  }

  .trix-button {
    @apply btn btn-sm btn-secondary border-none! py-0 px-3 first:rounded-l-sm last:rounded-r-sm;

    &.trix-active {
      --btn-bg: color-mix(in oklab, var(--btn-color, var(--color-base-200)), #000 7%);
      --btn-shadow: 0 0 0 0 oklch(0% 0 0/0), 0 0 0 0 oklch(0% 0 0/0);
      isolation: isolate;
    }

    &:disabled {
      @apply bg-base-100 border-base-100 outline-base-100;

      &::before {
        @apply bg-base-content;
      }

      &:not(.btn-link, .btn-ghost) {
        @apply bg-base-content/10;
        box-shadow: none;
      }

      @apply pointer-events-none;
      --btn-border: #0000;
      --btn-noise: none;
      --btn-fg: color-mix(in oklch, var(--color-base-content) 20%, #0000);

      &:hover {
        @apply bg-neutral/20 pointer-events-none;
        --btn-border: #0000;
        --btn-fg: color-mix(in oklch, var(--color-base-content) 20%, #0000);
      }
    }
  }

  &.validate:invalid {
    @apply shadow-md shadow-error;
  }

  .trix-button--icon {
    @apply w-8;

    &::before {
      @apply bg-none! bg-secondary-content;
    }
  }

  .trix-button--icon-attach::before {
    mask: url("~/assets/images/attach.svg") center no-repeat;
  }

  .trix-button--icon-bold::before {
    mask: url("~/assets/images/bold.svg") center no-repeat;
  }

  .trix-button--icon-italic::before {
    mask: url("~/assets/images/italic.svg") center no-repeat;
  }

  .trix-button--icon-link::before {
    mask: url("~/assets/images/link.svg") center no-repeat;
  }

  .trix-button--icon-strike::before {
    mask: url("~/assets/images/strike.svg") center no-repeat;
  }

  .trix-button--icon-quote::before {
    mask: url("~/assets/images/quote.svg") center no-repeat;
  }

  .trix-button--icon-heading-1::before {
    mask: url("~/assets/images/heading_1.svg") center no-repeat;
  }

  .trix-button--icon-code::before {
    mask: url("~/assets/images/code.svg") center no-repeat;
  }

  .trix-button--icon-bullet-list::before {
    mask: url("~/assets/images/bullets.svg") center no-repeat;
  }

  .trix-button--icon-number-list::before {
    mask: url("~/assets/images/numbers.svg") center no-repeat;
  }

  .trix-button--icon-undo::before {
    mask: url("~/assets/images/undo.svg") center no-repeat;
  }

  .trix-button--icon-redo::before {
    mask: url("~/assets/images/redo.svg") center no-repeat;
  }

  .trix-button--icon-decrease-nesting-level::before {
    mask: url("~/assets/images/nesting_level_decrease.svg") center no-repeat;
  }

  .trix-button--icon-increase-nesting-level::before {
    mask: url("~/assets/images/nesting_level_increase.svg") center no-repeat;
  }

  .trix-dialog {
    @apply bg-base-100! shadow-xl! border! border-base-content/20!;

    & .trix-input {
      @apply input input-sm;
    }
  }
}

trix-editor {
  @apply textarea textarea-md w-full h-auto min-h-[6rem];

  & ul {
    @apply list-disc pl-10;
  }

  & ol {
    @apply list-decimal pl-10;
  }
}
</style>
