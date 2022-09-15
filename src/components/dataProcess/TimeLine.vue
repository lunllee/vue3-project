<script setup lang="ts">
import { ref, watch, computed } from "vue";
//import TodayTimer from "@/components/timer/TodayTimer.vue"
import { useDataProcessStore } from '@/stores/dataProcess';
const dataprocess = useDataProcessStore(); 
const date = ref();

watch (date, () => {
  const pickDate = date.value;
  const pickYear = pickDate.getFullYear();
  const pickMonth = pickDate.getMonth() >= 9 ? pickDate.getMonth() + 1 : `0${pickDate.getMonth() + 1}`;
  const pickDay = pickDate.getDate() >= 10 ? pickDate.getDate() : `0${pickDate.getDate()}`;

  dataprocess.setpickUpDate(`${pickYear}${pickMonth}${pickDay}`);
  for(let i = 0; dataprocess.dayProcess.length > i;i++){
    dataprocess.listOpen[i] = false;
  }
});

function errorcntTotal(){
  let errortotal = 0;
  for(let i = 0; dataprocess.dayProcess.length > i;i++){
    errortotal += dataprocess.dayProcess[i].error_cnt;
  }
 return errortotal
}

</script>
<script lang="ts">

export default {
  data() {
    return {
      attrs: [
        {
          key: 'today',
          bar: true,
          dates: new Date(),
        }
      ],
    }
  },
}
</script>

<template>
  <div class="time-line-group">
    <div class="date-picker">
      <v-date-picker 
        v-model="date"
        :max-date="new Date()"
        :attributes="attrs"
      >
        <template v-slot="{ inputValue, inputEvents }">
          <input
            class="picker-input"
            :value="inputValue"
            v-on="inputEvents"
            placeholder="날짜를 선택하세요"
          />
        </template>
      </v-date-picker>
    </div>
    <!-- <div class="today-time">
      <TodayTimer />
    </div> -->
    
    <marquee class="errorcnt_mar">오류 총 <span>{{errorcntTotal()}}</span>건이 발생했습니다.</marquee>
    
  </div>
</template>
<style>
:root {
  --time-picker-border-color: #f1f1f3;
  --time-picker-hover-color: #252525;
}
</style>
<style scoped lang="scss">
.time-line-group {
  display: flex;
  flex-direction: row-reverse;
  max-width: 100%;
  padding-right: 0.7rem;

  .date-picker {
    z-index: 101;
    padding-left: 0.4rem;

    transform: scaleX(0);
    transform-origin: left;
    animation: animate 0.5s cubic-bezier(1, 0, 0.5, 1) forwards;
  
    transition: all 0.2s ease-out;

    .picker-input {
      display: flex;
      height: 40px;
      border: 2px solid var(--time-picker-border-color);
      border-radius: 5px;
      padding: 0 0.5rem 0 2rem;
      justify-content: space-between;
      align-items: center;
      width: 250px;
      outline: none;
      font-size: 14px;

      background-image: url('../../assets/icons/calendar-day-solid.svg');
      background-repeat: no-repeat;
      background-position: 0.6rem 0.5rem ;
      background-size: 1rem;
  
      transition: 0.3s ease-out;

      &:hover {
        border-color: var(--time-picker-hover-color);
      }
    }
  }

  .errorcnt_mar{
    color : red;
    margin : 0px 10px;
  }
}

@keyframes animate {
  100% {
    transform: scaleX(1);
  }
}
</style>