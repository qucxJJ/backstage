import axios from 'axios';
import qs from 'qs';
import { Message } from 'element-ui';

const handleResponse = (result) => {
  return new Promise((resolve, reject) => {
    if (result.status === 200) {
      if (result.data.errNo && result.data.errNo !== 0) {
        reject(result.data);
      }
      resolve(result.data.data);
    } else {
      Message.error({
        message: `状态码：${result.status}，请检查响应信息`
      });
    }
  });
};

const _get = (url, params) => {
  return axios.request({
    url: url,
    method: 'GET',
    params: params,
    withCredentials: true,
    validateStatus: function (status) {
      return status < 600;
    }
  }).then(response => {
    return handleResponse(response);
  });
};

const _post = (url, payload) => {
  return axios.request({
    url: url,
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(payload),
    withCredentials: true,
    validateStatus: function (status) {
      return status < 600;
    }
  }).then(response => {
    return handleResponse(response);
  });
};

export const factory = (obj) => {
  let output = {};
  Object.keys(obj).forEach(methodKey => {
    Object.keys(obj[methodKey]).forEach(apiKey => {
      let api = obj[methodKey][apiKey];
      output[apiKey] = function (data) {
        switch (methodKey) {
          case 'get':
            return _get(api, data);
          case 'post':
            return _post(api, data);
          default:
            return null;
        }
      };
    });
  });
  return output;
};
