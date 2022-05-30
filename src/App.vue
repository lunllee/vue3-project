<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Sidebar from "@/components/sidebar/Sidebar.vue";
import Header from "@/components/header/Header.vue";

import { reactive } from "@vue/reactivity";
import Layout from "@/components/Layout.vue";

const dynamicLayout = reactive({
  gridTemplateAreas: '"header header header" "aside main main" "aside footer footer"',
})

</script>

<template>
  <Layout :dynamicLayout="dynamicLayout">
  </Layout>
  <!-- <div class="app">
    <Header />
    <Sidebar />
    <RouterView />
  </div> -->
</template>

<style lang="scss">
@import "@/assets/base.css";
@import "@/assets/fonts/notoSanKR.css";
@import "@/assets/custom-scrollbar.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'NotoSanKR-Bold';
}

.app {
  width:95vw;
  height:90vh;
  display: flex;
}
</style>
