import { defineStore } from "pinia";

interface Pvsn {
  name: string,
  cd: string,
}

interface DropdownStore {
  searchQuery: string,
  selectedItem: Pvsn | null,
  isVisible: boolean,
  dataArray: Pvsn[],
}

export const useDropDownStore = defineStore({
  id: "dropdown",
  state: () : DropdownStore => ({
    searchQuery: "",
    selectedItem: null,
    isVisible: false,
    dataArray: [],
  }),
  getters: {
    isDropdown: (state) => {
      return `${state.isVisible}`
    },
    searchData: (state) => {
      return (select:string) => {
        const query = select?.toLowerCase();
        if (select === "") {
          return state.dataArray;
        }
        return state.dataArray.filter((data) => {
          return Object.values(data).some((word => 
            String(word).toLowerCase().includes(query)))
        });
      }
    },
  },
  actions: {
    toggleDropdown() {
      this.isVisible = !this.isVisible
    },
    selectItem(item:Pvsn) {
      this.selectedItem = item;
      this.isVisible = !this.isVisible
    },
    deleteItem() {
      this.selectedItem = null
    },
    changeDataArray(arr:Pvsn[]) {
      this.dataArray = arr;   
    },
  },
});