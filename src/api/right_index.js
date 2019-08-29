import axios from '@/utils/myaxios.js'

// 实现登录验证
export const getLeftMenus = () => {
  return axios({
    url: 'menus'
  })
}
