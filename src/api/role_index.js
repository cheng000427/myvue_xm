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
