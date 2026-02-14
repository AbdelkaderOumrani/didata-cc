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
          imageUrl: "https://placehold.co/150",
        });
        break;
    }
    history.value.push([...widgets.value]);
    future.value = [];
  };

  const updateWidget = (id: string, data: WidgetUpdate) => {
    const index = widgets.value.findIndex((w) => w.id === id);
    if (index === -1) return;
    history.value.push([...widgets.value]);
    future.value = [];
    widgets.value[index] = {
      ...widgets.value[index],
      ...data,
    };
  };

  const removeWidget = (id: string) => {
    history.value.push([...widgets.value]);
    widgets.value = widgets.value.filter((w) => w.id !== id);
    future.value = [];
  };

  const undo = () => {
    if (history.value.length === 0) return;
    const previous = history.value.pop();
    if (!previous) return;
    future.value.push([...widgets.value]);
    widgets.value = previous;
  };

  const redo = () => {
    if (future.value.length === 0) return;
    const next = future.value.pop();
    if (!next) return;
    history.value.push([...widgets.value]);
    widgets.value = next;
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
