import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  itmeout: 5000
})

service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
},
error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  const { data, message, success } = response.data
  if (success) {
    return data
  }
  Message.error(message)
  // throw (new Error(message))
  return Promise.reject(new Error(message))
}, error => {
  Message.error(error.message)
  return Promise.reject(error.message)
})

export default service
