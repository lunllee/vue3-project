<script setup lang="ts">
import FileListBoxVue from './FileListBox.vue';
import InfoBoxVue from './InfoBox.vue';
import ProcessBoxVue from './ProcessBox.vue';
import DropDownListVue from './DropDownList.vue';
</script>
<script lang="ts">
import { defineComponent, watchEffect } from 'vue';

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
    pvsn_site_cd: {
      type: String,
      required: true,
    },
  }
})

</script>
<template>
  <div class="process-group">
    <div class="group-1">
      <InfoBoxVue :index="index" :pvsn_site_cd="pvsn_site_cd"/>
    </div>
    <div class="group-2">
      <FileListBoxVue :index="index" :pvsn_site_cd="pvsn_site_cd"/>
    </div>
    <div class="group-3">
      <ProcessBoxVue :index="index"/>
    </div>
  </div>
  <DropDownListVue :index="index" :pvsn_site_cd="pvsn_site_cd"/>
</template>
<style scoped lang="scss">
.process-group {
  padding: 0.5rem;
  display: flex;
  transition: 0.2s ease-out;
}
.group-1 {
  width: 20%;
  height: 85px;
  padding: 0.5rem 0.2rem;
}
.group-2 {
  z-index: 90;
  display: flex;
  width: 30%;
  height: 85px;
  padding: 0.5rem 0.2rem;
}
.group-3 {
  width: 50%;
  height: 85px;
  padding: 0.5rem 0.2rem;
}
</style>