<template>
  <div class="right">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格 -->
    <el-table :data="rightForm" stripe style="width: 100%">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级" width="100">
        <template slot-scope="scope">
          <span>{{scope.row.level|levelFormat}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getAllRoles } from '@/api/role_index.js'
export default {
  data () {
    return {
      rightForm: []
    }
  },
  filters: {
    levelFormat (level) {
      if (level === '0') {
        return '一级'
      } else if (level === '1') {
        return '二级'
      } else if (level === '2') {
        return '三级'
      }
    }
  },
  mounted () {
    getAllRoles('list')
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rightForm = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  line-height: 45px !important;
}
</style>
