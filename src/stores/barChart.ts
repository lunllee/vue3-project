import { defineStore } from "pinia";

interface BarChartStore {
  menuArray: string[],
  selectMenuIndex: number,
  chartValueText: string,
  xaxis: string[] | number[],
  data: number[],
}

export const useBarChartStore = defineStore({
  id: "barchart",
  state: () : BarChartStore => ({
    menuArray: [ '시간', '일', '월', '년' ],
    selectMenuIndex: 1,
    chartValueText: "데이터 수",
    xaxis: [],
    data: [],
  }),
  getters: {
    getMenuArray: (state) => {
      return state.menuArray;
    },
    getSelectMenuIndex: (state) => {
      return state.selectMenuIndex;
    }
  },
  actions: {
    updateChartValueText (text:string) {
      this.chartValueText = text;
    },
    setMenuIndex (index:number) {
      this.selectMenuIndex = index;
    },
  },
});