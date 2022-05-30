<script setup lang="ts">
import Loader from "./Loader.vue";

const processArr = [
  { code: "RF01", statusName: "데이터 조회중" },
  { code: "RF02", statusName: "데이터 수집중" },
  { code: "RF03", statusName: "파일 전송 완료" },
  { code: "RI01", statusName: "파일 적재 준비" },
  { code: "RI02", statusName: "파일 적재 중" },
  { code: "RI03", statusName: "파일 적재 완료" },
  { code: "RD01", statusName: "파일 복호화 완료" },
  { code: "RD02", statusName: "DB 적재 중" },
]
</script>
<script lang="ts">
import { defineComponent, watchEffect } from 'vue';

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    }
  }
})
</script>
<template>
  <div class="process-status-group">
    <Loader 
      v-for="(v, i) in processArr"
      :pIndex="index"
      :code="v.code"
      :lineText="v.statusName"
      :end="i == (processArr.length - 1)"
    >
    </Loader>
  </div>
</template>
<style>
:root {
  --process-box-shadow-color: #f1f1f3;  
}
</style>
<style scoped lang="scss">
.process-status-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  border-style: solid;
  border-color: var(--process-box-shadow-color);
  border-radius: 5px;

  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;
}

@keyframes animate {
  100% {
    transform: scaleX(1);
  }
}
</style>