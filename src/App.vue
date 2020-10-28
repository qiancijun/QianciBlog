<template>
  <div id="app">
    <TopBar></TopBar>
    <!-- <Carousel></Carousel> -->
    <!-- <BackTop></BackTop> -->
    <router-view/>
    <div class="box"></div>
  </div>
</template>

<style lang="less">
html body {
  margin: 0;
  padding: 0;
  background: #F0F8FF;
  // position: relative;
}
.box {
  height: 200px;
  width: 200px;
  background: #bfa;
}
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

</style>


<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>