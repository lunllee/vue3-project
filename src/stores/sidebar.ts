import { defineStore } from "pinia";

interface sidebarStore {
  collapsed: boolean,
}

export const useSidebarStore = defineStore({
  id: "sidebar",
  state: () : sidebarStore => ({
    collapsed: false,
  }),
  getters: {
    isCollapsed: (state) => {
      return `${state.collapsed}`
    },
  },
  actions: {
    toggleSidebar() {
      this.collapsed = !this.collapsed
    }
  },
});
