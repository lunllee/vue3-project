import { defineStore } from "pinia";
import { dataProcessAPI } from '@/components/dataProcess/dataProcess.api';
import { getToday } from "@/components/utils/today";
const todayArr = getToday();

interface DayProcess {
  pvsn_site_cd: string,
  pvsn_site_cd_nm: string | null,
  pvsn_site_cd_no: string | null,
  total_cnt: number | null,
  comp_cnt: number | null,
  percentage: string,
  error_cnt: number | null,
  prev_clct_log_sn: number | null,
  prev_file_nm: string | null,
  clct_log_sn: number | null,
  file_clct_sttus_cd: string | null,
  inner_file_ldadng_sttus_cd: string | null,
  dw_ldadng_sttus_cd: string | null,
  file_nm: string | null,
  next_file_nm: string | null,
  next_clct_log_sn: number | null,
  process_sttus: string | null,
  process_sttus_cd: string,
  process_sttus_cd_nm: string | null,
  process_detail_sttus_cd: string | null,
  process_detail_sttus_cd_nm: string | null,
}

interface DataProcessListValue {
  pvsn_site_cd: string,
  pvsn_site_cd_nm: string,
  data_crtr_pnttm: string,
  clct_ymd: string,
  clct_log_sn: number,
  dtst_sn: number,
  file_nm: string,
  file_extn: string,
  file_clct_dt: string,
  data_updt_cycle_cd: string,
  clct_data_nm: string,
  administ_realm_cd: string,
  administ_realm_cd_nm: string,
  process_sttus: string,
  process_sttus_cd: string,
  process_sttus_cd_nm: string,
  process_detail_sttus_cd: string,
  process_detail_sttus_cd_nm: string,
  retransm_cnt: number,
}

interface Dropdown {
  pageData: DataProcessListValue[],
  totalCount: number;
  totalPage: number,
  activePage: number,
  isLoading: boolean,
  errorYN: boolean,
  pageIndexArr: number[], 
}

interface FileInfoData {
  retransm_yn: string,
  process_sttus: string,
  clct_data_nm: string,
  retransm_cnt: number,
  pvsn_site_cd: string,
  dtst_sn: number,
  process_sttus_cd_nm: string,
  process_detail_sttus_cd_nm: string,
  inner_file_extn: string,
  process_detail_sttus_cd: string,
  dw_ldadng_yn: string,
  file_clct_dt: string,
  clct_ymd: string,
  administ_realm_cd_nm: string,
  pvsn_site_cd_nm: string,
  data_crtr_pnttm: string,
  inner_file_nm: string,
  inner_file_size: number,
  data_updt_cycle_cd: string,
  administ_realm_cd: string,
  crt_dt: string,
  inner_flpth: string,
  process_sttus_cd: string,
  clct_log_sn: number,
}

interface DataProcessStore {
  dayProcess: DayProcess[],
  modalOpen: boolean,
  modalInfo: FileInfoData | null,
  modalLoading: boolean,
  listOpen: boolean[],
  dropdown: Dropdown[],
  pickUpDate: string,
}

