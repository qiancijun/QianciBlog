<template>
	<div class="car-container">
		<el-carousel indicator-position="none" height="12rem" arrow="never" :autoplay="true" :interval="5000" >
			<el-carousel-item v-for="(item, index) in imgList" :key="index">
				<img :src="item.url" @load="img_load" ref='img_ref'/>
			</el-carousel-item>
		</el-carousel>
    <div class="mask"></div>
    <div class="introduction">
        <p>WelCome To</p>
        <p>Qianci's Blog</p>
    </div>
	</div>
</template>

<script>
export default {
    data() {
        return {
            imgList:[
                {url:require('../assets/1.jpg')},
                {url:require('../assets/3.jpg')},
                {url:require('../assets/4.jpg')},
                {url:require('../assets/8.jpg')},
            ],
            img_height:''
        }
    },
    methods: {
        img_load(){
            // console.log(this.$refs.img_ref[0].height,'img_height')
            this.img_height = this.$refs.img_ref[0].height
            // console.log(this.$refs.img_ref[0].width,'img_width')
        },
    },
    mounted() {

    },
    filters:{
			add_px(value){
				return value + 'px';
			}
		}
}
</script>

<style lang="less">

  img{
    width: 100%;
    
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .car-container {
    .mask {
      display: inline-block;
      width: 3rem;
      /* height: 3rem; */
      position: absolute;
      top: 60px;
      left: 0%;
      z-index: 5;
      /* border: 1px solid	rgba(	47,79,79, .5); */
      border-bottom: 12rem solid rgba(220,20,60,.5);
      border-right: 11rem solid transparent;
    }
    .introduction {
      display: inline-block;
      width: 6rem;
      height: 3rem;
      position: absolute;
      top: 6rem;
      left: 5%;
      z-index: 5;
      border: 1px solid white;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      p {
        font-size: 0.4rem;
        color: white;
        line-height: 1rem;
        margin: 0.2rem 0.2rem;
      }
      a {

        font-size: 0.2rem;
        color: white;
        line-height: 0.5rem;
        margin: 0.2rem 0.2rem;
      }
    }
  }


</style>