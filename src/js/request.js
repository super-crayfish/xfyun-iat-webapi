import axios from 'axios'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

axios.defaults.baseURL = 'http://localhost:8081/';

window.$config = {
	apiBaseURL:axios.defaults.baseURL
};

const errorCode = {
  '401': '认证失败，无法访问系统资源',
  '403': '当前操作没有权限',
  '404': '访问资源不存在',
  'default': '系统未知错误，请反馈给管理员'
}
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  //baseURL: configjson.apiUrl?configjson.apiUrl: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 30000
})
// request拦截器
service.interceptors.request.use(config => {

  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof(value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      console.log("登录状态已过期,请重新登录")
    } else if (code === 500) {
      console.log(msg);
      return Promise.reject(new Error(msg))
    } else if (code == 1000) {//后端校验出错
      console.log(msg);
      return Promise.reject(new Error(msg))
    }  else if (code !== 200) {
      console.log(msg);
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    console.log(message);
    return Promise.reject(error)
  }
)

export const postForm = (url, arg) => {
  const formData = new FormData();
  if (arg) {
    Object.keys(arg).forEach((k) => formData.append(k, arg[k]));
  }
  return axios.post(url, formData, {
    'Content-Type': 'multipart/form-data',
  });
};

export default service
