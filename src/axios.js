
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/',
  timeout: 10000,
  params: {}
})

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
instance.defaults.headers.post['Content-Type'] = 'application/JSON'

const myRequestInterceptors = axios.interceptors.request.use(request => {
  // console.log('interceptors-request from instance:', request)
  return request
}, error => {
  // console.log('interceptors-request-error from instance:', error)
  return Promise.reject(error)
})

const myResponseInterceptors = axios.interceptors.response.use(response => {
  // console.log('interceptors-response from instance:', response)
  return response
}, error => {
  // console.log('interceptors-response-error from instance:', error)
  return Promise.reject(error)
})

instance.interceptors.request.eject(myRequestInterceptors)
instance.interceptors.response.eject(myResponseInterceptors)

export default instance
