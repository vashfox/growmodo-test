import { defineStore } from "pinia";

const columnSets = [
  {
    name: "name",
    label: "Name",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "age",
    align: "center",
    label: "Age",
    field: "age",
    sortable: true,
  },
  { name: "phone", label: "Phone", align: "right", field: "phone" },
  { name: "email", label: "Email", align: "right", field: "email" },
];

export const useTableStore = defineStore("table", {
  state: () => ({
    columns: columnSets,
    visibleColumns: ["name", "age", "phone", "email"],
  }),
  actions: {
    toggleColumnVisibility(column) {
      if (this.visibleColumns.includes(column.field)) {
        this.visibleColumns = this.visibleColumns.filter(
          (col) => col !== column
        );
      } else {
        this.visibleColumns.push(column.field);
      }
    },
    updateColumnOrder(newIndex, oldIndex) {
      const movedColumn = this.columns.splice(oldIndex, 1)[0];
      this.columns.splice(newIndex, 0, movedColumn);
    },
  },
});
