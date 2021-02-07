<template>
    <div class="about-container">
        <div class="info-box">
            <div>我很菜</div>
            <div>就如同这个页面</div>
            <div>想不到有什么好写的</div>
            <div>我的 <a href="https://github.com/qiancijun">Github</a></div>
            <div>我的 <span @mouseover="showQQ" @mouseout="hideQQ">{{qq}}</span></div>
            <div>我很菜</div>
        </div>
    </div>
</template>

<style lang="less">
.about-container {
    width: 100%;
    height: 100%;
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #1b2947), radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%);
    background-attachment: fixed;
    overflow: hidden;
    .info-box {
        width: 100%;
        height: 100%;
        div {
            color: #fff;
            font-size: 20px;
            margin: 50px 100px;
            a {
                text-decoration: none;
                color: #fff;
                font-size: 20px;
                border-bottom: 1px solid #fff;
            }
        }
    }
}
</style>


<script>
export default {
    data() {
        return {
            content: "",
            qq: "QQ",
        }
    },
    // created() {
    //     let _this = this;
    //     this.axios("/api/getAboutMe").then(res => {
    //         _this.content = res.data.data;
    //     }).catch(err => {
    //         console.error(err);
    //     })
    // }
    methods: {
        showQQ: function() {
            this.qq = "769303522";
        },
        hideQQ: function() {
            this.qq = "QQ";
        }
    }
}
</script>