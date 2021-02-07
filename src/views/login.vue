<template>
    <div class="login-box">
        <div class="login-container">
            <div class="left-container">
                <div class="title"><span>登录</span></div>
                <div class="input-container">
                    <input type="text" name="username" placeholder="用户名" autocomplete="off" v-model="username">
                    <input type="password" name="password" placeholder="密码" autocomplete="off" v-model="password">
                </div>
                <div class="remeber-me-container">
                    <input type="checkbox" name="rememberme" v-model="remember">
                    <span>记住我</span>
                </div>
            </div>
            <div class="right-container">
                <div class="action-container" @click="login" >
                    <span>提交</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="less">
.login-box {
    height: 100%;
    width: 100%;
    background: linear-gradient(to bottom right, rgb(114, 135, 254), rgb(130, 80, 186));
    overflow: hidden;
    .login-container {
        width: 600px;
        margin: 0 auto;
        margin-top: 10%;
        border-radius: 15px;
        box-shadow: 0 10px 50px 0px rgb(59, 45, 159);
        background-color: rgb(95, 76, 194);
        .left-container {
            display: inline-block;
            width: 330px;
            border-top-left-radius: 15px;
            border-bottom-left-radius: 15px;
            padding: 60px;
            background-image: linear-gradient(to bottom right, rgb(118, 76, 163), rgb(92, 103, 211));
            .title {
                color: #fff;
                font-size: 18px;
                span {
                    border-bottom: 3px solid rgb(237, 221, 22);
                }
            }
            .input-container {
                padding: 20px 0;
                input {
                    border: 0;
                    background: none;
                    outline: 0;
                    color: #fff;
                    margin: 20px 0;
                    padding: 5px 0;
                    border-bottom: 1px solid rgb(199, 191, 219);
                }
            }
            .remeber-me-container {
                span {
                    font-size: 14px;
                    color: rgb(199, 191, 219);
                    transition: .2s;
                }
            }
        }
        .right-container {
            width: 145px;
            height: 100%;
            display: inline-block;
            height: calc(100% - 120px);
            vertical-align: top;
            padding: 60px 0;
            .action-container {
                text-align: center;
                color: #fff;
                font-size: 18px;
                font-weight: 200;
                position: relative;
                span {
                    border: 1px solid rgb(237, 221, 22);
                    padding: 10px;
                    display: inline;
                    line-height: 25px;
                    border-radius: 25px;
                    position: absolute;
                    left: calc(72px - 25px);
                    transition: .2s;
                    cursor: pointer;
                }
                span:hover {
                    background-color: rgb(237, 271, 22);
                    color: rgb(95, 76, 194);
                }
            }
        }
    }
}

.login-box .login-container .left-container .input-container input:hover {
    border-bottom-color: #fff;
}

::-webkit-input-placeholder {
    color: rgb(199, 191, 219)
}
</style>

<script>
export default {
    data() {
        return {
            username: "",
            password: "",
            remember: false,
        }
    },
    methods: {
        login: function() {
            let _this = this;
            _this.axios.post('/api/login', {
                username: _this.username,
                password: _this.password
            }).then(res => {
                sessionStorage.setItem("Authorization", res.data.data);
                if (res.data.data != null) {
                    _this.$router.replace('/Admin');
                } else {
                    _this.$message({
                        type: 'error',
                        message: res.data.message,
                    })
                }
                // console.log(res.data)
            }).catch(err => {
                console.error(err);
            })
        },
    },
    mounted() {
        if (sessionStorage.getItem("Authorization") != null) {
            this.$router.replace('/Admin');
        }
    }
}
</script>