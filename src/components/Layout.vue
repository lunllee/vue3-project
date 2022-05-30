<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { RouterLink, RouterView } from "vue-router";
import Header from "@/components/header/Header.vue";
import Sidebar from "@/components/sidebar/Sidebar.vue";

import Modal from "@/components/modal/Modal.vue"

import { useDataProcessStore } from '../stores/dataProcess';
const dataprocess = useDataProcessStore();

const props = defineProps({
  dynamicLayout: Object,
})
</script>

<template>
  <Modal
    @close="dataprocess.modalOpen = !dataprocess.modalOpen" 
  />
  <div class="layout" :style="[props.dynamicLayout? props.dynamicLayout: '']">
    <!-- <Header /> -->
    <!-- <Sidebar /> -->
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
header {
  grid-area: header;
}
aside {
  grid-area: aside;
}
main {
  grid-area: main;
  margin: 1rem;
}
footer {
  grid-area: footer;
  background-color: lightyellow;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.layout {
  display: grid;
  grid-template-columns: auto 1fr;
  transition: all 0.2 ease-out;
}
.layout * {
  padding: 1em;
}
</style>