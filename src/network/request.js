import axios from 'axios'



export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })




  //2.请求拦截
  // instance.interceptors.request.use(config => {
  //   //处理拦截的数据


  //   //返回数据
  //   return config
  // }, err => {
  //   console.log(err);
  // })



  //3.响应拦截
  instance.interceptors.response.use(res => {
    //处理拦截的数据



    //返回数据
    return res.data
  }, err => {
    console.log(err);
  })



  //3.发送真正的网络请求
  return instance(config)
}