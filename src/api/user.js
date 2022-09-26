import request from '@/utils/request'

export function login(data) {

}

export function getInfo(token) {

}

export function logout() {

}
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
