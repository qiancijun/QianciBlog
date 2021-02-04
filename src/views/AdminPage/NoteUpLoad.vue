<template>
    <div class="note-upload-container">
        <el-form :label-position="labelPosition" label-width="80px" :model="newArticle" :rules="rules" ref="addForm">
            <el-form-item label="文章序号" prop="id">
                <el-input v-model="newArticle.id"></el-input>
            </el-form-item>
            <el-form-item label="文章标题" prop="articleTitle">
                <el-input v-model="newArticle.articleTitle"></el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="articleCategory">
                <el-input v-model="newArticle.articleCategory"></el-input>
            </el-form-item>
            <el-form-item label="文章标签" prop="articleTag">
                <el-input v-model="newArticle.articleTag"></el-input>
            </el-form-item>
            <el-form-item label="文章描述" prop="articleDesc">
                <el-input v-model="newArticle.articleDesc" type="textarea" :row="4"></el-input>
            </el-form-item>
            <el-form-item>
                <el-upload
                    class="upload-demo"
                    drag
                    action="http://localhost:8079/uploadFile"
                    :auto-upload="false"
                    :multiple="false"
                    accept=".md"
                    :on-success="onSuccess"
                    ref="upload">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传.md文件</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit('addForm')" :disabled="!enabledUploadBtn">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less">
.note-upload-container {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    overflow: auto;
}
</style>

<script>
export default {
    data() {
      return {
        labelPosition: 'top',
        newArticle: {
            id: "",
            articleTitle: "",
            articleCategory: "",
            articleTag: "",
            articleDesc: "",
            articleUrl: ""
        },
        rules: {
            id: [
                {required: true, message: 'id不能为空', change: 'change'},
            ],
            articleTitle: [
                {required: true, message: 'title不能为空', change: 'change'},
            ],
            articleCategory: [
                {required: true, message: 'category不能为空', change: 'change'},
            ],
            articleTag: [
                {required: true, message: 'tag不能为空', change: 'change'},
            ],
            articleDesc: [
                {required: true, message: 'desc不能为空', change: 'change'},
            ],
        },
        enabledUploadBtn: true,
        flag: 0,
      };
    },
    methods: {
        submit: function(formName) {
            let _this = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    _this.enabledUploadBtn = false;
                    _this.$refs.upload.submit();
                    setTimeout(function() {
                        if (_this.flag == 1) {
                        _this.axios.post('/api/addNewArticle', _this.newArticle, {
                            headers: {
                                'Authorization': sessionStorage.getItem("Authorization"),
                            }
                        }).then(res => {
                                if (res.data.data == 1) {
                                    _this.enabledUploadBtn = true;
                                    _this.$message({
                                        type: 'success',
                                        message: '添加成功'
                                    });
                                }
                            }).catch(err => {
                                _this.$message({
                                    type: 'error',
                                    message: err,
                                });
                            });
                        } else if (_this.flag == 0) {
                            _this.$message({
                                type: 'error',
                                message: "没有上传成功",
                            });
                        }
                    }, 2000);
                } else {
                    this.$message({
                        type: 'error',
                        message: "参数错误",
                    });
                    return false;
                }
            });
        },
        onSuccess: function(res) {
            this.flag = 1;
            this.newArticle.articleUrl = res.data;
        }
    }
}
</script>