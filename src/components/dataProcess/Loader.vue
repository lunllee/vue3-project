<script setup lang="ts">
import { useDataProcessStore } from '@/stores/dataProcess';
const dataprocess = useDataProcessStore();
</script>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    pIndex: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      default: "",
    },
    lineText: {
      type: String,
      default: "",
    },
    end: {
      type: Boolean,
      defalut: false,
    }
  }
})
</script>
<template>
  <div class="loader-group">
    <div :class="[end? 'middle-line-end' : 'middle-line' ]">
      <div class="lds-ring">
        <div 
          class="ring-group"
          v-if="
            'work' === dataprocess.dayProcess[pIndex].process_sttus_cd &&
            code === dataprocess.dayProcess[pIndex].process_detail_sttus_cd
          "
          v-for="n in 4"
        ></div>
        <div 
          class="rcomp-group"
          v-else-if="
            'comp' === dataprocess.dayProcess[pIndex].process_sttus_cd &&
            code === dataprocess.dayProcess[pIndex].process_detail_sttus_cd
          "
        ></div>
        <div 
          class="rerr-group"
          v-else-if="
            'err' === dataprocess.dayProcess[pIndex].process_sttus_cd &&
            code === dataprocess.dayProcess[pIndex].process_detail_sttus_cd
          "
        ></div>
        <div 
          class="rnone-group"
          v-else
        ></div>
      </div>
    </div>
    <h6 class="line-text">
      {{ lineText }}
    </h6>
  </div>
</template>
<style>
:root {
  --loader-ready-color: #f1f1f3;
  --loader-work-color: #5e39fa;
  --loader-comp-color: #5e39fa;
  --loader-done-color: #2ecc71;
  --loader-error-color: #f83b3b;
}
</style>
<style scoped lang="scss">
.loader-group{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 12.5%;

  .middle-line {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  
    &::before, &::after {
      content: "";
      display: block;
      flex-grow: 1;
      height: 1px;
      background: var(--loader-ready-color);
    }
  }

  .middle-line-end {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  
    &::before {
      content: "";
      display: block;
      flex-grow: 1;
      height: 1px;
      background: var(--loader-ready-color);
    }
    &::after {
      content: "";
      display: block;
      flex-grow: 1;
      height: 1px;
      background: transparent;
    }
  }

  .lds-ring {
    display: flex;
    position: relative;
    width: 20px;
    height: 20px;

    opacity: 0;
    animation: showText 0.5s 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;
  
    .ring-group {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      border: 5px solid var(--loader-work-color);
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: var(--loader-work-color) transparent transparent transparent;
  
      &.ring-group:nth-child(1) {
         animation-delay: -0.45s;
      }
      &.ring-group:nth-child(2) {
         animation-delay: -0.3s;
      }
      &.ring-group:nth-child(3) {
         animation-delay: -0.15s;
      }
    }

    .rcomp-group {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      border: 5px solid var(--loader-comp-color);
      border-radius: 50%;
      border-color: var(--loader-comp-color);
    }

    .rnone-group {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      border: 5px solid var(--loader-ready-color);
      border-radius: 50%;
      border-color: var(--loader-ready-color);
    }
    
    .rerr-group {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 20px;
      height: 20px;
      border: 5px solid var(--loader-error-color);
      border-radius: 50%;
      border-color: var(--loader-error-color);
      animation: lds-grid 1.2s linear infinite;
    }
  }

  .line-text {
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

    opacity: 0;
    animation: showText 0.5s 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;
  }
}

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes lds-grid {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}

@keyframes showText {
  100% {
    opacity: 1;
  }
}

@keyframes animate {
  100% {
    transform: scaleX(1);
  }
}
</style>