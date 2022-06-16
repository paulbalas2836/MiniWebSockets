<script setup>
import { ref, inject, watch } from "vue";

const store = inject("store");
const props = defineProps({
  tableData: {
    type: Array,
    default: () => [],
  },
});

const data = ref(null);

watch(
  props,
  () => {
    data.value = props.tableData;
    sort(store.state.sortBy, store.state.isSortDirectionASC);
  },
  {
    immediate: true,
    deep: true,
  }
);

function sort(sortBy, isSortDirectionASC) {
  data.value.sort((a, b) => {
    if (isSortDirectionASC) {
      if (a[sortBy] > b[sortBy]) {
        return -1;
      }

      if (a[sortBy] < b[sortBy]) {
        return 1;
      }
    } else {
      if (a[sortBy] < b[sortBy]) {
        return -1;
      }

      if (a[sortBy] > b[sortBy]) {
        return 1;
      }
    }

    return 0;
  });
}

function orderBy(key) {
  if (key === store.state.sortBy) {
    store.methods.changeSortDirection(!store.state.isSortDirectionASC);
  } else {
    store.methods.changeSortDirection(true);
  }

  store.methods.changeSort(key);
  sort(store.state.sortBy, store.state.isSortDirectionASC);
}
</script>

<template>
  <div class="container">
    <div class="table-info">Click on column title to sort the data</div>
    <table class="table">
      <thead>
        <tr class="header-row">
          <td
            class="header-col"
            v-for="(dataKey, dataKeyIndex) in Object.keys(data[0])"
            :key="dataKeyIndex"
            @click="orderBy(dataKey)"
          >
            {{ dataKey
            }}{{
              store.state.sortBy === dataKey
                ? store.state.isSortDirectionASC
                  ? " &#8593;"
                  : " &#8595;"
                : ""
            }}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          class="body-row"
          v-for="(rowData, rowDataIndex) in data"
          :key="rowDataIndex"
        >
          <td
            class="body-col"
            v-for="(columnData, columnDataIndex) in rowData"
            :key="columnDataIndex"
          >
            {{ columnData }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
}

.table {
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  width: 80rem;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.header-row {
  font-weight: bold;
  background-color: green;
  color: white;
}

.table-info {
  display: flex;
  justify-content: center;
  justify-items: center;
}

.header-col {
  padding: 1rem 1rem 1rem 1rem;
}

.body-row {
  font-weight: bold;
  border-bottom: 1px solid #dddddd;
}

.body-row:nth-of-type(even) {
  background-color: #f3f3f3;
}

.body-col {
  padding: 1rem 1rem 1rem 1rem;
}
</style>
