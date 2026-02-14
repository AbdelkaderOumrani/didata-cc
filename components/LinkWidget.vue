<script setup lang="ts">
import type {
  LinkWidget,
  LinkWidgetUpdate,
  TextWidget,
  TextWidgetUpdate,
} from "~/types/widget";

const props = defineProps<{
  widget: LinkWidget;
}>();

const emits = defineEmits<{
  (e: "update:widget", widget: LinkWidgetUpdate): void;
}>();

const isEditing = ref(false);
const link = ref(props.widget.url);
const label = ref(props.widget.label);

const edit = () => {
  isEditing.value = true;
};

const save = () => {
  isEditing.value = false;
  emits("update:widget", {
    url: link.value,
    label: label.value,
  });
};

const cancel = () => {
  isEditing.value = false;
  link.value = props.widget.url;
  label.value = props.widget.label;
};
</script>

<template>
  <div class="card p-2 gap-4">
    <DragButton class="absolute" />
    <div class="flex justify-end gap-1">
      <button
        v-if="isEditing"
        class="btn btn-soft btn-error btn-xs"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        v-if="isEditing"
        class="btn btn-soft btn-xs"
        @click="save"
        :disabled="!link.trim() || !label.trim()"
      >
        Save
      </button>
      <button
        v-if="!isEditing"
        class="btn btn-soft btn-xs"
        @click="edit"
      >
        Edit
      </button>
    </div>
    <div v-if="isEditing" class="flex flex-col gap-4">
      <div class="w-full">
        <label class="label-text" for="linkValue">Link</label>
        <input
          type="text"
          placeholder="https://example.com"
          class="input"
          id="linkValue"
          v-model="link"
        />
      </div>

      <div class="w-full">
        <label class="label-text" for="linkLabel">Description</label>
        <input
          type="text"
          placeholder="Example Website"
          class="input"
          id="linkLabel"
          v-model="label"
        />
      </div>
    </div>
    <div v-else class="flex flex-col gap-1">
      <small>{{ props.widget.label }}</small>
      <a :href="props.widget.url" target="_blank" class="text-blue-500">
        {{ props.widget.url }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}
</style>
