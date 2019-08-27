import axios from '@/utils/myaxios.js'

// 权限列表
export const getAllRoles = (type) => {
  return axios({
    url: `rights/${type}`
  })
}

// 删除角色指定权限
export const delRightByRoleId = (roleId, rightId) => {
  return axios({
    url: `roles/${roleId}/rights/${rightId}`,
    method: 'delete'
  })
}

// 所有权限列表
export const defaultProps = (type) => {
  return axios({
    url: `rights/${type}`
  })
}
// 给用户授权
export const ganrtRolesById = (roleId, rids) => {
  return axios({
    url: `roles/${roleId}/rights`,
    method: 'post',
    data: { rids }
  })
}
