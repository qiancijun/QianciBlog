<template>
    <div class="star-container">
        <div class="star" ref="star" v-for="(item, index) in starsCount" :key="index">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            starsCount: 800,
            distance: 800,
        }
    },
    mounted(){
        let _this = this;
        let starArr = _this.$refs.star
        starArr.forEach(item => {
        let speed = 0.2 + (Math.random() * 1);
        let thisDistance = _this.distance + (Math.random() * 300);
        item.style.transformOrigin = `0 0 ${thisDistance}px`;
        item.style.transform = `
            translate3d(0,0,-${thisDistance}px)
            rotateY(${Math.random() * 360}deg)
            rotateX(${Math.random() * -50}deg)
            scale(${speed},${speed})`;
        })
    }
}
</script>

<style lang="less">

@keyframes rotate {
    0% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
    }
    100% {
        transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
    }
}
.star-container {
    transform: perspective(400px);
    transform-style: preserve-3d;
    position: absolute;
    perspective-origin: 50% 100%;
    left: 50%;
    animation: rotate 90s infinite linear;
    bottom: 0;
    .star {
        width: 2px;
        height: 2px;
        background-color: #f7f7b8;
        position: absolute;
        top: 0;
        left: 0;
    }
}

</style>