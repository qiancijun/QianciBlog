<template>
     <div id="topbar">
      <el-menu :default-active="activeIndex" 
      class="topbar" 
      mode="horizontal" 
      @select="handleSelect" 
      background-color = "#F0FFFF" 
      text-color = "black" 
      active-text-color = "	#4169E1" 
      menu-trigger = "click">
        <el-menu-item index="1" @click="toMainPage">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3">文章广场</el-menu-item>
        <el-menu-item index="4">关于我</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toMainPage: function() {
          this.$router.push("/MainPage");
      }
    }
  }
</script>