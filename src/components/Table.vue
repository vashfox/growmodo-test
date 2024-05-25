<template>
  <div>
    <q-table
      class="my-sticky-virtscroll-table"
      flat
      bordered
      style="height: 90vh"
      row-key="name"
      v-model:pagination="pagination"
      :virtual-scroll-item-size="48"
      :virtual-scroll-sticky-size-start="200"
      :dense="$q.screen.lt.md"
      :visible-columns="visibleCols"
      :rows="rows"
      :columns="columns"
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
          item-key="order"
          ghost-class="ghost"
          handle=".handle"
          drag-class="column-drag"
          @change="onColumnOrderChange"
        >
          <template #item="{ element }">
            <th
              class="handle table-column-header"
              :class="{
                'text-left': element.align == 'left',
                'text-right': element.align == 'right',
              }"
            >
              <span><q-icon name="drag_indicator" size="xs" /></span>
              {{ element.label }}
            </th>
          </template>
        </Draggable>
      </template>
      <template v-slot:top="props">
        <div class="col-2 q-table__title table-title">Contacts</div>

        <q-space />

        <div v-if="$q.screen.gt.sm" class="col">
          <q-toggle
            v-for="field in fields"
            :key="field"
            :val="field"
            :label="field"
            color="green"
            checked-icon="check"
            unchecked-icon="clear"
            v-model="visibleCols"
            @update:model-value="() => toggleColumnVisibility(field)"
          />
        </div>
        <q-select
          v-else
          v-model="visibleCols"
          multiple
          flat
          borderless
          dense
          options-dense
          :display-value="$q.lang.table.columns"
          emit-value
          map-options
          :options="columns"
          option-value="name"
          style="min-width: 150px"
          @update:model-value="onVisibleColumnsChange"
        />

        <q-input
          style="margin: 0 10px; width: 150px"
          dense
          debounce="300"
          label="Search"
          standout="bg-green text-white"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn
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
    const fields = ref(["name", "age", "phone", "email"]);
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

    const toggleColumnVisibility = (tag) => {
      tableStore.toggleColumnVisibility(tag);
    };

    const onColumnOrderChange = (evt) => {
      tableStore.updateColumnOrder(evt.moved);
    };

    const onVisibleColumnsChange = (evt) => {
      tableStore.updatedVisibleColumns(evt);
    };

    return {
      columns,
      isColumnVisible,
      toggleColumnVisibility,
      visibleCols,
      pagination,
      filter,
      loading,
      onColumnOrderChange,
      onVisibleColumnsChange,
      fields,
    };
  },
};
</script>

<style lang="sass">
#app
  padding: 8px

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
