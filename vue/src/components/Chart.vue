<template>
  <div ref="chart"></div>
</template>

<script setup>
import Highcharts from "highcharts";
import { onMounted, pushScopeId, ref, watch } from "vue";
const chart = ref(null);
const chartData = ref([]);
const chartLabels = ref([]);
const props = defineProps({
  chartData: {
    type: Array,
    default: () => [],
  },
});


watch(props, ()=>{
  chartData.value = [];
  const propCopy = {...props.chartData[0]};

  props.chartData.forEach(el =>{
    chartData.value.push({name: el.name[0].toUpperCase() + el.name.slice(1), data: [el.value, el.change]})
  });
  delete propCopy.name;
  chartLabels.value = Object.keys(propCopy);
  
},{
  deep:true,
  immediate:true,
})


onMounted(() => {
 const barChart = Highcharts.chart(chart.value, {
    chart: {
      type: "column",
    },
    title: {
      text: "Currency",
    },
    xAxis: {
      categories: chartLabels.value,
    },
    credits: {
      enabled: false,
    },
    series:chartData.value
  });

  watch(props, () => {
    barChart.update({
      series: chartData.value
    })
  },{
    deep:true
  });
});
</script>
