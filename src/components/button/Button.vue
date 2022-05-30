<script setup lang="ts">
import { useDataProcessStore } from '@/stores/dataProcess';
const dataprocess = useDataProcessStore();
</script>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    btnText: {
      type: String,
      required: true,
    },
    isError: {
      type: Boolean,
      required: false,
    },
  },
})
</script>
<template>
  <div class="button-group">
    <div class="button-inner">
      <div 
        v-if="isError"
        class="button"
        @click="dataprocess.modalResend(
          dataprocess.modalInfo?.clct_log_sn,
          dataprocess.modalInfo?.dtst_sn,
          dataprocess.modalInfo?.pvsn_site_cd,
          dataprocess.modalInfo?.data_crtr_pnttm,
          dataprocess.modalInfo?.data_updt_cycle_cd,
          dataprocess.modalInfo?.retransm_cnt,
          'Y',
          'Y'
        )"
      >
        <div class="button-text">
          <span>{{ btnText }}</span>
        </div>
      </div>
      <div 
        v-else class="button"
        @click="dataprocess.modalHide"
      >
        <div class="button-text">
          <span>{{ btnText }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
:root {
  --btn-text-color: #ffffff;
  --btn-background-color: #5e39fa;
  --btn-background-hover-color: #7c5df8;
}
</style>
<style scoped lang="scss">
.button-group {
  width: 200px;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  
  transition: all 0.2s ease-out;

  .button-inner {
    width: 100%;
    text-align: center;
    position: relative;

    .button {
      padding: 1rem;
      box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
                  0px 2px 2px 0px rgba(0, 0, 0, 0.14),
                  0px 1px 5px 0px rgba(0, 0, 0, 0.12);
      background-color: var(--btn-background-color);
      max-width: 100%;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: auto;
      user-select: none;
      cursor: pointer;
      position: relative !important;

      transition: all 0.2s ease-out;
      
      &:hover {
        background-color: var(--btn-background-hover-color);
      }

      .button-text {
        align-items: center;
        color: var(--btn-text-color);
        display: flex;
        justify-self: inherit;
        line-height: normal;
      }
    }
  }
}
</style>