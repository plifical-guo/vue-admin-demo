import request from '@/utils/request'


export function loginByUsername(username, password) {
  const data = {
    loginName: username,
    password: password
  }
  return request({
    url: 'eoms/user/login',
    method: 'post',
    data
  })
}


export function logout(token) {
  const data = {
    token: token
  }
  return request({
    url: 'eoms/user/logout',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  const data = {
    token: token
  }
  return request({
    url: 'eoms/user/info',
    method: 'post',
    data
  })
}
