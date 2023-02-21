import request from './request.js'

export default function getCommand(data) {
    return request({
      url: '/user/getCommand',
      method: 'post',
      data: data
    })
  }

  