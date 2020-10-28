<template>
    <div class="notesCard-Container">
        <div class="notesInfo">
            <p>{{title}}</p>
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
</template>

<script>
export default {
    data() {
        return {
            content: "## hello",
            title: "Test",
        }
    }
}
</script>


<style lang="less">
.notesCard-Container {
    height: 5rem;
    width: 80%;
    margin: 20px auto;
    margin-top: none;
    
    .md {
        min-height: 4rem;
    }
    .notesInfo {
        p {
            display: inline-block;
            background: linear-gradient(to right, rgba(30,144,255,.4), rgba(135,206,250, .3));
            line-height: 0.5rem;
            width: 100%;
            font-size: 0.3rem;
        }
    }
}
</style>