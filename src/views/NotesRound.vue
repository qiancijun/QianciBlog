<template>
    <div class="notes-round-container">
        <!-- <Star></Star> -->
        <div class="search-container">
            <el-input placeholder="请输入查询内容"  class="input-with-select" v-model="keywords">
                <el-select v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="分类" value="1"></el-option>
                <el-option label="标题" value="2"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        
            <div class="card-container">
                <!-- <NotesCard v-for="(item, index) in articles" :key="index" ref="cardDom">
                    {{articles[index].data.articleTitle}}
                </NotesCard> -->
                    <div class="notesCard-Container" v-for="(item, index) in articles" :key = "index" @click="toBlogPage(item.id, item.articleTitle)">
                        <!-- <div class="notesInfo">
                            <p>{{item.articleTitle}}</p>
                        </div> -->
                        <p class="notesInfo">{{item.articleTitle}}</p>
                        <div class="notesContent">
                            <mavon-editor
                                class= "md"
                                :value= "item.articleDesc"
                                :subfield = "false"
                                :defaultOpen = "'preview'"
                                :toolbarsFlag = "false"
                                :editable = "false"
                                :ishljs = "true">

                            </mavon-editor>
                        </div>
                    </div>
            </div>
    </div>
</template>


<style lang="less">
.notes-round-container {
    height: 100%;
    width: 100%;
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #1b2947), radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%);
    background-attachment: fixed;
    .search-container {
        width: 80%;
        position: relative;
        margin: 0px auto;
        padding-top: 50px;
        .el-select .el-input {
            width: 100px;
        }
        .input-with-select .el-input-group__prepend {
            background-color: #fff;
        }
    }
    .card-container {
        width: 80%;
        // height: 100%;
        margin: 20px auto;
        columns: 4;
        column-gap: 40px;
        .notesCard-Container {
            width: 100%;
            // height: 100%;
            max-height: 500px;
            margin: 0 0 20px;
            padding: 10px;
            overflow: hidden;
            background: #fff;
            break-inside: avoid;
            
            cursor: pointer;
            .md {
                // max-height: 300px;
                max-height: 500px;
                min-width: 50px;
            }
            .notesInfo {
                font-size: 24px;
                transition: .2s;
            }
        }
        .notesCard-Container :hover {
            background-color: #fffacd;
        }
    }
    

}

@media (max-width: 1200px) {
    .notes-round-container > .card-container {
        column-count: 3;
        // width: calc(100% - 40px);
        // box-sizing: border-box;
        // padding: 20px 20px 20px 0;
    }
}

@media (max-width: 768px) {
    .notes-round-container > .card-container {
        column-count: 2;
    }
}

@media (max-width: 480px) {
    .notes-round-container > .card-container {
        column-count: 1;
    }
}
</style>

<script>
export default {
    created() {
        let _this = this;
        _this.categoryId = _this.$route.params.p_id;
        if (_this.categoryId == 0 || _this.categoryId == null) {
            _this.axios.get("/api/getArticleLimit").then((res) => {
                _this.articles = res.data.data;
                // console.log(res.data);
            }).catch((err) => {
                console.log(err);
            });
        } else if (_this.categoryId != 0) {
            _this.axios.get("/api/getArticleLimitsByCategoryId/" + _this.categoryId).then((res) => {
                _this.articles = res.data.data;
            }).catch((err) => {
                console.log(err);
            })
        }
    },
    mounted() {
    },
    data() {
        return {
            input1: '',
            input2: '', 
            select: '',
            keywords: "",
            articles:[],
            backup:[],
            categoryId: 0,
        }
    },
    watch: {

    },
    computed: {
        notesHeight: function() {
            return this.page * 1000 + 'px';
        }
    },
    methods: {
        search: function() {
            let _this = this;
            if (_this.keywords == "") {
                _this.axios.get("/api/getArticleLimit").then((res) => {
                    _this.articles = res.data.data;
                }).catch((err) => {
                    console.log(err);
                });
            } else if (_this.select == "") {
                _this.$message({
                    type: "info",
                    message: "请勾选"
                });
            } else if (_this.select == 1) {
                _this.axios.get("/api/getArticle/Category/" + _this.keywords).then(function(res) {
                    // _this.articles.push(tmp.data);
                    // console.log(res.data.data);
                    _this.articles = res.data.data;
                }).catch(function(err) {
                    console.log(err);
                });
            } else if (_this.select == 2) {
                _this.axios.get("/api/getArticle/title/" + _this.keywords).then(function(res) {
                    _this.articles = res.data.data;
                }).catch(function(err) {
                    console.log(err);
                });
            }
        },
        toBlogPage: function(id, title) {
            let routeData = this.$router.resolve({
                path: '/BlogPage',
                query: {
                    p_id: id,
                    p_title: title,
                }
            });
            window.open(routeData.href, "_blank");
        }
    }
}
</script>