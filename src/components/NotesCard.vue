<template>
<vue-scroll :ops="ops" style="width:100%;height:100%">
    <div class="notesCard-Container">
        <div class="notesInfo">
            <p>
                <slot></slot>
            </p>
        </div>
        <div class="notesContent">
            <mavon-editor
                class= "md"
                :value= "content"
                :subfield = "false"
                :defaultOpen = "'preview'"
                :toolbarsFlag = "false"
                :editable = "false"
                :ishljs = "true">

            </mavon-editor>
        </div>
    </div>
</vue-scroll>
</template>

<script>
export default {
    data() {
        let content = "## hello";
        let title = "title";
        return {
            content,
            title,
            ops: {
                vuescroll: {},
                scrollPanel: {},
                rail: {
                keepShow: true
                },
                bar: {
                hoverStyle: true,
                onlyShowBarOnScroll: false, //是否只有滚动的时候才显示滚动条
                background: "#F5F5F5",//滚动条颜色
                opacity: 0.5,//滚动条透明度
                }
            }
        }
    }
}
</script>


<style lang="less">
.notesCard-Container {
    max-height: 300px;
    max-width: 400px;
    width: 25%;
    margin: 10px 0;
    margin-top: none;
    position: relative;
    padding: 4px;
    .md {
        min-height: 150px;
        min-width: 50px;
    }
    .notesInfo {
        p {
            display: inline-block;
            background: linear-gradient(to right, rgba(30,144,255,.4), rgba(135,206,250, .3));
            // line-height: 0.5rem;
            width: 100%;
            font-size: 30px;
            margin: 2px 0;
        }
    }
}
</style>