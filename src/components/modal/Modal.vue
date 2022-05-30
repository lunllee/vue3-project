<script setup lang="ts">
import Button from "@/components/button/Button.vue"
import { useDataProcessStore } from '@/stores/dataProcess';
const dataprocess = useDataProcessStore();
</script>
<template>
  <transition name="fade">
    <div class="modal" v-if="dataprocess.modalOpen">
      <div 
        class="modal-bg-black"
        @click.self="dataprocess.modalHide"
      >
        <transition name="page-drop">
          <div 
            class="modal-body"
            v-if="dataprocess.modalOpen"
          >
            <h3>
              <span><font-awesome-icon icon="file" /></span>
              수집 파일 정보
            </h3>
            <h4>기본 정보</h4>
            <table class="basic-info-table">
              <tr>
                <th>수집 시스템</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.pvsn_site_cd_nm: 
                  '정보없음' 
                }}</td>
                <th>행정분야</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.administ_realm_cd_nm: 
                  '정보없음' 
                }}</td>
              </tr>
              <tr>
                <th>수집일자</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.clct_ymd: 
                  '정보없음' 
                }}</td>
                <th>데이터 생성 시점</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.data_crtr_pnttm: 
                  '정보없음' 
                }}</td>
              </tr>
              <tr>
                <th>수집 데이터 이름</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.clct_data_nm: 
                  '정보없음' 
                }}</td>
              </tr>
            </table>
            <h4 class="title">파일 정보</h4>
            <table class="file-info-table">
              <tr>
                <th>내부 파일 경로</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.inner_flpth: 
                  '정보없음' 
                }}</td>
                <th>내부 파일 이름</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.inner_file_nm: 
                  '정보없음' 
                }}</td>
              </tr>
              <tr>
                <th>파일 확장자</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.inner_file_extn: 
                  '정보없음' 
                }}</td>
                <th>파일 크기</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.inner_file_size + ' Bytes': 
                  '정보없음' 
                }}</td>
              </tr>
              <tr>
                <th>현재 상태</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.process_sttus_cd_nm: 
                  '정보없음' 
                }}</td>
                <th>재전송 횟수</th>
                <td>{{ 
                  dataprocess.modalInfo? 
                  dataprocess.modalInfo.retransm_cnt: 
                  '정보없음' 
                }}</td>
              </tr>
            </table>
            <div class="btn-area">
              <Button 
                v-if="dataprocess.modalInfo && 
                  dataprocess.modalInfo.process_sttus_cd === 'error' &&
                  dataprocess.modalInfo.retransm_yn !== 'Y'"
                :isError="true"
                :btnText="'재전송'" 
              />
              <Button :btnText="'닫기'" />
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>
<style>
:root {
  --modal-background-color: rgba(0, 0, 0, 0.4);
  --modal-body-color: white;
}
</style>
<style scoped lang="scss">
body {
  margin : 0
}

div {
  box-sizing: border-box;
}

.modal {
  z-index: 110;

  transition: 0.3s ease-out;

  .modal-bg-black {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--modal-background-color);
    position: fixed;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;

    padding: 4rem 20%;

    .modal-body {
      background: var(--modal-body-color);
      border-radius: 3rem;
      padding: 3rem;
      width: 100%;

      h3 {
        margin: 0 0.5rem 0.5rem;
      }

      .title {
        margin-top: 1rem;
      }

      .basic-info-table, .file-info-table {
        width: 100%;
        margin-bottom: 2rem;
        border-spacing: 0;

        tr {
          th {
            text-align: center;
            font-size: 13px;
            
            padding: 0.5rem 0;

            border-style: solid;
            border-color: var(--drop-down-background-color);
            border-width: 1px 0;
          }

          td {
            text-align: center;
            font-size: 12px;

            padding: 0.5rem 0;

            border-style: solid;
            border-color: var(--drop-down-background-color);
            border-width: 1px 0;
          }
        }
      }

      .btn-area{
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>