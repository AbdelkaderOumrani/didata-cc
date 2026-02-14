<script setup lang="ts">
import { type Widget, WidgetType, type WidgetUpdate } from "~/types/widget";

const props = defineProps<{
  widget: Widget;
}>();

const emits = defineEmits<{
  (e: "update:widget", widget: WidgetUpdate): void;
}>();

const updateWidget = (updatedFields: WidgetUpdate) => {
  emits("update:widget", updatedFields);
};
</script>

<template>
  <TextWidget
    v-if="props.widget.type === WidgetType.TEXT"
    :widget="props.widget"
    @update:widget="updateWidget"
  />
  <LinkWidget
    v-else-if="props.widget.type === WidgetType.LINK"
    :widget="props.widget"
    @update:widget="updateWidget"
  />
  <ImageWidget
    v-else-if="props.widget.type === WidgetType.IMAGE"
    :widget="props.widget"
    @update:widget="updateWidget"
  />
</template>
