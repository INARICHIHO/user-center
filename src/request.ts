import axios from "axios";

const myAxios = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
  withCredentials:true,//允许跨域请求携带 cookie（用于维持登录会话）。非常重要，因为登录态通常依赖 cookie。
});

// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    console.error('请求失败', error);
    return Promise.reject(error);
  });

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log(response);
    const {data} = response;
    console.log(data);
    //未登录
    if (data.code ===40100){
        //不是获取用户信息接口，或者不是登录界面则跳转到登陆界面
        if(
            !response.request.responseURL.includes("/user/current")&&
            !window.location.pathname.includes("/user/login")
        ){
            window.location.href = `/user/login?redirect=${window.location.href}`;
        }
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    console.error('请求失败', error);
    return Promise.reject(error);
  });

  export default myAxios;