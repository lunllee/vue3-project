<script setup>
import { storeToRefs } from "pinia";
import { getToday } from "@/components/utils/today"
import DropDownVue from "@/components/dropdown/Dropdown.vue";
import { barChartAPI } from '@/components/chart/barchart.api';
import { useBarChartStore } from '@/stores/barChart';
import { useDropDownStore } from '@/stores/dropdownSelecter';
import TodayTimer from "@/components/timer/TodayTimer.vue";
const barchartStore = useBarChartStore();
const dropdown = useDropDownStore();
barchartStore.setMenuIndex(1);

const { selectedItem } = storeToRefs(dropdown);
const { selectMenuIndex } = storeToRefs(barchartStore);
</script>
<script>
import { watch, watchEffect } from "vue";
import { useDropDownStore } from '@/stores/dropdownSelecter';
const todayArr = getToday();

async function getHourData(ymd, pvsn_cd) {
  const [ error, data , options ] = await barChartAPI.getHourList(ymd, pvsn_cd);
  if (error) {
    console.log("error :" + error); 
    return Array.from({length: 24}, (v,i) => 0);
  } else {
    return data.map( d => d.cnt );
  }
}

async function getDayDataArr(startymd, endymd, pvsn_cd) {
  const [ error, data , options ] = await barChartAPI.getDayList(startymd, endymd, pvsn_cd);
  if (error) {
    console.log("error :" + error); 
    return [Array.from({length: 7}, (v,i) => 0), Array.from({length: 7}, (v,i) => 'error')];
  } else {
    return [data.map( d => d.cnt ), data.map( d => `${parseInt(d.dt.substr(4,2))}월 ${parseInt(d.dt.substr(6,2))}일`)];
  }
}

async function getMonthData(ymd, pvsn_cd) {
  const [ error, data , options ] = await barChartAPI.getMonthList(ymd, pvsn_cd);
  if (error) {
    console.log("error :" + error); 
    return Array.from({length: 12}, (v,i) => 0);
  } else {
    return data.map( d => d.cnt );
  }
}

async function getYearData(startyear, endyear, pvsn_cd) {
  const [ error, data , options ] = await barChartAPI.getYearList(startyear, endyear, pvsn_cd);
  if (error) {
    console.log("error :" + error); 
    return [Array.from({length: 5}, (v,i) => 0), Array.from({length: 5}, (v,i) => 'error')];
  } else {
    return [data.map( d => d.cnt ), data.map( d => d.dt )];
  }
}

export default {
  data: function() {
    return {
      selectedItem: null,
      selectMenuIndex: 1,
      chartOptions: {
        chart: {
          id: "barchart",
          toolbar: {
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            }
          }
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            columnWidth: "30%",
            dataLabels: {
              position: 'top',
            }
          }
        },
        dataLabels: {
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#252525"],
          }
        },
        xaxis: {
          type: 'category',
          categories: [],
        },
      },
      series: [
        {
          name: '데이터 수',
          data: [],
        },
      ],
    };
  },
  methods: {
    async mounted() {
      const defaultDayDataArr = await getDayDataArr(todayArr[1], todayArr[0]);
      this.series[0].data = defaultDayDataArr[0];
      this.chartOptions = {
        xaxis: {
          type: 'category',
          categories: defaultDayDataArr[1],
        },
      };
    },
    async selectBtn(index, pvsn) {
      let pvsnCd = null;
      if(pvsn !== null) {
        pvsnCd = pvsn.cd;
      }
      switch (index) {
          case 0:
              const hourXaxis = Array.from({length: 24}, (v,i) => i + 1);
              let hourData = await getHourData(todayArr[0], pvsnCd);
              this.chartOptions = {
                plotOptions: {
                  bar: {
                    columnWidth: "40%"
                  }
                },
                xaxis: {
                  type: 'numeric',
                  decimalsInFloat: 0,
                  categories: hourXaxis,
                },
              };

              this.series = [{
                data: hourData,
              }];

              break;
          case 1:
              const dayDataArr = await getDayDataArr(todayArr[1], todayArr[0], pvsnCd);
              
              this.chartOptions = {
                xaxis: {
                  type: 'category',
                  categories: dayDataArr[1],
                },
              };

              this.series = [{
                data: dayDataArr[0],
              }];

              break;
          case 2:
              const monthXaxis = Array.from({length: 12}, (v,i) => (i + 1).toString() + "월");
              const monthData = await getMonthData(todayArr[0], pvsnCd);
              this.chartOptions = {
                xaxis: {
                  type: 'category',
                  categories: monthXaxis,
                },
              };

              this.series = [{
                data: monthData,
              }];

              break;
          case 3:
              const yearDataArr = await getYearData(todayArr[2], todayArr[3], pvsnCd);
              this.chartOptions = {
                xaxis: {
                  type: 'category',
                  categories: yearDataArr[1],
                },
              };

              this.series = [{
                data: yearDataArr[0],
              }];

              break;
          default:
              const defalutDataArr = await getDayDataArr(todayArr[1], todayArr[0], pvsnCd);
              this.chartOptions = {
                xaxis: {
                  type: 'category',
                  categories: defalutDataArr[1],
                },
              };

              this.series = [{
                data: defalutDataArr[0],
              }];

              break;
      }
    }
  }
};
</script>
<template>
  <div class="bar-chart-group">
    <nav class="select">
      <div class="container-fluid">
        <li 
          v-for="(mt, i) in barchartStore.menuArray" 
          :key="i"
          @click="selectBtn(i, selectedItem),
                  barchartStore.setMenuIndex(i)"
          :class="{ active: i === barchartStore.getSelectMenuIndex }"
        >
          <span 
          class="text"
          :class="{ active: i === barchartStore.getSelectMenuIndex }"
          >
            {{ mt }}
          </span>
        </li>
         
      </div>
      <div class="right-side">
          <TodayTimer />
          <DropDownVue @selectBtn="selectBtn"/>
      </div>
      
    </nav>
    <apexchart
      ref="barchart"
      width="100%"
      height=300
      type="bar"
      :options="chartOptions"
      :series="series"
      @mounted="mounted"
    ></apexchart>
  </div>
</template>
<style>
:root {
  --barchart-menu-color: #9ea0a1;
  --barchart-menu-hover-color: #252525;
}
</style>
<style scoped lang="scss">
.select {
  display: flex;
  .container-fluid {
    padding: 0.5rem 2rem;
    display: flex;
    //width: 50%;
   

    li {
      list-style: none;
      padding: 0.5rem;
      background-color: white;
  
      .text {
        color: var(--barchart-menu-color);
        cursor: pointer;
        transition: 0.2s ease-out;
  
        &:hover, &.active {
          color: var(--barchart-menu-hover-color);
        }
      }
    }
  }

  .today-time{
        padding: 0.5rem 0;
  }
}

.right-side{
  display:flex;
  margin-left:auto;
}
</style>