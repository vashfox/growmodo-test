import { defineStore } from "pinia";

const columnSets = [
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
  },
  {
    name: "age",
    align: "left",
    label: "Age",
    field: "age",
  },
  {
    name: "phone",
    label: "Phone",
    align: "left",
    field: "phone",
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
]

export const useTableStore = defineStore("table", {
  state: () => ({
    columns: [ ...columnSets ],
    visibleColumns: ["name", "age", "phone", "email"],
    orderedColumns: [ ...columnSets ]
  }),
  actions: {
    updatedVisibleColumns(columns) {
      this.visibleColumns = columns;

      const filteredColumns = this.visibleColumns.map(field => this.columns.find(col => col.field === field)) 
      this.orderedColumns = filteredColumns;
    },
    updateColumnOrder({ element, newIndex, oldIndex }) {
      // this is just to filter the columns by field which is in the visible column
      const filteredColumns = this.visibleColumns.map(column => this.columns.find(col => col.field === column)) 

      // to apply changes to ordered columns base on the visible columns
      this.orderedColumns = filteredColumns;

      const itemIndex = filteredColumns.findIndex(obj => obj['field'] === element.field)
      const movedColumn = this.orderedColumns.splice(itemIndex, 1)[0];
      
      this.orderedColumns.splice(newIndex, 0, movedColumn);
    },
  },
});
