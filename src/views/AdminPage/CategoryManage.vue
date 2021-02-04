<template>
    <div class="category-manage-container">
        <div class="handler-bar">
            <div class="serch-input">
                <el-input
                    placeholder="搜索的分类名"
                    v-model="searchCategoryName"
                    clearable>
                </el-input>
            </div>
            <div class="search-button">
                <el-button icon="el-icon-search" circle @click="serchCategory"></el-button>
            </div>
            <div class="add-new-category">
                <el-button type="primary" @click="addNewCategory">添加新分类</el-button>
            </div>
            <div class="del-category">
                <el-button type="danger" @click="deleteSelectCategory">删除所选分类</el-button>
            </div>
        </div>
        <div class="category-table-box">
              <el-table
                :data="tableData"
                ref="table"
                border
                style="width: 100%"
                height = "90vh"
                @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="id"
                    label="序号"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="categoryName"
                    label="分类名称"
                    width="250">
                    
                </el-table-column>
                <el-table-column
                    fixed
                    prop="categoryNumber"
                    label="收录数目"
                    width="100">
                </el-table-column>
                <el-table-column
                    fixed
                    prop="categoryUrl"
                    label="分类图标地址">
                </el-table-column>
                <el-table-column
                fixed
                label="操作"
                width="300">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row, 1)">修改名称</el-button>
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row, 2)">编辑URL</el-button>
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
.category-manage-container {
    width: 100%;
    height: 100%;
    .handler-bar {
        height: 10vh;
        display: flex;
        div {
            margin: auto 20px;
        }
    }
    .category-table-box {

    }
}
</style>

<script>
export default {
    data() {
        return {
            searchCategoryName: "",
            tableData: [],
            selections: [],
            backup: [],
        }
    },
    created() {
        let _this = this;
        _this.axios.get('/api/getCategories').then((res) => {
            _this.tableData = res.data;
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
            _this.axios.post('/api/deleteCategory', {
                id: row.id,
                categoryName: row.categoryName,
                categoryNumber: row.categoryNumber,
                categoryUrl: row.categoryUrl
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem("Authorization"),
                }
            }).then((res) => {
                if (res.data.data > 0) {
                    _this.tableData.splice(index, 1);
                } else if (res.data.data == 0) {
                    this.$notify.error({
                        title: '错误',
                        message: '服务器出错了'
                    });
                }
                // console.log(res.data);
            }).catch((err) => {
                console.log(err);
            })
        },
        handleEdit: function(index, row, st) {
            let _this = this;
            console.log(index);
            this.$prompt('请输入', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: "修改成功"
                    });
                    if (st == 1) {
                        _this.axios.post('/api/updateCategory', {
                            id: row.id,
                            name: value,
                            url: null,
                        }, {
                            headers: {
                                'Authorization': sessionStorage.getItem("Authorization"),
                            }
                        }).then((res) => {
                            if (res.data.data == 1) {
                                _this.tableData[index].categoryName = value;
                                _this.$message({
                                    type: 'success',
                                    message: '修改成功'
                                });
                            } else {
                                _this.$message({
                                    type: 'error',
                                    message: '修改失败'
                                });
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    } else if (st == 2) {
                        _this.axios.post('/api/updateCategory', {
                            id: row.id,
                            name: null,
                            url: value,
                        }, {
                            headers: {
                                'Authorization': sessionStorage.getItem("Authorization"),
                            }
                        }).then((res) => {
                            if (res.data.data == 1) {
                                _this.tableData[index].categoryUrl = value;
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });       
                });
        },
        handleSelectionChange: function(val) {
            this.selections = val;
            // console.log(this.selections);
        },
        deleteSelectCategory: function() {
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
            console.log(ids);
            _this.axios.post('/api/deleteCategories', {
                list: ids,
            }).then((res) => {
                if (res.data.data >= 1) {
                    _this.$router.go(0);
                } else {
                    _this.$notify.error({
                        title: '错误',
                        message: '服务器出错了'
                    });
                }
            }).catch((err) => {
                console.error(err);
            })
        },
        addNewCategory: function() {
            let _this = this;
            const h = this.$createElement;
            this.$msgbox({
                title: '添加新标签',
                message: h('div', {
                }, [
                    h('p', {style:'font-size: 20px; margin: 10px 0'}, '请输入序号'),
                    h('input', {
                        attrs: {
                            class: 'el-input__inner',
                            size: "medium",
                            id: "addId",
                            autocomplete: "off",
                        }
                    }),
                    h('p', {style:'font-size: 20px; margin: 10px 0'} ,"请输入分类名"),
                    h('input', {
                        attrs: {
                            class: 'el-input__inner',
                            size: "medium",
                            id: "addName",
                            autocomplete: "off",
                        }
                    }),
                    h('p', {style:'font-size: 20px; margin: 10px 0'} ,"请输入图片Url"),
                    h('textarea', {
                        attrs: {
                            class: 'el-textarea__inner ',
                            row: 4,
                            id: "addUrl",
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
                        let newCategory = {
                            id: document.getElementById("addId").value,
                            categoryName: document.getElementById("addName").value,
                            categoryNumber: 0,
                            categoryUrl: document.getElementById("addUrl").value,
                        }
                        _this.axios.post('/api/addNewCategory', {
                            id: newCategory.id,
                            categoryName: newCategory.categoryName,
                            categoryNumber: 0,
                            categoryUrl: newCategory.categoryUrl,
                        }).then(res => {
                            // console.log(res.data);
                            if (res.data.data == 1) {
                                instance.confirmButtonLoading = false;
                                _this.tableData.push(newCategory);
                                done();
                            } else {
                                this.$message({
                                    type: 'error',
                                    message: '服务器出错了',
                                });
                            }
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
        serchCategory: function() {
            let _this = this;
            if (this.searchCategoryName == "") {
                this.tableData = this.backup;
            } else {
                _this.axios.get('/api/searchCategoryByName/' + _this.searchCategoryName)
                .then(res => {
                    // console.log(res.data)
                    _this.tableData = res.data.data;
                    this.$message({
                        type: 'success',
                        message: '搜索成功',
                    });
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }
}
</script>