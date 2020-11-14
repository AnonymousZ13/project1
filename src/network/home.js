import {request, localrequest} from './request'

export function getHomedata() {
  return request({
    url: '/home/multidata'
  })
}


// export function getHomeGoods(type, page) {
//   return request ({
//     url: '/home/data',
//     params: {
//       type,
//       page
//     }
//   })
// }


export function getHomeGoods() {
  return localrequest({
    url: '/data.json'
  })
}