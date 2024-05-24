<template>
  <div>
    <q-table
      class="my-sticky-virtscroll-table"
      virtual-scroll
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
      <template v-slot:top="props">
        <div class="col-2 q-table__title">Contacts</div>

        <q-space />

        <div v-if="$q.screen.gt.sm" class="col">
          <q-toggle v-model="visibleCols" val="name" label="Name" />
          <q-toggle v-model="visibleCols" val="age" label="Age" />
          <q-toggle v-model="visibleCols" val="phone" label="Phone" />
          <q-toggle v-model="visibleCols" val="email" label="Email" />
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
        />

        <q-input
          style="margin: 0 10px; width: 150px"
          dense
          debounce="300"
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
    const pagination = ref({
      rowsPerPage: 0,
    });

    let loading = ref(true);

    const onDragEnd = (event) => {
      tableStore.updateColumnOrder(event.newIndex, event.oldIndex);
    };

    const isColumnVisible = (column) => {
      return tableStore.visibleColumns.includes(column);
    };

    const toggleColumnVisibility = (column) => {
      tableStore.toggleColumnVisibility(column);
    };

    setTimeout(() => {
      loading.value = false;
    }, 3000);

    return {
      columns,
      onDragEnd,
      isColumnVisible,
      toggleColumnVisibility,
      visibleCols,
      pagination,
      filter,
      loading,
    };
  },
};
</script>

<style lang="sass">
#app
  padding: 8px

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
