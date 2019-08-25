import axios from '@/utils/myaxios.js'

// 获取数据
export const getUsers = (params) => {
  return axios({
    url: '/users',
    params
  })
}

// 新增用户
export const addUsers = (data) => {
  return axios({
    url: '/users',
    method: 'post',
    data
  })
}

// 编辑用户
export const eaitUsers = (data) => {
  return axios({
    url: `users/${data.id}`,
    method: 'put',
    data
  })
}

// 删除用户
export const delUsers = (id) => {
  return axios({
    url: `users/${id}`,
    method: 'delete'
  })
}

// 角色分配
export const grantUsers = (data) => {
  return axios({
    url: `users/${data.id}/role`,
    method: 'put',
    data: { rid: data.rid }
  })
}

// 角色列表
export const getRoles = () => {
  return axios({
    url: '/roles'
  })
}

// 修改状态
export const updateUserState = (uid, type) => {
  return axios({
    url: `users/${uid}/state/${type}`,
    method: 'put'
  })
}
