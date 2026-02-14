<script setup lang="ts">
import { type Widget, WidgetType } from "~/types/widget";

const props = defineProps<{
  widget: Widget;
}>();
</script>

<template>
  <div class="card">
    <TextWidget
      v-if="props.widget.type === WidgetType.TEXT"
      :widget="props.widget"
    />
    <LinkWidget
      v-else-if="props.widget.type === WidgetType.LINK"
      :widget="props.widget"
    />
    <ImageWidget
      v-else-if="props.widget.type === WidgetType.IMAGE"
      :widget="props.widget"
    />
  </div>
</template>

<style scoped>
.card {
  width: 100%;
  height: 100%;
}
</style>
