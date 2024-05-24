<template>
  <div id="app">
    <Table :rows="rows" />
  </div>
</template>

<script>
import Table from "./components/Table.vue";
import dummyData from "./store/dummy.json";

export default {
  components: {
    Table,
  },
  data() {
    return {
      rows: dummyData,
      
    };
  },
};
</script>

<style scoped lang="sass">
#app
  padding: 20px
</style>
