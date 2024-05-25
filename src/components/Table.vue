<template>
  <div>
    <q-table
      flat
      bordered
      row-key="name"
      title="Contacts"
      style="height: 90vh"
      class="my-sticky-virtscroll-table"
      v-model:pagination="pagination"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="200"
      :dense="$q.screen.lt.md"
      :visible-columns="visibleCols"
      :rows="rows"
      :columns="tableStore.orderedColumns"
      :loading="loading"
      :filter="filter"
    >
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:header="props">
        <Draggable
          tag="tr"
          class="q-tr"
          v-model="props.cols"
          item-key="field"
          ghost-class="ghost"
          handle=".handle"
          drag-class="column-drag"
          @change="onColumnOrderChange"
        >
          <template #item="{ element }">
            <th
              class="table-column-header"
              :class="{
                'text-left': element.align == 'left',
                'text-right': element.align == 'right',
              }"
            >
              <span v-if="enableDragging" class="handle">
                <q-icon name="drag_indicator" size="xs" />
              </span>
              {{ element.label }}
            </th>
          </template>
        </Draggable>
      </template>
      <template v-slot:top-right="props">
        <q-toggle
          v-model="enableDragging"
          checked-icon="check"
          color="green"
          class="gap-right"
          label="Allow Column Reordering"
          unchecked-icon="clear"
        />
        <q-space />
        <q-select
          multiple
          filled
          dense
          emit-value
          map-options
          class="col gap-right"
          option-value="name"
          style="min-width: 150px"
          v-model="visibleCols"
          :options="columns"
          :display-value="$q.lang.table.columns"
          @update:model-value="onVisibleColumnsChange"
        >
          <template v-slot:option="{ itemProps, opt, selected, toggleOption }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label v-html="opt.label" />
              </q-item-section>
              <q-item-section side>
                <q-toggle
                  :model-value="selected"
                  @update:model-value="toggleOption(opt)"
                />
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <q-input
          style="width: 150px"
          dense
          class="col"
          debounce="300"
          label="Search Name"
          standout="bg-green text-white"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
          v-if="$q.screen.gt.xs"
          flat
          round
          dense
          :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
          @click="props.toggleFullscreen"
          class="q-ml-md"
        />
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTableStore } from "../store";
import Draggable from "vuedraggable";

export default {
  components: {
    Draggable,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const tableStore = useTableStore();
    const columns = ref(tableStore.columns);
    const visibleCols = ref(tableStore.visibleColumns);
    const filter = ref("");
    const enableDragging = ref(true);
    const pagination = ref({
      rowsPerPage: 0,
    });

    // Dummy loading table.
    let loading = ref(true);
    setTimeout(() => {
      loading.value = false;
    }, 3000);
    // loading end

    const isColumnVisible = (column) => {
      return tableStore.visibleColumns.includes(column);
    };

    const onColumnOrderChange = (evt) => {
      if (!evt || !evt.moved) return;
      tableStore.updateColumnOrder(evt.moved);
    };

    const onVisibleColumnsChange = (evt) => {
      tableStore.updatedVisibleColumns(evt);
    };

    return {
      columns,
      isColumnVisible,
      visibleCols,
      pagination,
      filter,
      loading,
      onColumnOrderChange,
      onVisibleColumnsChange,
      enableDragging,
      tableStore
    };
  },
};
</script>

<style lang="sass">
.table-column-header.ghost
  background: #ddd !important

.column-drag
  border: 1px solid #000

.table-title, .table-column-header
  font-weight: bold

.handle, .handle:hover
  cursor: grab

.handle:active, .handle:focus
  cursor: grabbing

.gap-right 
  margin-right: 10px

.my-sticky-virtscroll-table
  height: 200px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #f2f2f2

  thead tr th
    position: sticky
    z-index: 1
  thead tr:last-child th
    top: 48px
  thead tr:first-child th
    top: 0

  tbody
    scroll-margin-top: 200px
</style>
