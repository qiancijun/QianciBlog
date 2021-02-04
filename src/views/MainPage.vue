<template>
    <div class="MainPageContainer">
        <Carousel></Carousel>
        <LatestNotes></LatestNotes>
        <CategoryCard></CategoryCard>
    </div>
</template>

<style lang="less">
.MainPageContainer {
    background: #333;
}
</style>

<script>
export default {
    
    mounted() {
        // document.querySelector('body').setAttribute('style', 'background-color: #333');
    }
}
</script>