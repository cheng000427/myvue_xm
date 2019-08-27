<template>
  <div class="roles">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 添加角色按钮 -->
    <el-button type="success" @click="addRoles">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="roleList" border style="width: 100%;margin-top:15px">
      <!-- 箭头 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            :gutter="20"
            v-for="first in scope.row.children"
            :key="first.id"
            style="margin-bottom:10px;border-bottom:1px dashed #ccc"
          >
            <el-col :span="4">
              <el-tag
                @close="delRight(scope.row,first.id)"
                closable
                :type="'success'"
              >{{first.authName}}</el-tag>
            </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id" style="margin-bottom:10px">
                <el-col :span="4">
                  <el-tag
                    @close="delRight(scope.row,second.id)"
                    closable
                    :type="'waining'"
                  >{{second.authName}}</el-tag>
                </el-col>
                <el-col :span="20">
                  <el-tag
                    @close="delRight(scope.row,three.id)"
                    v-for="three in second.children"
                    :key="three.id"
                    closable
                    :type="'info'"
                    style="margin-bottom:5px;margin-left:5px"
                  >{{three.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" v-show="scope.row.children.length === 0">还没有任何的权限，先分配！！</el-col>
          </el-row>
        </template>
      </el-table-column>
      <!-- 表头 -->
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="roleName" label="角色名称"></el-table-column>
      <el-table-column prop="roleDesc" label="描述"></el-table-column>
      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <!-- 分配 -->
          <el-tooltip class="item" effect="dark" content="分配" placement="top-start">
            <el-button
              type="warning"
              @click="eaitDefaultProps(scope.row)"
              plain
              icon="el-icon-share"
            ></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 树形结构 -->
    <el-dialog title="角色授权" :visible.sync="treeDialogFormVisible">
      <el-tree
        :data="rolesList"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expand-all="true"
        :default-checked-keys="chkedArr"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantRoles">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加角色dialog -->
    <el-dialog title="添加角色" :visible.sync="addDialogFormVisible">
      <el-form :model="addForm">
        <el-form-item label="角色名称"  :label-width="'120px'">
          <el-input v-model="addForm.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述"  :label-width="'120px'">
          <el-input v-model="addForm.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getRoles } from '@/api/user_index.js'
import {
  delRightByRoleId,
  defaultProps,
  ganrtRolesById,
  addRolesBy
} from '@/api/role_index.js'
export default {
  data () {
    return {
      addForm: {
        roleName: '',
        roleDesc: ''
      },
      addDialogFormVisible: false,
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      treeDialogFormVisible: false,
      roleList: [],
      rolesList: [],
      chkedArr: []
    }
  },
  methods: {
    // 添加角色
    addRoles () {
      this.addDialogFormVisible = true
    },
    addRole () {
      addRolesBy(this.addForm)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            this.addDialogFormVisible = false
            this.init()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 用户授权
    async grantRoles () {
      console.log(this.$refs.tree.getCheckedNodes())
      let arr = this.$refs.tree.getCheckedNodes()
      // 实现数组的拼接
      let temp = []
      for (var i = 0; i < arr.length; i++) {
        temp.push(arr[i].id + ',' + arr[i].pid)
      }
      // console.log(temp)
      // 拼接数组元素再转换为数组
      temp = temp.join(',').split(',')
      // console.log(temp)
      // 去重
      temp = [...new Set(temp)]
      // console.log(temp)
      let res = await ganrtRolesById(this.roleId, temp.join(','))

      if (res.data.meta.status === 200) {
        this.$message.success(res.data.meta.msg)
        this.treeDialogFormVisible = false
        this.init()
      } else {
        this.$message.success(res.data.meta.msg)
      }
    },
    delRight (row, rightId) {
      console.log(row)
      delRightByRoleId(row.id, rightId)
        .then(res => {
          console.log(res)
          row.children = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    eaitDefaultProps (row) {
      // 后期要使用到用户id
      this.roleId = row.id
      this.treeDialogFormVisible = true
      defaultProps('tree').then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.rolesList = res.data.data
          console.log(this.rolesList)
        }
      })
      this.chkedArr.length = 0
      row.children.forEach(first => {
        if (first.children.length > 0) {
          first.children.forEach(second => {
            if (second.children.length > 0) {
              second.children.forEach(three => {
                this.chkedArr.push(three.id)
              })
            }
          })
        }
      })
    },
    init () {
      getRoles()
        .then(res => {
          console.log(res)
          this.roleList = res.data.data
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb {
  line-height: 45px !important;
}
</style>
