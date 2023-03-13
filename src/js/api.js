import request from './request.js'

// export default function getCommand(data) {
//     return request({
//       url: '/custom-zd/app/findcommand/getCommand',
//       method: 'post',
//       data: data
//     })
//   }
  export default function getCommand(data) {
    return request({
      url: '/user/getCommand',
      method: 'post',
      data: data
    })
  }
  