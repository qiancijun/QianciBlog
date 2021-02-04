<template>
    <div class="admin-container">
        <div class="menu-container">
            <el-menu
            class="side-menu"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title">
                    <span>笔记管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title">Markdown</template>
                    <el-menu-item index="1-1" @click="Goto('MarkdownManage')">笔记管理</el-menu-item>
                    <el-menu-item index="1-2" @click="Goto('MarkdownModify')">笔记修改</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分类 & 标签">
                    <el-menu-item index="1-3" @click="Goto('CategoryManage')">分类管理</el-menu-item>
                    <el-menu-item index="1-4" @click="Goto('TagManage')">标签管理</el-menu-item>
                </el-menu-item-group>
                <!-- <el-submenu index="1-4">
                    <template slot="title">选项4</template>
                    <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu> -->
            </el-submenu>
            <el-menu-item index="2" @click="Goto('NoteUpLoad')">
                <span slot="title" >笔记上传</span>
            </el-menu-item>
            <el-menu-item index="3" @click="Goto('MarkdownModify')">
                <span slot="title">笔记修改</span>
            </el-menu-item>
            <el-menu-item index="4" @click="logout">
                <span slot="title">退出</span>
            </el-menu-item>
            </el-menu>
        </div>
        <div class="router-container">
            <router-view/>
        </div>
    </div>
</template>

<style lang="less">
.admin-container {
    // position: relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    .menu-container {
        float: left;
        width: 10%;
        height: 100%;
        .side-menu {
            display: block !important;
            height: 100%;
            width: 100%;
            border-right: 0px !important;
            overflow: hidden;
        }
    }
    .router-container {
        float: right;
        // position: absolute;
        // top: 0;
        // left: 200px;
        width: 90%;
        height: 100%;
    }
}
</style>

<script>
export default {
    mounted() {
        // console.log(sessionStorage.getItem("Authorization"));
    },
    methods: {
        Goto: function(name) {
            this.$router.replace("/Admin/" + name);
        },
        logout: function() {
            let _this = this;
            this.axios.post("/api/logout", null, {
                headers: {
                    'Authorization': sessionStorage.getItem("Authorization"),
                }
            }).then(() => {
                sessionStorage.removeItem("Authorization");
                _this.$router.replace("/MainPage");
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>