<template>
<div class="BlogPage-container">
    <div class="table-of-article">
        <!-- <markdown-it-vue class="md-body" :content="content" :options="options" /> -->
        <div class="Blog-info-box">
            <h2>{{title}}</h2>
            <p>标签：
                <span v-for="item in tags" :key = "item" class="tag">
                    {{item}}
                </span>
            </p>
        </div>
        <mavon-editor
            class= "md"
            :value= "content"
            :subfield = "false"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "true"
            :toolbars = "bars"
            :editable = "false"
            :ishljs = "true"
            :style="{'width': '100%', 'height': '100%'}"
            >
        </mavon-editor>
        <!-- :navigation = "true" -->
        
    </div>
</div>
</template>

<style lang="less">
.BlogPage-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #1b2947), radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%);
    background-attachment: fixed;
    .table-of-article {
        width: 85%;
        height: 80%;
        // background-color: rgb(251, 251, 251);
        margin: 10px auto;
        .Blog-info-box {
            h2 {
                font-size: 30px;
                text-align: center;
                color: #ffffff
            }
            p {
                font-size: 20px;
                margin: 10px 10px;
                line-height: 20px;
                color: #ffffff;
                // text-align: center;
                .tag {
                    display: inline-block;
                    text-align: center;
                    padding-right: 10px;
                }
            }
        }
    }
}
</style>

<script>
export default {
    data() {
        return {
            title: "",
            content: "",
            tags: "",
            bars: {
                htmlcode: true,
                readmodel: true,
                navigation: true,
            }
        }
    },
    mounted() {
        document.body.style.background = "radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #1b2947), radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%)";
        document.body.style.backgroundAttachment = "fixed";
        // let _this = this;
        // _this.title = _this.$route.query.p_title;
        //  _this.axios.get("api/getArticle/id/" + _this.$route.query.p_id).then(function(res) {
        //     _this.content = res.data.data.article;
        //     _this.tags = res.data.data.tags;
        //     console.log(res.data);
        //     // _this.title = res.data.data.articleTitle;
        //     // _this.$refs.cardDom = tmp.article;
        // }).catch(function(err) {
        //     console.log(err);
        // });
    },
    created() {
        let _this = this;
        _this.title = _this.$route.query.p_title;
         _this.axios.get("api/getArticle/id/" + _this.$route.query.p_id).then(function(res) {
            _this.content = res.data.data.article;
            _this.tags = res.data.data.tags;
            console.log(res.data);
            // _this.title = res.data.data.articleTitle;
            // _this.$refs.cardDom = tmp.article;
        }).catch(function(err) {
            console.log(err);
        });
    }
}
</script>