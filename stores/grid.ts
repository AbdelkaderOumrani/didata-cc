import { defineStore } from "pinia";
import {
  WidgetType,
  type Widget,
  type WidgetBase,
  type WidgetUpdate,
} from "~/types/widget";

export const useGridStore = defineStore("grid", () => {
  const widgets = ref<Widget[]>([]);
  const history = ref<Widget[][]>([]);
  const future = ref<Widget[][]>([]);

  const canUndo = computed(() => history.value.length > 0);
  const canRedo = computed(() => future.value.length > 0);

  const addWidget = (widgetType: WidgetType) => {
    const base: WidgetBase = {
      id: crypto.randomUUID(),
      x: 0,
      y: 0,
      width: 4,
      height: 3,
      version: 0,
    };
    switch (widgetType) {
      case WidgetType.TEXT:
        widgets.value.push({
          ...base,
          type: WidgetType.TEXT,
          content: "New Text Widget",
        });
        break;
      case WidgetType.LINK:
        widgets.value.push({
          ...base,
          type: WidgetType.LINK,
          url: "https://example.com",
          label: "Example Link",
        });
        break;
      case WidgetType.IMAGE:
        widgets.value.push({
          ...base,
          type: WidgetType.IMAGE,
          altText: "New Image Widget",
          imageUrl: "https://via.placeholder.com/150",
        });
        break;
    }
  };

  const updateWidget = (id: string, data: WidgetUpdate) => {
    const index = widgets.value.findIndex((w) => w.id === id);
    if (index === -1) return;
    history.value.push([...widgets.value]);
    future.value = [];
    widgets.value[index] = {
      ...widgets.value[index],
      ...data,
      version: (widgets.value[index].version || 0) + 1,
    };
  };

  const removeWidget = (id: string) => {
    history.value.push([...widgets.value]);
    widgets.value = widgets.value.filter((w) => w.id !== id);
    future.value = [];
  };

  const undo = () => {
    if (history.value.length > 0) {
      future.value.push([...widgets.value]);
      widgets.value = history.value.pop()!;
    }
  };

  const redo = () => {
    if (future.value.length > 0) {
      history.value.push([...widgets.value]);
      widgets.value = future.value.pop()!;
    }
  };

  return {
    widgets,
    history,
    future,
    addWidget,
    removeWidget,
    updateWidget,
    undo,
    redo,
    canUndo,
    canRedo,
  };
});
