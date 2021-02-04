<template>
    <div class="tag-manage-container">
        <div class="handler-bar">
            <div class="serch-input">
                <el-input
                    placeholder="搜索的标签名"
                    v-model="searchTagName"
                    clearable>
                </el-input>
            </div>
            <div class="search-button">
                <el-button icon="el-icon-search" circle @click="searchTag"></el-button>
            </div>
            <div class="add-new-category">
                <el-button type="primary" @click="addNewTag">添加新标签</el-button>
            </div>
            <div class="del-category">
                <el-button type="danger" @click="deleteSelectTags">删除所选标签</el-button>
            </div>
        </div>
        <div class="tag-table-box">
              <el-table
                :data="tableData"
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
                    prop="tagName"
                    label="标签名称"
                    >
                </el-table-column>
                <el-table-column
                fixed
                label="操作"
                width="300">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改名称</el-button>
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
            searchTagName: "",
            tableData: [],
            selections: [],
            backup: [],
        }
    },
    created() {
        let _this = this;
        _this.axios.get(_this.global.serverSrc + '/getAllTag').then((res) => {
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
            console.log(row);
            _this.axios.post('/api/deleteTag', {
                id: row.id,
                tagName: row.tagName
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
        handleEdit: function(index, row) {
            let _this = this;
            this.$prompt('请输入', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                })
                .then(({ value }) => {
                    this.$message({
                        type: 'success',
                        message: "修改成功"
                    });
                    _this.axios.post('/api/updateTag', {
                        id: row.id,
                        name: value,
                    }, {
                        headers: {
                            'Authorization': sessionStorage.getItem("Authorization"),
                        }
                    }).then((res) => {
                        if (res.data.data == 1) {
                            _this.tableData[index].tagName = value;
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
                        console.error(err);
                    })
                })
                .catch(() => {
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
        deleteSelectTags: function() {
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
            _this.axios.post('/api/deleteSelectTags', {
                list: ids,
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
        addNewTag: function() {
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
                    h('p', {style:'font-size: 20px; margin: 10px 0'} ,"请输入标签名"),
                    h('input', {
                        attrs: {
                            class: 'el-input__inner',
                            size: "medium",
                            id: "addName",
                            autocomplete: "off",
                        }
                    })
                ]),
                showCancelButton: true,
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                    if (action == 'confirm') {
                        instance.confirmButtonLoading = true;
                        instance.confirmButtonText = '执行中...';
                        let newTag = {
                            id: document.getElementById("addId").value,
                            tagName: document.getElementById("addName").value,
                        }
                        _this.axios.post('/api/addNewTag', {
                            id: newTag.id,
                            tagName: newTag.tagName,
                        }, {
                            headers: {
                                'Authorization': sessionStorage.getItem("Authorization"),
                            }
                        }).then(res => {
                            // console.log(res.data);
                            if (res.data.data == 1) {
                                instance.confirmButtonLoading = false;
                                _this.tableData.push(newTag);
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
        searchTag: function() {
            let _this = this;
            if (this.searchTagName == "") {
                this.tableData = this.backup;
            } else {
                _this.axios.get('/api/searchTagByName/' + _this.searchTagName)
                .then(res => {
                    _this.tableData = res.data.data;
                    this.$message({
                        type: 'success',
                        message: '搜索成功'
                    });
                }).catch(err => {
                    console.error(err);
                })
            }
        }
    }
}
</script>