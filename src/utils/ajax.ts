import axios from 'axios'
import { Toast } from 'antd-mobile'

function tip(msg: string) {
  Toast.info(msg)
}

function toLogin() {}

function errHandler(status: number, other: any) {
  switch (status) {
		case 400: 
			tip(other)
			break;
    case 401:
			if(localStorage.getItem('accessToken')) {
				tip('登录信息失效 请重新登录')
				localStorage.removeItem('accessToken')
				setTimeout(()=>{
					toLogin()
				}, 3000)
			}
			break
    case 403:
      if(localStorage.getItem('accessToken')) {
				tip('该账号已在其他设备登录 请重新登录')
				localStorage.removeItem('accessToken')
				setTimeout(()=>{
					toLogin()
				}, 3000)
			}
      break
    case 404:
      tip('请求的资源不存在')
      break
    default:
      tip('出错了，稍后重试')
      break
  }
}

const instance = axios.create({ timeout: 1000*12 })
instance.interceptors.request.use(
  config => {
    // const token = localStorage.getItem('accessToken')
    // config.headers.withCredentials = true
    // token && (config.headers.Authorization = token)
    return config
  },
  err => Promise.reject(err)
)
instance.interceptors.response.use(
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  err => {
    const { response } = err
    if(response) errHandler(response.status, response.data.message)
    else Promise.reject(err)
  }
)

export default instance