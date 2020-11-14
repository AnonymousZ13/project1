import axios from 'axios'



export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
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
};


//封装一个本地请求
export function localrequest(config) {
  const locreq = axios.create({
    baseURL: '/json/'
  })

  locreq.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  })

  return locreq(config)
}