<script setup lang="ts">
import { GridStack, type GridItemHTMLElement } from "gridstack";

const gridEl = ref<HTMLDivElement | null>(null);
let grid: GridStack | null = null;

const store = useGridStore();
const isInteracting = ref(false);

const syncStoreFromElement = (el?: GridItemHTMLElement | null) => {
  const node = el?.gridstackNode;
  if (!node?.id) return;
  store.updateWidget(node.id, {
    x: node.x,
    y: node.y,
    width: node.w,
    height: node.h,
  });
};

const syncGridFromStore = async () => {
  if (!grid || isInteracting.value) return;
  await nextTick();

  const widgetIds = new Set(store.widgets.map((widget) => widget.id));
  grid.batchUpdate();

  grid.engine.nodes.forEach((node) => {
    if (node.id && !widgetIds.has(String(node.id)) && node.el) {
      grid?.removeWidget(node.el, false);
    }
  });

  store.widgets.forEach((widget) => {
    const element = grid?.el.querySelector(
      `.grid-stack-item[gs-id="${widget.id}"]`,
    ) as GridItemHTMLElement | null;

    if (!element) return;

    if (!element.gridstackNode) {
      grid?.makeWidget(element);
    }

    grid?.update(element, {
      x: widget.x,
      y: widget.y,
      w: widget.width,
      h: widget.height,
    });
  });

  grid.batchUpdate(false);
};

onMounted(async () => {
  await nextTick();
  if (!gridEl.value) return;

  grid = GridStack.init(
    {
      float: false,
      minRow: 1,
      draggable: {
        handle: ".card-header",
      },
      resizable: {
        handles: "se",
      },
    },
    gridEl.value,
  );

  grid.on("dragstart", () => {
    isInteracting.value = true;
  });

  grid.on("resizestart", () => {
    isInteracting.value = true;
  });

  grid.on("dragstop", (event, el) => {
    console.log(el);
    console.log(el?.gridstackNode);
    isInteracting.value = false;
    syncStoreFromElement(el as HTMLElement | null);
  });

  grid.on("resizestop", (event, el) => {
    isInteracting.value = false;
    syncStoreFromElement(el as HTMLElement | null);
  });

  await syncGridFromStore();
});

onBeforeUnmount(() => {
  grid?.destroy(false);
  grid = null;
});

watch(
  () => store.widgets,
  async () => {
    await syncGridFromStore();
  },
  { deep: true },
);
</script>

<template>
  <div ref="gridEl" class="grid-stack">
    <div
      v-for="widget in store.widgets"
      :key="widget.id"
      class="grid-stack-item"
      :gs-id="widget.id"
      :gs-x="widget.x"
      :gs-y="widget.y"
      :gs-w="widget.width"
      :gs-h="widget.height"
    >
      <div class="grid-stack-item-content">
        <Widget :widget="widget" />
      </div>
    </div>
  </div>
</template>