export const useDataProcessStore = defineStore({
  id: "dataProcess",
  state: () : DataProcessStore => ({
    dayProcess: [],
    modalOpen: false,
    modalInfo: null,
    modalLoading: false,
    listOpen: [],
    dropdown: [],
    pickUpDate: todayArr[0],
  }),
  getters: {
    // getListOpen: (state) => {
    //   return (index:number) => state.dayProcess[index].listOpen
    // },
  },
  actions: {
    async modalShow(clctLogSn:number|null) {
      this.modalOpen = true;
      if(clctLogSn) {
        this.modalLoading = true;
        const [ error, data, options ]:any = await dataProcessAPI.getFileInfo(clctLogSn);
        if (error) {
          this.modalLoading = false;
          console.log("error :" + error);
        } else {
          this.modalInfo = data;
          this.modalLoading = false;
        }
      }
      else {
        this.modalInfo = null;
      }
    },
    async modalResend(
      clctLogSn: number|undefined,
      dtstSn: number|undefined,
      pvsnSiteCd: string|undefined,
      dataCrtrPnttm: string|undefined,
      dataUpdtCycleCd: string|undefined,
      retransmCnt: number|undefined,
      dwLdadngYn: string,
      retransmYn: string,
    ) {
      if(clctLogSn !== undefined && 
         dtstSn !== undefined &&
         pvsnSiteCd  !== undefined &&
         dataCrtrPnttm !== undefined && 
         dataUpdtCycleCd !== undefined &&
         retransmCnt !== undefined) {
        const [error, data, options]:any = await dataProcessAPI.fileResend(clctLogSn,
                                                                           dtstSn,
                                                                           pvsnSiteCd,
                                                                           dataCrtrPnttm,
                                                                           dataUpdtCycleCd,
                                                                           retransmCnt,
                                                                           dwLdadngYn,
                                                                           retransmYn);
        if (error) {
        console.log("error :" + error);
        } else {
        console.log("resend :" + clctLogSn);
        }
      }
      this.modalOpen = false;
    },
    modalHide() {
      this.modalOpen = false;
    },
    async listBtnClick(
      index: number,
      ymd?: string, 
      pvsn_cd?: string, 
      errorYn?: boolean,
      page?: string, 
      perPage?: string,
    ) {
      if(errorYn) {
        this.listOpen[index] = true;
      } else {
        this.listOpen[index] = !this.listOpen[index];
      }

      if(this.listOpen[index] && ymd && pvsn_cd) {
        this.setDropDownLoading(index, true);
        const [ error, data, options ]:any = await dataProcessAPI.getDataProcessList(
                                                                    ymd, 
                                                                    pvsn_cd,
                                                                    page,
                                                                    perPage,
                                                                    errorYn
                                                                  );
        if (error) {
          this.setDropDownLoading(index, false);
          console.log("error :" + error);
        } else {
          this.setDropDown(index, data.totalCount, data.totalPage, 1, data.list, errorYn);
          this.setDropDownLoading(index, false);
        }
      }
    },
    async pageBtnClick(
      index: number, 
      page: number,
      ymd: string,
      pvsn_cd: string,
      errorYn?: boolean,
      perPage?: string,
    ) {
      this.setDropDownLoading(index, true);
      const [ error, data, options ]:any = await dataProcessAPI.getDataProcessList(
                                                                  ymd, 
                                                                  pvsn_cd,
                                                                  page.toString(),
                                                                  perPage,
                                                                  errorYn
                                                                );
      if (error) {
        this.setDropDownLoading(index, false);
        console.log("error :" + error);
      } else {
        this.setDropDown(index, data.totalCount, data.totalPage, page, data.list, errorYn);
        this.setDropDownLoading(index, false);
      }

      this.dropdown[index].activePage = page;
    },
    setDropDownLoading(index:number ,bool: boolean) {
      if(!this.dropdown[index]) {
        this.dropdown[index] = {
          totalCount: 0,
          totalPage: 0,
          activePage: 1,
          pageData: [],
          isLoading: false,
          errorYN: false,
          pageIndexArr: [],
        }
      }

      this.dropdown[index].isLoading = bool;
    },
    setDropDown(index: number,
                totalCount: number,
                totalPage: number,
                activePage: number,
                data: DataProcessListValue[],
                errorYn?: boolean,) {
      this.dropdown[index].totalCount = totalCount;
      this.dropdown[index].totalPage = totalPage; 
      this.dropdown[index].activePage = activePage;
      this.dropdown[index].pageData = data;
      this.dropdown[index].errorYN = errorYn? errorYn: false;
      this.setPagingArr(totalPage, 5, activePage, index);
    },
    setPagingArr(totalPage: number, limit: number, active: number, dropdownIndex: number) {
      const startIndex = (Math.ceil(active / limit) - 1) * limit + 1;
      const endIndex = 
        startIndex + limit > totalPage? totalPage : startIndex + limit - 1;
      let indexArr = [];
      for(let i = startIndex; i <= endIndex; i++) {
        indexArr.push(i);
      }
      this.dropdown[dropdownIndex].pageIndexArr = indexArr;
    },
    setpickUpDate(date:string) {
      this.pickUpDate = date;
    }
  },
});