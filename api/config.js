/* eslint-disable */
export const ERR_OK = 0;
import axios from 'axios';

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = '/api'
} else if (process.env.NODE_ENV === 'porduction') {
  baseUrl = process.env.production.BASE_URL;
}
// 将获得的数据接口封装为axios,便于使用promise
export function get(url) {
  return function (params = {}) {
    return axios
      .get(baseUrl + url, {
        params,
      })
      .then((res) => {
        const { stu, data } = res.data;
        if (stu === ERR_OK) {
          return data;
        }
      })
      .catch((e) => {});
  };
}
