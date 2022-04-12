// request.ts
import axios from "./index";
import qs from "qs"

export class Request {
  /**
   * get方法
   * @param {string} url 路径
   * @param {object} params 参数
   * @returns Promise
   */
  static get = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
      axios.get(url, { params: params }).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
  /**
   * post请求
   * @param {string} url 路径
   * @param {object} params 参数 
   * @returns Promise对象
   */
  static post = (url: string, params?: any) => {
    return new Promise((resolve, reject) => {
      axios.post(url, params).then(res => {
        resolve(res);
      }).catch(err => {
        reject(err);
      })
    })
  }
}