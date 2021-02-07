<template>
     <div id="topbar" v-if="!$route.meta.isAdmin">
      <el-menu :default-active="activeIndex" 
      class="topbar" 
      mode="horizontal" 
      background-color = "#F0FFFF" 
      text-color = "black" 
      active-text-color = "	#4169E1" 
      menu-trigger = "click">
        <el-menu-item index="1" @click="toMainPage" v-if="!isPhone">首页</el-menu-item>
        <el-submenu index="2" v-if="isPhone">
          <template slot="title">菜单</template>
          <el-menu-item index="2-1" @click="toMainPage">首页</el-menu-item>
          <el-menu-item index="2-2" @click="toNotesRound">笔记广场</el-menu-item>
          <el-menu-item index="2-3">工具箱</el-menu-item>
          <el-menu-item index="2-4" @click="toAbout">关于我</el-menu-item>
          <!-- <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu> -->
        </el-submenu>
        <el-menu-item index="3" v-if="!isPhone" @click="toNotesRound">笔记广场</el-menu-item>
        <el-menu-item index="4" v-if="!isPhone">工具箱</el-menu-item>
        <el-menu-item index="5" v-if="!isPhone" @click="toAbout">关于我</el-menu-item>
      </el-menu>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        screenWidth: document.body.clientWidth,
        isPhone: false,
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      toMainPage: function() {
        this.$router.push("/MainPage");
      },
      toNotesRound: function() {
        this.$router.push({
          name: 'NotesRound',
          params: {
            p_id: 0,
          }
        });
      },
      toAbout: function() {
        this.$router.push('/About');
      }
    },
    watch: {
      screenWidth(val) {
        this.screenWidth = val;
        if (this.screenWidth < 1000) {
          this.isPhone = true;
        } else {
          this.isPhone = false;
        }
      }
    },
    mounted() {
      let that = this;
      window.onresize = () => {
        return (
          () => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth;
          }
        )();
      }
    },
    created() {
      if (document.body.clientWidth < 700) {
        this.isPhone = true;
      }
    }
  }
</script>