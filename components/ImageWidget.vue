<script setup lang="ts">
import type { ImageWidget, ImageWidgetUpdate } from "~/types/widget";

const props = defineProps<{
  widget: ImageWidget;
}>();

const emits = defineEmits<{
  (e: "update:widget", widget: ImageWidgetUpdate): void;
}>();

const isEditing = ref(false);
const url = ref(props.widget.imageUrl);
const alt = ref(props.widget.altText);

const edit = () => {
  isEditing.value = true;
};

const save = () => {
  isEditing.value = false;
  emits("update:widget", {
    altText: alt.value,
    imageUrl: url.value,
  });
};

const cancel = () => {
  isEditing.value = false;
  url.value = props.widget.imageUrl;
  alt.value = props.widget.altText;
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
        :disabled="!url.trim()"
      >
        Save
      </button>
      <button v-if="!isEditing" class="btn btn-soft btn-xs" @click="edit">
        Edit
      </button>
    </div>
    <div v-if="isEditing" class="flex flex-col gap-4">
      <div class="w-full">
        <label class="label-text" for="imageUrl">Image URL</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          class="input"
          id="imageUrl"
          v-model="url"
        />
      </div>

      <div class="w-full">
        <label class="label-text" for="linkLabel">Description</label>
        <input
          type="text"
          placeholder="Example Website"
          class="input"
          id="linkLabel"
          v-model="alt"
        />
      </div>
    </div>
    <div v-else class="flex-1 overflow-hidden rounded">
      <img :src="url" :alt="alt" class="w-full h-full object-cover" />
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}
</style>
