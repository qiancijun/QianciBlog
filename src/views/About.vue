<template>
    <div class="about-container">
         <mavon-editor
            class= "md"
            :value= "content"
            :subfield = "false"
            :defaultOpen = "'preview'"
            :toolbarsFlag = "false"
            :editable = "false"
            :ishljs = "true"
            :style="{'width': '80%', 'height': '100%', 'margin': '0 auto'}"
            >
        </mavon-editor>
    </div>
</template>

<style lang="less">
.about-container {
    width: 100%;
    height: 100%;
    background: #fff;
}
</style>


<script>
export default {
    data() {
        return {
            content: "",
        }
    },
    created() {
        let _this = this;
        this.axios("/api/getAboutMe").then(res => {
            _this.content = res.data.data;
        }).catch(err => {
            console.error(err);
        })
    }
}
</script>