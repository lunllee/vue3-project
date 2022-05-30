import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface DayProcess {
  pvsn_site_cd: string | null,
  pvsn_site_cd_nm: string | null,
  pvsn_site_cd_no: string | null,
  total_cnt: number | null,
  comp_cnt: number | null,
  percentage: string,
  error_cnt: number | null,
  prev_clct_log_sn: number | null,
  prev_file_nm: string | null,
  clct_log_sn: string | null,
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
  totalPage: number,
  totalCount: number,
  list: DataListValue[],
}

interface DataListValue {
  pvsn_site_cd: string,
  data_crtr_pnttm: string,
  clct_ymd: string,
  clct_log_sn: number,
  dtst_sn: number,
  file_nm: string,
  file_extn: string,
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

export default class DataProcessAPIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://192.168.0.1:20000"
    });
  }

  private async axiosCall<T>(config: AxiosRequestConfig) {
    try {
      const { data } = await this.axiosInstance.request<T>(config);
      return [ null, data ];
    } catch (error) {
      return [ error ];
    }
  }

  async getDayProcess(ymd:string, pvsn_site_cd:string|null) {
    return this.axiosCall<DayProcess[]>({ 
      method: "get", 
      params: { 
        ymd,
        pvsn_site_cd,
      }, 
      url: `/log/dayProcess`,
    });
  }

  async getDataProcessList(
    ymd:string, 
    pvsn_site_cd:string, 
    page?:string, 
    perPage?:string, 
    errorYn?:boolean,
  ) {
    return this.axiosCall<DataProcessListValue[]>({ 
      method: "get", 
      params: { 
        ymd,
        pvsn_site_cd,
        page,
        perPage,
        errorYn,
      }, 
      url: `/log/getDataProcessList`,
    });
  }

  async getFileInfo(clctLogSn:number) {
    return this.axiosCall<FileInfoData>({ 
      method: "get", 
      params: { 
        clctLogSn,
      }, 
      url: `/log/getFileInfo`,
    });
  }

  async fileResend(
    clctLogSn: number,
    dtstSn: number,
    pvsnSiteCd: string,
    dataCrtrPnttm: string,
    dataUpdtCycleCd: string,
    retransmCnt: number,
    dwLdadngYn: string,
    retransmYn: string,
  ) {
    return this.axiosCall<FileInfoData>({ 
      method: "post", 
      data: { 
        clct_log_sn : clctLogSn,
        dtst_sn : dtstSn,
        pvsn_site_cd : pvsnSiteCd,
        data_crtr_pnttm : dataCrtrPnttm,
        data_updt_cycle_cd : dataUpdtCycleCd,
        retransm_cnt : retransmCnt,
        dw_ldadng_yn : dwLdadngYn,
        retransm_yn : retransmYn,
      }, 
      url: `/resend/request`,
    });
  }
}

export const dataProcessAPI = new DataProcessAPIService();