<script setup lang="ts">
import { useDataProcessStore } from '@/stores/dataProcess';
const dataprocess = useDataProcessStore();
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
  <div class="info-group">
    <div class="list-btn">
      <transition name="list-btn-fade">  
        <span class="font-awesome-icon">
          <font-awesome-icon 
            v-if="dataprocess.listOpen[index]"
            key="listOpen"
            @click="dataprocess.listBtnClick(index)"
            icon="circle-minus" />
          <font-awesome-icon 
            v-else key="listClose"
            @click="dataprocess.listBtnClick(index, dataprocess.pickUpDate, pvsn_site_cd)"
            icon="circle-chevron-down" />
        </span>
      </transition>
    </div>
    <div class="info">
      <div class="line-first">
        <div class="line-first-g1">
          <span 
            class="font-awesome-icon"
            :class="[ dataprocess.dayProcess[index]? 'on-air': 'off-air' ]"
          >
            <font-awesome-icon icon="lightbulb" />
          </span>
          <h5 class="info-box-text">{{ dataprocess.dayProcess[index].pvsn_site_cd_nm }}</h5>
          <span class="tool-tip">{{ dataprocess.dayProcess[index].pvsn_site_cd_nm }}</span>
        </div>
        <div class="line-first-g2">
          <div class="text-status">
            <h5 class="info-box-text"
              :class="{ 'status-error': dataprocess.dayProcess[index].process_sttus_cd === 'ERR' }">
            {{ 
              dataprocess.dayProcess[index].process_sttus_cd_nm?
              dataprocess.dayProcess[index].process_sttus_cd_nm:
              "로그없음"
            }}
            </h5>
          </div>
          <h5 class="info-box-text">
            {{ dataprocess.dayProcess[index].comp_cnt + '/' + dataprocess.dayProcess[index].total_cnt }}
          </h5>
        </div>
      </div>
      <div class="line-secend">
        <div class="progress-bar">
          <span :style="{ width: dataprocess.dayProcess[index].percentage }"></span>
        </div>
        <h5 class="progress-text">{{ dataprocess.dayProcess[index].percentage }}</h5>
      </div>
    </div>
  </div>
</template>
<style>
:root {
  --list-btn-color: #5e39fa;
  --list-btn-hover-color: #7c5df8;
  --none-air-color: #f1f1f3;
  --on-air-color: #2ecc71;
  --off-air-color: #f83b3b;
  --status-error-color: #f83b3b;
  --info-box-shadow-color: #f1f1f3;
  --progress-bar-color-start: #90a0bf;
  --progress-bar-color-end: #5e39fa;
  --progress-bar-background-color: #f0f0f0;
  --progress-bar-shadow-b: rgba(0, 0, 0, 0.05);
  --progress-bar-shadow-w: rgba(255, 255, 255, 0.8);
}
</style>
<style scoped lang="scss">
.info-group {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  border-style: solid;
  border-color: var(--info-box-shadow-color);
  border-radius: 5px;

  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;

  transition: all 0.2s ease-out;

  .list-btn{
    margin: 1rem 0 1rem;

    .font-awesome-icon {
      color: var(--list-btn-color);
      margin: 1rem;
      font-size: 1.2rem;
      cursor: pointer;
      
      opacity: 0;
      animation: showText 0.5s 0.5s linear forwards;

      transition: 0.5s ease-out;

      &:hover {
        color: var(--list-btn-hover-color);  
      }
    }

    .list-btn-fade-enter-active, .list-btn-fade-leave-active {
      transition: opacity 0.5s;
    }

    .list-btn-fade-enter-from, .list-btn-fade-leave-to {
      opacity: 0;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    width: 80%;
    margin-right: 0.5rem;

    .line-first {
      display: flex;
      align-items: center;
      margin-bottom: 1px;

      opacity: 0;
      animation: showText 0.5s 0.5s linear forwards;

      .line-first-g1 {
        display: flex;
        flex: 1 1 auto;
        width: 50%;
        
        .font-awesome-icon {
          color: var(--none-air-color);
          font-size: 0.7rem;
          margin-right: 0.5rem;
        }
        .on-air {
          color: var(--on-air-color);
        }
        
        .off-air {
          color: var(--off-air-color);
        }

        .tool-tip {
          --scale: 0;
          position: absolute;
          top: -3rem;
          left: 30%;
          transform: translateX(-50%) translateY(var(--tooltip-translate-y, 0)) scale(var(--scale));
          transition: 0.2s transform;
          transform-origin: bottom center;
    
          color: var(--tooltip-text-color);
          padding: 0.5rem;
          border-radius: 5px;
          text-align: center;
          width: max-content;
          background-color: var(--tooltip-background-color);
        }

        .tool-tip::after {
          --tooltip-translate-y: calc(-0.5 * var(--tooltip-arrow-size));
    
          content: '';
          top: 2.1rem;
          left: -50%;
          border: var(--tooltip-arrow-size) solid transparent;
          border-top-color: var(--tooltip-background-color);
          transform-origin: top center;
        }

        &:hover .tool-tip {
          --scale: 1;
          z-index: 101;
        }
      }

      .line-first-g2 {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        margin-bottom: 1px;

        .text-status {
          margin-left: 0.5rem;

          .status-error {
            color: var(--status-error-color);
          }
        }
      }
    }

    .line-secend {
      display: flex;
      align-items: center;
      justify-content: center;

      .progress-bar {
        position: relative;
        width: 100%;
        height: 8px;
        background-color: var(--progress-bar-background-color);
        border-radius: 10px;
        transform: scaleX(0);
        transform-origin: left;
        box-shadow: inset 0px 1px 1px var(--progress-bar-shadow-b),
                          0px 1px var(--progress-bar-shadow-w);
        animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;

        span {
          height: 100%;
          position: absolute;
          background-image: linear-gradient(45deg, var(--progress-bar-color-start), var(--progress-bar-color-end));
          border-radius: 10px;
          transform: scaleX(0);
          transform-origin: left;
          animation: animate 0.5s 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;
        }
      }

      .progress-text {
        margin-left: 1rem;

        opacity: 0;
        animation: showText 0.5s 0.5s linear forwards;
      }
    }
  }

  .info-box-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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