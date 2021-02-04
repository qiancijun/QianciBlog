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
        </div>
        <div class="category-table-box">
              <el-table
                :data="tableData"
                border
                style="width: 100%"
                height = "90vh">
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
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">修改</el-button>
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
        handleEdit: function(row) {
            this.$router.push({
                path: '/Admin/EditPage',
                query: {
                    p_id: row.id,
                    p_url: row.articleUrl
                }
            });
        }
    }
}
</script>