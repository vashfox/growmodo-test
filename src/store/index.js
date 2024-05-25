import { defineStore } from "pinia";

const columnSets = [
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    order: 0,
  },
  {
    name: "age",
    align: "left",
    label: "Age",
    field: "age",
    order: 1,
  },
  { name: "phone", label: "Phone", align: "left", field: "phone", order: 2 },
  { name: "email", label: "Email", align: "left", field: "email", order: 3 },
];

export const useTableStore = defineStore("table", {
  state: () => ({
    columns: columnSets,
    visibleColumns: ["name", "age", "phone", "email"],
  }),
  actions: {
    toggleColumnVisibility(column) {
      if (this.visibleColumns.includes(column)) {
        this.visibleColumns = this.visibleColumns.filter(
          (col) => col !== column
        );
      } else {
        this.visibleColumns.push(column);
      }
    },
    updatedVisibleColumns(columns) {
      this.visibleColumns = columns;
    },
    updateColumnOrder(newIndex, oldIndex) {
      console.log(this.columns, this.visibleColumns);
      console.log(newIndex, oldIndex);
      const movedColumn = this.columns.splice(oldIndex, 1)[0];
      console.log(movedColumn)
      this.columns.splice(newIndex, 0, movedColumn);
    },
  },
});
