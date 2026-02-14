<script setup lang="ts">
import type { TextWidget, TextWidgetUpdate } from "~/types/widget";

const props = defineProps<{
  widget: TextWidget;
}>();

const emits = defineEmits<{
  (e: "update:widget", widget: TextWidgetUpdate): void;
}>();

const isEditing = ref(false);
const content = ref(props.widget.content);

const edit = () => {
  isEditing.value = true;
};

const save = () => {
  isEditing.value = false;
  emits("update:widget", { content: content.value });
};

const cancel = () => {
  isEditing.value = false;
  content.value = props.widget.content;
};
</script>

<template>
  <div class="card p-2 gap-4">
    <div class="flex justify-end gap-1">
      <button
        v-if="isEditing"
        class="btn btn-soft btn-error btn-xs action-btn"
        style="right: 3.5rem"
        @click="cancel"
      >
        Cancel
      </button>
      <button
        v-if="isEditing"
        class="btn btn-soft btn-xs action-btn"
        @click="save"
        :disabled="!content.trim()"
      >
        Save
      </button>
      <button
        v-if="!isEditing"
        class="btn btn-soft btn-xs action-btn"
        @click="edit"
      >
        Edit
      </button>
    </div>
    <div class="flex-1">
      <textarea
        v-if="isEditing"
        class="textarea h-full"
        v-model="content"
      ></textarea>
      <p v-else>{{ content }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}
</style>
