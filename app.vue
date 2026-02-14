<script setup lang="ts">
import { WidgetType } from "~/types/widget";
const store = useGridStore();
</script>

<template>
  <ClientOnly>
    <div class="app-layout">
      <header class="toolbar">
        <div class="actions">
          <button
            class="btn btn-primary btn-plus"
            @click="store.addWidget(WidgetType.TEXT)"
          >
            Text
          </button>
          <button
            class="btn btn-accent btn-plus"
            @click="store.addWidget(WidgetType.IMAGE)"
          >
            Image
          </button>
          <button
            class="btn btn-plus"
            @click="store.addWidget(WidgetType.LINK)"
          >
            Link
          </button>
        </div>
        <div class="actions ms-auto">
          <button class="btn btn-soft" @click="store.undo" :disabled="!store.canUndo">
            Undo
          </button>
          <button class="btn btn-soft" @click="store.redo" :disabled="!store.canRedo">
            Redo
          </button>
        </div>
      </header>
      <main class="main-content">
        <DashboardGrid />
      </main>
    </div>
  </ClientOnly>
</template>

<style scoped>
@reference "tailwindcss";

.app-layout {
  @apply flex flex-col h-screen w-screen;
}

.toolbar {
  @apply bg-white shadow-md z-10 p-4 flex items-center;
}

.toolbar .actions {
  @apply flex gap-2;
}

.main-content {
  @apply flex-1 p-4 bg-gray-200;
}
</style>
