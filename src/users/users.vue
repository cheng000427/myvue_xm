<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 @input.native="init" -->
    <div style="margin-top: 15px;">
      <el-input v-model="userobj.query" placeholder="请输入内容" style="width:300px">
        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
      </el-input>
      <el-button
        type="success"
        plain
        style="margin-left:5px"
        @click="addDialogFormVisible = true"
      >添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="userList" border style="width: 100%;margin-top:15px">
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="Statuschange(scope.row.id,scope.row.mg_state)"
          ></el-switch>
        </template>
      </el-table-column>

      <el-table-column prop label="操作">
        <template slot-scope="scope">
          <!-- 编辑 -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button type="primary" plain icon="el-icon-edit" @click="showEaitdialog(scope.row)"></el-button>
          </el-tooltip>
          <!-- 分配 -->
          <el-tooltip class="item" effect="dark" content="分配" placement="top-start">
            <el-button type="warning" plain icon="el-icon-share" @click="grant(scope.row)"></el-button>
          </el-tooltip>
          <!-- 删除 -->
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button type="danger" plain icon="el-icon-delete" @click="del(scope.row.id)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="userobj.pagenum"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="userobj.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 新增dialog -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :label-width="'80px'" :model="addForm" :rules="rules" ref="addForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑dialog -->
    <el-dialog title="编辑用户" :visible.sync="eaitDialogFormVisible">
      <el-form :label-width="'80px'" :model="eaitForm" :rules="rules" ref="eaitForm">
        <el-form-item label="用户名">
          <el-input v-model="eaitForm.username" auto-complete="off" disabled style="width:80px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="eaitForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="eaitForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="eaitDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="eait">确 定</el-button>
      </div>
    </el-dialog>
    <!--  角色分配 -->
    <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
      <el-form :label-width="'80px'" :model="grantForm" :rules="rules" ref="grantForm">
        <el-form-item label="用户名">
          <el-input v-model="grantForm.username" auto-complete="off" disabled style="width:80px"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="grantForm.rid" clearable placeholder="请选择">
            <el-option
              v-for="item in roleList"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="grantDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="grantUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  getUsers,
  addUsers,
  eaitUsers,
  delUsers,
  grantUsers,
  getRoles,
  updateUserState
} from '@/api/user_index.js'
export default {
  data () {
    return {
      roleList: [],
      grantDialogFormVisible: false,
      grantForm: {
        username: '',
        rid: ''
      },
      eaitForm: {
        username: '',
        email: '',
        mobile: ''
      },
      eaitDialogFormVisible: false,
      total: 0,
      // 新增
      addDialogFormVisible: false,
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+[@]\w+[.]\w+/,
            message: '请输入合法的邮箱',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          {
            pattern: /^1\d{10}$/,
            message: '请输入合法的电话号码',
            trigger: 'blur'
          }
        ]
      },
      userobj: {
        query: '',
        pagenum: 1,
        pagesize: 3
      },
      userList: []
    }
  },
  methods: {
    // 修改状态
    Statuschange (id, type) {
      updateUserState(id, type)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('设置状态成功')
            this.init()
          } else {
            this.$message.success(res.data.meta.msg)
          }
        })
        .catch(() => {
          // console.log(err)
          this.$message.success('设置状态失败')
        })
    },
    // 角色分配
    grantUser () {
      if (this.grantForm.rid) {
        grantUsers(this.grantForm)
          .then(res => {
            console.log(res)
            if (res.data.meta.status === 200) {
              this.$message.success(res.data.meta.msg)
              this.grantDialogFormVisible = false
              this.init()
            }
          })
          .catch(err => {
            console.log(err)
            this.$message.success('分配失败')
          })
      } else {
        this.$message.success('请选择角色')
      }
    },
    grant (row) {
      console.log(row)
      this.grantDialogFormVisible = true
      this.grantForm.username = row.username
      this.grantForm.id = row.id
      this.grantForm.rid = row.rid
    },
    // 删除
    del (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(res => {
          delUsers(id)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 200) {
                this.$message({
                  type: 'success',
                  message: '删除成功'
                })
                this.init()
              }
            })
            .catch(() => {
              this.$message({
                type: 'error',
                message: '删除失败'
              })
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑
    eait () {
      eaitUsers(this.eaitForm)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.$message.success('编辑成功')
            // 刷新
            this.init()
            // 隐藏dialog
            this.eaitDialogFormVisible = false
            // 清空输入框
            this.$refs.eaitForm.resetFields()
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.warning('编辑失败')
        })
    },
    showEaitdialog (row) {
      console.log(row)
      // 显示dialog
      this.eaitDialogFormVisible = true
      this.eaitForm.id = row.id
      this.eaitForm.username = row.username
      this.eaitForm.email = row.email
      this.eaitForm.mobile = row.mobile
    },
    // 新增
    add () {
      // 二次验证
      this.$refs.addForm.validate(valid => {
        if (valid) {
          addUsers(this.addForm)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success('新增成功')
                // 刷新
                this.init()
                // 隐藏dialog
                this.addDialogFormVisible = false
                // 清空输入框
                this.$refs.addForm.resetFields()
              }
            })
            .catch(err => {
              console.log(err)
              this.$message.success('新增失败')
            })
        } else {
          this.$message.warning('请输入必填的数据')
        }
      })
    },
    search () {
      this.userobj.pagenum = 1
      this.init()
    },
    // 分页
    handleSizeChange (val) {
      //   console.log(`每页 ${val} 条`)
      this.userobj.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      //   console.log(`当前页: ${val}`)
      this.userobj.pagenum = val
      this.init()
    },
    init () {
      getUsers(this.userobj)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.userList = res.data.data.users
            this.total = res.data.data.total
          } else if (res.data.meta.status === 400) {
            this.$message.error(res.data.meta.msg)
            this.$router.push({ name: 'login' })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
    getRoles()
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.roleList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style scoped>
.user {
  width: 100%;
  height: 100%;
}
.el-breadcrumb {
  line-height: 45px !important;
}
</style>
