<script setup lang="ts">
import BarChart from '@/components/chart/BarChart.vue';
import DataProcess from '@/components/dataProcess/DataProcess.vue';
import TimeLine from "@/components/dataProcess/TimeLine.vue";
import { defineComponent, watchEffect } from 'vue';
import { useDataProcessStore } from '@/stores/dataProcess';
import { dataProcessAPI } from '@/components/dataProcess/dataProcess.api';
const dataProcessStore = useDataProcessStore();

async function getDayProcessArr(ymd:string, pvsn_cd:string|null) {
  const [ error, data, options ]:any = await dataProcessAPI.getDayProcess(ymd, pvsn_cd);
  if (error) {
    console.log("error :" + error);;
  } else {
    dataProcessStore.dayProcess = data;
    return data;
  }
}

getDayProcessArr(dataProcessStore.pickUpDate, null);

let intervalfunc = setInterval(function(){
  getDayProcessArr(dataProcessStore.pickUpDate, null);
}, 60000 );

watchEffect(() => {
  getDayProcessArr(dataProcessStore.pickUpDate, null);
  clearInterval(intervalfunc);

  intervalfunc = setInterval(function(){
    getDayProcessArr(dataProcessStore.pickUpDate, null);
  }, 60000 );
})
</script>
<template>
  <div class="chart">
    <h3>
      <span><font-awesome-icon icon="chart-simple" /></span>
      데이터 수집 현황
    </h3>
    <BarChart />
  </div>
  <div class="process">
    <h3>
      <span><font-awesome-icon icon="square-poll-horizontal" /></span>
      데이터 처리 현황
    </h3>
    <TimeLine />
    <DataProcess 
      v-for="(dp, i) in dataProcessStore.dayProcess"
      :index="i"
      :pvsn_site_cd="dp.pvsn_site_cd"
    />
  </div>
</template>

<style scoped lang="scss">
.chart, .process {
  z-index: 90;
  width: 100%;
  transition: 0.2s ease-out;

  h3 {
    margin: 0 1rem;
  }

  @media (max-width: 768px) {
    margin: 0 3rem;
  }
}
</style>