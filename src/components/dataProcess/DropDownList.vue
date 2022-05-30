<script setup lang="ts">
import { useDataProcessStore } from '@/stores/dataProcess';
const dataprocess = useDataProcessStore();
</script>
<script lang="ts">
import { defineComponent } from 'vue';

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
  <transition-group name="dropdown-list">
    <div
      v-if="dataprocess.listOpen[index]"
      class="drop-down-group">
      <h3>
        <span><font-awesome-icon icon="square-caret-down" /></span>
        데이터 처리 상세
      </h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>순번</th>
            <th>수집 일자</th>
            <th>파일 수집 일자</th>
            <th>수집 시스템</th>
            <th>수집데이터 이름</th>
            <th>행정분야</th>
            <th>파일명</th>
            <th>파일확장자</th>
            <th>현재 상태</th>
            <th>재전송횟수</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(d, i) in dataprocess.dropdown[index].pageData"
            :class="{ 'error-line': d.process_sttus_cd_nm === '에러'}"
            @click="dataprocess.modalShow(d.clct_log_sn)"
          >
            <td>{{ (dataprocess.dropdown[index].totalCount - ((dataprocess.dropdown[index].activePage - 1) * 10)) - i }}</td>
            <td>{{ d.clct_ymd }}</td>
            <td>{{ d.file_clct_dt }}</td>
            <td>{{ d.pvsn_site_cd_nm }}</td>
            <td>{{ d.clct_data_nm }}</td>
            <td>{{ d.administ_realm_cd_nm }}</td>
            <td>{{ d.file_nm }}</td>
            <td>{{ d.file_extn }}</td>
            <td
              :class="{ 'error-text': d.process_sttus_cd_nm === '에러'}"
            >{{ d.process_sttus_cd_nm }}</td>
            <td>{{ d.retransm_cnt }}</td>
          </tr>
        </tbody>
      </table>
      <nav class="page-group">
        <div class="page-select">
          <li>
            <span 
              :class="[ dataprocess.dropdown[index].activePage !== 1? 'text' : 'dis-text' ]"
              @click="[ 
                dataprocess.dropdown[index].activePage !== 1? 
                dataprocess.pageBtnClick(
                  index, 
                  dataprocess.dropdown[index].activePage - 1,
                  dataprocess.pickUpDate,
                  pvsn_site_cd,
                  dataprocess.dropdown[index].errorYN): ''
              ]"
            >
              <font-awesome-icon icon="angle-left" />
            </span>
          </li>
          <li 
            v-for="(mt, i) in dataprocess.dropdown[index].pageIndexArr" 
            :key="i"
          >
            <span 
            class="text"
            :class="{ active: (i + 1) === 
              ((dataprocess.dropdown[index].activePage % 5 === 0)? 
              5 : dataprocess.dropdown[index].activePage % 5 )
            }"
            @click="dataprocess.pageBtnClick(
                                  index, 
                                  mt,
                                  dataprocess.pickUpDate,
                                  pvsn_site_cd,
                                  dataprocess.dropdown[index].errorYN)"
            >
              {{ mt }}
            </span>
          </li>
          <li>
            <span 
              :class="[ dataprocess.dropdown[index].activePage !== dataprocess.dropdown[index].totalPage? 
                'text' : 'dis-text' ]"
              @click="[
                dataprocess.dropdown[index].activePage !== dataprocess.dropdown[index].totalPage?
                dataprocess.pageBtnClick(
                  index, 
                  dataprocess.dropdown[index].activePage + 1,
                  dataprocess.pickUpDate,
                  pvsn_site_cd,
                  dataprocess.dropdown[index].errorYN): ''
              ]"
            >
              <font-awesome-icon icon="angle-right" />
            </span>
          </li>
        </div>
      </nav>
    </div>
  </transition-group>
</template>
<style>
:root {
  --drop-down-background-color: #f1f1f3;
  --drop-down-text-hover-color: rgba(95, 58, 250);
  --drop-down-error-text-hover-color: rgba(248, 59, 59);
}
</style>
<style scoped lang="scss">
.drop-down-group {
  width: 100%;
  padding: 0.5rem 2rem;
  border-radius: 5px;

  transition: 0.5s ease-out;

  h3 {
    margin: 0 1rem;
    padding-bottom: 1rem;
  }
  
  .data-table {
    width: 100%;
    border-spacing: 0;
  }

  tbody {
    tr {
      cursor: pointer;

      transition: all 0.2s ease-out;

      &:hover {
        color: var(--drop-down-text-hover-color);
      }
    }
  }

  thead, tbody {
    tr {
      th, td {
        text-align: center;
        font-size: 10px;

        padding: 0.5rem 0;

        border-style: solid;
        border-color: var(--drop-down-background-color);
        border-width: 1px 0;
      }

      .sort-left {
        text-align: left;
      }
    }
  }

  .error-line {
    &:hover {
      color: var(--drop-down-error-text-hover-color);
    }
  }

  .error-text {
    color: var(--drop-down-error-text-hover-color);
  }
}

.dropdown-list-enter-active, .dropdown-list-leave-active {
  transform: scaleY(1);
  transform-origin: top;
  transition: all 0.5s ease-out;
}

.dropdown-list-enter-from, .dropdown-list-leave-to {
  opacity: 0;
  transform: scaleY(0);
}

.page-group {
  .page-select {
    padding: 0.5rem 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      list-style: none;
      padding: 0.5rem;
      background-color: white;
  
      .text {
        color: var(--barchart-menu-color);
        cursor: pointer;
        transition: 0.2s ease-out;
  
        &:hover, &.active {
          color: var(--barchart-menu-hover-color);
        }
      }

      .dis-text {
        color: var(--barchart-menu-color);
        transition: 0.2s ease-out;
      }
    }
  }
}
</style>