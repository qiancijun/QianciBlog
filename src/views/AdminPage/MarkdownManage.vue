<template>
    <div class="tag-manage-container">
        <div class="handler-bar">
            <div class="serch-input">
                <el-input
                    placeholder="搜索的文章名"
                    v-model="searchArticleName"
                    clearable>
                </el-input>
            </div>
            <div class="search-button">
                <el-button icon="el-icon-search" circle @click="searchArticle"></el-button>
            </div>
            <div class="del-category">
                <el-button type="danger" @click="deleteSelectArticles">删除所选标签</el-button>
            </div>
        </div>
        <div class="category-table-box">
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                height = "90vh"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="50">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="id"
                    label="笔记编号"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="articleTitle"
                    label="笔记标题"
                    >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="articleDesc"
                    label="笔记描述"
                    :show-overflow-tooltip=true
                    >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="articleCategory"
                    label="笔记分类编号"
                    >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="articleCategoryName"
                    label="笔记分类名称"
                    >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="articleTag"
                    label="笔记标签编号"
                    >
                </el-table-column>
                <el-table-column
                    fixed
                    prop="articleUrl"
                    label="笔记路径"
                    >
                </el-table-column>
                <el-table-column
                fixed
                label="操作"
                width="300">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                    <el-button type="text" size="small" @click="watchDesc(scope.row)">查看描述</el-button>
                    <el-popconfirm
                    confirmButtonText="好的"
                    cancelButtonText="不用了"
                    icon="el-icon-info"
                    iconColor="red"
                    title="确定删除吗？（此操作不可逆）"
                    style="padding-left: 100px"
                    @onConfirm="handleDelete(scope.$index, scope.row)"
                    >
                    <el-button slot="reference" type="danger" size="mini">删除</el-button>
                    </el-popconfirm>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<style lang="less">
.tag-manage-container {
    width: 100%;
    height: 100%;
    .handler-bar {
        height: 10vh;
        display: flex;
        div {
            margin: auto 20px;
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            searchArticleName: "",
            tableData: [],
            selections: [],
            backup: [],
        }
    },
    created() {
        let _this = this;
        _this.axios.get('/api/getAllArticle').then((res) => {
            _this.tableData = res.data.data;
            _this.tableData.sort((a, b) => {
                return a.id - b.id;
            })
            _this.backup = _this.tableData;
        }).catch((err) => {
            console.log(err);
        })
    },
    mounted() {

    },
    methods: {
        handleDelete: function(index, row) {
            let _this = this;
            _this.axios.post('/api/deleteArticleById', 
                {
                    id: row.id,
                },
                {
                    headers: {
                        'Authorization': sessionStorage.getItem("Authorization"),
                    }
                }
            ).then((res) => {
                if (res.data.data > 0) {
                    _this.tableData.splice(index, 1);
                    this.$message({
                        type: 'success',
                        message: '删除成功'
                    });
                } else if (res.data.data == 0) {
                    this.$message({
                        type: 'error',
                        message: '出错了'
                    });
                }
                // console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        },
        handleEdit: function(index, row) {
            let _this = this;
            const h = this.$createElement;
            this.$msgbox({
                title: '修改信息',
                message: h('div', {
                }, [
                    h('p', {style:'font-size: 20px; margin: 10px 0'}, '不填入代表不修改'),
                    h('input', {
                        attrs: {
                            class: 'el-input__inner',
                            size: "medium",
                            id: "newTitle",
                            autocomplete: "off",
                            placeholder: "请输入新标题"
                        }
                    }),
                    h('input', {
                        attrs: {
                            class: 'el-input__inner',
                            size: "medium",
                            id: "newCate",
                            autocomplete: "off",
                            placeholder: "请输入新分类"
                        }
                    }),
                    h('input', {
                        attrs: {
                            class: 'el-input__inner',
                            size: "medium",
                            id: "newTags",
                            autocomplete: "off",
                            placeholder: "请输入新标签"
                        }
                    }),
                    h('textarea', {
                        attrs: {
                            class: 'el-textarea__inner ',
                            row: 4,
                            id: "newDesc",
                            placeholder: "请输入新描述"
                        }
                    }),
                ]),
                showCancelButton: true,
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action == 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        let newArticle = {
                            id: row.id,
                            articleTitle: document.getElementById("newTitle").value,
                            articleCategory: document.getElementById("newCate").value,
                            articleTag: document.getElementById("newTags").value,
                            articleDesc: document.getElementById("newDesc").value,
                        }
                        _this.axios.post('/api/modifyArticle', {
                            id: row.id,
                            articleTitle: newArticle.articleTitle,
                            articleCategory: newArticle.articleCategory,
                            articleTag: newArticle.articleTag,
                            articleDesc: newArticle.articleDesc,
                        }, {
                            headers: {
                                'Authorization': sessionStorage.getItem("Authorization"),
                            }
                        }).then(res => {
                            if (newArticle.articleTitle != null && newArticle.articleTitle != "") {
                                _this.tableData[index].articleTitle = newArticle.articleTitle;
                            }
                            if (newArticle.articleCategory != null && newArticle.articleCategory != '') {
                                _this.tableData[index].articleCategory = newArticle.articleCategory;
                            }
                            if (newArticle.articleTag != null && newArticle.articleTag != '') {
                                _this.tableData[index].articleTag = newArticle.articleTag;
                            }
                            if (newArticle.articleDesc != null && newArticle.articleDesc != '') {
                                _this.tableData[index].articleDesc = newArticle.articleDesc;
                            }
                            if (res.data.data != null && res.data.data != "") {
                                _this.tableData[index].articleCategoryName = res.data.data;
                            }
                            instance.confirmButtonLoading = false;
                            done();
                        }).catch(err => {
                            console.log(err);
                        });
                    } else {
                        done();
                    }
                }
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '添加成功',
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消添加'
                });
            });
        },
        handleSelectionChange: function(val) {
            this.selections = val;
        },
        deleteSelectArticles: function() {
            if (this.selections.length == 0) {
                this.$message({
                    type: 'info',
                    message: '没有勾选'
                });      
                return;
            }
            let _this = this;
            let ids = [];
            for (let i = 0; i < _this.selections.length; i++) {
                ids.push(_this.selections[i].id);
            }
            _this.axios.post('/api/deleteSelectArticles', {
                list: ids,
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem("Authorization"),
                }
            }).then((res) => {
                if (res.data.data > 0) {
                    _this.$router.go(0);
                } else {
                    _this.$notify.error({
                        title: '错误',
                        message: '服务器出错了'
                    });
                }
            }).catch((err) => {
                console.error(err);
            });
        },
        searchArticle: function() {
            let _this = this;
            if (this.searchArticleName == "") {
                this.tableData = this.backup;
            } else {
                _this.axios.get('/api/searchArticleByName/' + _this.searchArticleName)
                .then(res => {
                    // console.log(res.data);
                    _this.tableData = res.data.data;
                    this.$message({
                        type: 'success',
                        message: '搜索成功'
                    });
                }).catch(err => {
                    console.error(err);
                })
            }
        },
        modifyTitle: function(row, index) {
            console.log(row, index);
        },
        watchDesc: function(row) {
            this.$alert(row.articleDesc, row.articleTitle, {
                confirmButtonText: '确定'
            });
        }
    }
}
</script>