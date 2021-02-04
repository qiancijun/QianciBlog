<template>
  <div id="app">
    <TopBar></TopBar>
    <router-view/>
  </div>
</template>

<style lang="less">
html body {
  margin: 0;
  padding: 0;
  background: #333;
  height: 100vh;
  width: 100%;
}
#app {
  height: 100%;
}
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