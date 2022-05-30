import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface ChartValue {
  dt: string,
  cnt: number,
}

export default class BarChartAPIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://192.168.0.1:20000/chart"
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

  async getHourList(ymd:string, pvsn_site_cd:string|null) {
    return this.axiosCall<ChartValue[]>({ 
      method: "get", 
      params: { 
        ymd,
        pvsn_site_cd,
      }, 
      url: `/hour`,
    });
  }

  async getDayList(startymd:string, endymd:string, pvsn_site_cd:string|null) {
    return this.axiosCall<ChartValue[]>({ 
      method: "get", 
      params: { 
        startymd,
        endymd,
        pvsn_site_cd,
      }, 
      url: `/day`,
    });
  }

  async getMonthList(ymd:string, pvsn_site_cd:string|null) {
    return this.axiosCall<ChartValue[]>({ 
      method: "get", 
      params: { 
        ymd,
        pvsn_site_cd,
      }, 
      url: `/month`,
    });
  }

  async getYearList(startyear:string, endyear:string, pvsn_site_cd:string|null) {
    return this.axiosCall<ChartValue[]>({ 
      method: "get", 
      params: { 
        startyear,
        endyear,
        pvsn_site_cd,
      }, 
      url: `/year`,
    });
  }
}

export const barChartAPI = new BarChartAPIService();