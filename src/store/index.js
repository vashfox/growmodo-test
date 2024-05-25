import { defineStore } from "pinia";

export const useTableStore = defineStore("table", {
  state: () => ({
    columns: [
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
      {
        name: "phone",
        label: "Phone",
        align: "left",
        field: "phone",
        order: 2,
      },
      {
        name: "email",
        label: "Email",
        align: "left",
        field: "email",
        order: 3,
      },
    ],
    visibleColumns: ["name", "age", "phone", "email"],
  }),
  actions: {
    updatedVisibleColumns(columns) {
      this.visibleColumns = columns;
    },
    updateColumnOrder({ newIndex, oldIndex }) {
      const movedColumn = this.columns.splice(oldIndex, 1)[0];
      this.columns.splice(newIndex, 0, movedColumn);
    },
  },
});
