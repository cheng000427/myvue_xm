<template>
  <div class="index">
    <el-container>
      <el-aside width="200px">
        <img src="../assets/logo.png" alt="" class="logo">
        <el-menu
          :router='true'
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened='true'
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/index/users-list">
              <i class="el-icon-menu"></i>用户列表
            </el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/index/roles">
              <i class="el-icon-menu"></i>角色列表
            </el-menu-item>
            <el-menu-item index="/index/right">
              <i class="el-icon-menu"></i>权限列表
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航三</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>选项3
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
         <el-button icon="el-icon-menu" type="info" class="toggle-btn"></el-button>
          <p class="system-title">后台管理系统</p>
          <a href="javascript:" class="welcome">退出</a>
        </el-header>
        <el-main>
        <div class="sb">
            <router-view></router-view>
        </div>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="less" scoped>
.index {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: 10px;
    font-size: 28px;
    color: white;
    cursor: pointer;
    line-height: 40px;
    &:hover {
      background-color: #4292CF;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome{
    color: white;
  }
}
.sb{
  width: 100%;
  height: 100%;
}
</style>
