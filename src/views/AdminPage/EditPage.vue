<template>
    <div class="edit-page-container">
        <mavon-editor
            class= "md"
            v-model="content"
            :subfield = "true"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "true"
            :editable = "true"
            :ishljs = "true"
            :style="{'width': '100%', 'height': '100%'}"
            @save="handleSave"
            >
        </mavon-editor>
    </div>    
</template>

<style lang="less">
.edit-page-container {
    width: 100%;
    height: 100%;
}
</style>

<script>
export default {
    data() {
        return {
            content: "",
            id: "",
        }
    },
    created() {
        let _this = this;
        _this.id = _this.$route.query.p_id;
         _this.axios.get("/api/getArticle/id/" + _this.id).then(function(res) {
            _this.content = res.data.data.article;
        }).catch(function(err) {
            console.log(err);
        });
    },
    mounted() {

    },
    methods: {
        handleSave: function() {
            let _this = this;
            _this.axios.post('/api/modifyContent', {
                url: _this.$route.query.p_url,
                content: _this.content,
            }, {
                headers: {
                    'Authorization': sessionStorage.getItem("Authorization"),
                }
            }).then(() => {
                _this.$message({
                    type: "success",
                    message: "保存成功"
                });
            }).catch(err => {
                console.error(err);
            })
        }
    }
}
</script>