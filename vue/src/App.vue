<template>
    <Chart :chart-data="data"/>
    <Table :table-data="data" />
</template>

<script setup>
import Table from './components/Table.vue';
import Chart from  './components/Chart.vue';
import {ref, provide} from "vue";
import store from "./components/StateManagement.js"

provide('store', store);

const connection  = new WebSocket('ws://localhost:8080');
const data = ref([{name: "euro", value:0, change:0}, {name: "dollar", value:0, change:0}, {name: "pound", value:0, change: 0 }])
connection.onmessage = function (event){
  data.value = JSON.parse(event.data);
}
connection.onerror = function(){
  console.log("Ops, error!");
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: white;
  border-radius: 0.375rem;
  height: max-content;
  padding: 1rem 1rem 0.75rem 0.75rem;
}
</style>