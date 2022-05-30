<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    let dataTime = ref('')
    
    let timer: number | null = null

    const getNowTime = () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = now.getMonth() >= 9 ? now.getMonth() + 1 : `0${now.getMonth() + 1}`
      const date = now.getDate() >= 10 ? now.getDate() : `0${now.getDate()}`
      const hour = now.getHours() >= 10 ? now.getHours() : `0${now.getHours()}`
      const minutes = now.getMinutes() >= 10 ? now.getMinutes() : `0${now.getMinutes()}`
      const seconds = now.getSeconds() >= 10 ? now.getSeconds() : `0${now.getSeconds()}`
      dataTime.value = `${year}년 ${month}월${date}일 ${hour}:${minutes}:${seconds}`
    }

    onMounted(() => {
      getNowTime()
      timer = setInterval(() => {
        getNowTime()
      }, 1000)
    })

    onBeforeMount(() => {
      clearInterval(Number(timer))
    })

    return {
      dataTime
    }
  }
})
</script>
<template>
  <div class="today-timer">
    <span><font-awesome-icon icon="clock" /></span>
    {{ dataTime }}
  </div>
</template>
<style scoped lang="scss">
.today-timer {
  display: flex;
  height: 40px;
  border: 2px solid var(--time-picker-border-color);
  border-radius: 5px;
  padding: 0 0.5rem 0 0.5rem;
  align-items: center;
  width: 216px;
  outline: none;
  font-size: 14px;

  transform: scaleX(0);
  transform-origin: left;
  animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;

  transition: all 0.2s ease-out;

  span {
    padding-right: 0.4rem;
  }
}

@keyframes animate {
  100% {
    transform: scaleX(1);
  }
}
</style>