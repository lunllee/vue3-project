<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import { storeToRefs } from 'pinia'
import { useBarChartStore } from '@/stores/barChart';
import { useDropDownStore } from '@/stores/dropdownSelecter';
import { pvsnListAPI } from '@/components/dropdown/pvsnList.api';
const barchartStore = useBarChartStore();
const dropdown = useDropDownStore();

const { selectMenuIndex } = storeToRefs(barchartStore);

async function getPvsnList() {
  const [ error, data, options ] = await pvsnListAPI.getPvsnList();

  if (error) {
    console.log(error);    
  } else {
    dropdown.changeDataArray(data);
  }
}
getPvsnList()
</script>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      searchQuery: "",
    }
  },
  methods: {
    selectBtn(index:number, pvsn_cd:{ name:string, cd:string }|null) {
      this.$emit("selectBtn", index, pvsn_cd);
    }
  },
})
</script>
<template>
  <section class="dropdown-group">
    <div 
      class="selected-item"
      @click="dropdown.toggleDropdown"
    >
      <span
        class="selected-text" 
        v-if="dropdown.selectedItem">
        {{ dropdown.selectedItem.name }}
        <span 
          class="delete-icon"
          :class="{'selected' : dropdown.selectedItem !== null }"
          @click="dropdown.deleteItem(),selectBtn(selectMenuIndex, dropdown.selectedItem)"
          @click.prevent="dropdown.toggleDropdown"
        >
          <font-awesome-icon icon="xmark" />
        </span>
      </span>
      <span v-else>기관 선택</span>
      <span 
        class="dropdown-icon"
        :class="{'dropdown' : dropdown.isVisible }"
      >
        <font-awesome-icon icon="angle-down" />
      </span>
    </div>
    <div 
      class="dropdown-pop"
      :class="dropdown.isVisible? 'visible': 'invisible'"
    >
      <input 
        v-model="searchQuery"
        type="text"
        placeholder="기관찾기"
      />
      <span v-if="dropdown.searchData(searchQuery).length === 0">찾는 기관이 없습니다.</span>
      <div class="options">
        <ul>
          <li 
            v-for="(v, i) in dropdown.searchData(searchQuery)"
            :key="`select-${i}`"
            @click="dropdown.selectItem(v),selectBtn(selectMenuIndex, v)"
          >{{ v.name }}
          </li> 
        </ul>
      </div>
    </div>   
  </section>
</template>
<style>
:root {
  --select-item-border-color: #f1f1f3;
  --select-item-hover-color: #5e39fa;
  --select-item-delete-hover-color: #f83b3b;
  --select-box-hover-color: #252525;
}
</style>
<style scoped lang="scss">
.dropdown-group {
  display: flex;
  flex-direction: column;
  margin-left: auto;
  max-width: 350px;

  .selected-item {
    height: 40px;
    border: 2px solid var(--select-item-border-color);
    border-radius: 5px;
    padding: 5px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 250px;

    transition: 0.3s ease-out;

    .selected-text {
      color: var(--select-item-hover-color);
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      .delete-icon {
        color: var(--select-box-hover-color);
        cursor: pointer;

        transition: 0.3s ease-out;

        &:hover {
          color: var(--select-item-delete-hover-color);
        }
      }
    }

    .dropdown-icon {
      transform: rotate(0deg);
      transition: all 0.5s ease-out; 
      
      &.dropdown {
        transform: rotate(180deg);
      }
    }

    &:hover {
      border-color: var(--select-box-hover-color);

      .dropdown-icon {
        color: var(--select-box-hover-color);
      }
    }

    .dropdown-icon {
      cursor: pointer;
    }
  }

  .dropdown-pop {
    position: absolute;
    border-radius: 5px;
    border: 2px solid var(--select-item-border-color);
    top: 38px;
    left: 0;
    right: 0;
    background-color: #fff;
    max-width: 100%;
    visibility: hidden;
    transition: all 0.5s ease-in-out;
    max-height: 0;
    overflow: hidden;
    z-index: 101;

    &.visible {
      max-height: 450px;
      visibility: visible;
    }

    input {
      width: 90%;
      height: 30px;
      border: 2px solid var(--select-item-border-color);
      font-size: 16px;
      padding-left: 5px;
      margin: 5%;
    }

    span {
      width: 80%;
      margin: 10%;
    }

    .options {
      width: 100%;

      ul {
        list-style: none;
        text-align: left;
        padding-left: 8px;
        max-height: 180px;
        overflow-y: scroll;
        overflow-x: hidden;
        border: 1px solid var(--select-item-border-color);
        margin: 0 5% 5%;

        li {
          width: 100%;
          border-bottom: 1px solid var(--select-item-border-color);
          padding: 5px;
          cursor: pointer;

          transition: 0.3s ease-out;

          &:hover {
            color: var(--select-item-hover-color);
          }


          
        }
      }
    }
  }
}
</style>