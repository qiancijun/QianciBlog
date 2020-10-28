<template>
    <div class="latestNotes-container">
        <div class="latest">
            <img :src="LatestURL.url" @load="img_load" ref='img_ref'/>
        </div>
         <el-divider content-position="left">The Latest Notes</el-divider>
         <div class="latestNotes">
             <NotesCard></NotesCard>
             <NotesCard></NotesCard>
         </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            LatestURL: {url:require('../assets/Latest.png')},
        }
    },
}
</script>

<style lang="less" scoped>
.latestNotes-container {
    .latest {
        width: 3rem;
        height: 1.7rem;
        // margin: 0.5rem 0.5rem;
        // margin-bottom: none;
        margin-left: 0.5rem;
        margin-top: 0.5rem;
    }
}
</style>