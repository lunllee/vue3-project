import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

interface Pvsn {
  name: string,
  cd: string,
}

export default class PvsnListAPIService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://192.168.2.105:20000/log"
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

  async getPvsnList() {
    return this.axiosCall<Pvsn[]>({ method: "get", url: `/getPvsnList` });;
  }
}

export const pvsnListAPI = new PvsnListAPIService();