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
  },
})
</script>
<template>
  <div class="file-list-group">
    <div class="file-list">
      <li 
        class="prev-file"
        @click="dataprocess.modalShow(
          dataprocess.dayProcess[index]?
          dataprocess.dayProcess[index].prev_clct_log_sn:
          null
        )"
      >
        <h5 class="file-list-box-text">
          {{ 
            dataprocess.dayProcess[index].prev_file_nm?
            dataprocess.dayProcess[index].prev_file_nm:
            " "
          }}
        </h5>
        <span class="tool-tip">
          {{ dataprocess.dayProcess[index].prev_file_nm }}
        </span>
      </li>
      <li
        class="processing-file" 
        @click="dataprocess.modalShow(
          dataprocess.dayProcess[index]?
          dataprocess.dayProcess[index].clct_log_sn:
          null
        )"
      >
        <h5 class="file-list-box-text">
          {{ 
            dataprocess.dayProcess[index].file_nm?
            dataprocess.dayProcess[index].file_nm:
            " "
          }}
        </h5>
        <span class="tool-tip">
          {{ dataprocess.dayProcess[index].file_nm }}
        </span>
      </li>
      <li 
        class="next-file"
        @click="dataprocess.modalShow(
          dataprocess.dayProcess[index]?
          dataprocess.dayProcess[index].next_clct_log_sn:
          null
        )"
      >
        <h5 class="file-list-box-text">
          {{ 
            dataprocess.dayProcess[index].next_file_nm?
            dataprocess.dayProcess[index].next_file_nm:
            " "
          }}
        </h5>
        <span class="tool-tip">
          {{ dataprocess.dayProcess[index].next_file_nm }}
        </span>
      </li>
    </div>
  </div>
  <div class="error-count-group">
    <div class="error-count">
      <li>
        <h5>오류 <span>{{ dataprocess.dayProcess[index].error_cnt }}</span>건</h5>
      </li>
    </div>
    <div 
      class="error-btn"
      @click="dataprocess.listBtnClick(index, dataprocess.pickUpDate, pvsn_site_cd, true)"
    >
      <span class="font-awesome-icon">
        <font-awesome-icon icon="magnifying-glass-plus" />
      </span>
      <h6 class="file-list-box-text">오류정보</h6>
    </div>
  </div>
</template>
<style>
:root {
  --file-list-background-color: #f1f1f3;
  --file-ready-done-color: #c3c5c6;
  --file-processing-color: black;
  --file-detail-color: rgba(95, 58, 250);
  --file-detail-color-hover: rgb(95, 108, 250);
  --file-detail-error-color: rgba(248, 59, 59);
  --file-detail-error-color-hover: rgba(248, 109, 109);

  --tooltip-text-color: #f1f1f3;
  --tooltip-background-color: #333333;
  --tooltip-arrow-size: 4px;
}
</style>
<style scoped lang="scss">
.file-list-group {
  display: flex;
  align-items: center;
  width: 59%;
  height: 100%;
  background-color: var(--file-list-background-color);

  border-style: solid;
  border-color: var(--file-list-background-color);
  border-radius: 5px;

  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;

  .file-list {
    width: 96%;
    margin-left: 0.7rem;
    margin-right: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      color: var(--file-ready-done-color);
      list-style: none;
      cursor: pointer;

      opacity: 0;
      animation: showText 0.5s 0.5s linear forwards;

      transition: all 0.3s ease-out;

      &:hover {
        color: var(--file-detail-color);
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
    .processing-file {
      color: var(--file-processing-color);
    }
  }

  .file-list-box-text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}

.error-count-group {
  z-index: -1;
  display: flex;
  align-items: center;
  width: 40%;
  height: 100%;
  margin-left: 0.4rem;
  background-color: var(--file-list-background-color);

  border-style: solid;
  border-color: var(--file-list-background-color);
  border-radius: 5px;

  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;

  .error-count {
    width: 45%;
    margin-left: 0.7rem;
    margin-right: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li {
      color: var(--file-processing-color);
      list-style: none;
      text-align: center;

      opacity: 0;
      animation: showText 0.5s 0.5s linear forwards;

      transition: all 0.3s ease-out;

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      span {
        color: var(--file-detail-error-color);
      }
    }
  }
  .error-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    cursor: pointer;

    opacity: 0;
    animation: showText 0.5s 0.5s linear forwards;

    transition: all 0.3s ease-out;

    h6 {
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .font-awesome-icon {
      font-size: 1rem;
    }

    &:hover {
      color: var(--file-detail-error-color);
    }
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