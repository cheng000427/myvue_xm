import axios from '@/utils/myaxios.js'

// 实现登录验证
export const login = (data) => {
  return axios({
    url: 'login',
    method: 'post',
    // post方式传递参数用data，get使用params
    data
  })
}
