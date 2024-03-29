import { App } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "@/core/services/JwtService.ts";
import { AxiosResponse, AxiosRequestConfig } from "axios";

/**
 * @description service to call HTTP request via Axios
 */
class ApiService {
  /**
   * @description property to share vue instance
   */
  public static vueInstance: App;

  /**
   * @description initialize vue axios
   */
  public static init(app: App<Element>) {
    ApiService.vueInstance = app;
    ApiService.vueInstance.use(VueAxios, axios);
    // ApiService.vueInstance.axios.defaults.baseURL =
    //   "https://localhost:5001/api/";
    ApiService.vueInstance.axios.defaults.baseURL =
      "https://pryal-back-homol.azurewebsites.net/api/";
    ApiService.vueInstance.axios.defaults.headers.common["Accept"] =
      "application/json";
    ApiService.vueInstance.axios.defaults.headers.common["Content-Type"] =
      "application/json";
    ApiService.vueInstance.axios.defaults.headers.common[
      "Access-Control-Allow-Origin"
    ] = "*";
  }

  /**
   * @description set the default HTTP request headers
   */
  public static setHeader(): void {
    ApiService.vueInstance.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static query(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    this.setHeader();
    return ApiService.vueInstance.axios.get(resource, params).catch(error => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  }

  /**
   * @description send the GET HTTP request
   * @param resource: string
   * @param slug: string
   * @returns Promise<AxiosResponse>
   */
  public static get(resource: string): Promise<AxiosResponse> {
    this.setHeader();
    return ApiService.vueInstance.axios.get(`${resource}`).catch(error => {
      throw new Error(`[KT] ApiService ${error}`);
    });
  }

  /**
   * @description set the POST HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static post(
    resource: string,
    data: object,
    params?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    this.setHeader();
    return ApiService.vueInstance.axios.post(`${resource}`, data, params);
  }

  /**
   * @description send the UPDATE HTTP request
   * @param resource: string
   * @param slug: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static update(
    resource: string,
    slug: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    this.setHeader();
    return ApiService.vueInstance.axios.put(`${resource}/${slug}`, params);
  }

  /**
   * @description Send the PUT HTTP request
   * @param resource: string
   * @param params: AxiosRequestConfig
   * @returns Promise<AxiosResponse>
   */
  public static put(
    resource: string,
    params: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    this.setHeader();
    return ApiService.vueInstance.axios.put(`${resource}`, params);
  }

  /**
   * @description Send the DELETE HTTP request
   * @param resource: string
   * @returns Promise<AxiosResponse>
   */
  public static delete(resource: string): Promise<AxiosResponse> {
    this.setHeader();
    return ApiService.vueInstance.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`);
    });
  }
}

export default ApiService;
