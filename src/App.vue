<template>
  <div id="app">
    <!-- <div class="title" >
      <span>{{titleName}}</span>
    </div> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      comFlag:false,
      loginFlag:false,
      homeFlag:true,
    }
  },
  computed:{
    titleName(){
      return this.$route.meta.title 
    }
  },
  methods:{
    comback(){
      this.$router.back(-1)
    }
  },
  watch:{
    // $route(to,form){
    //   if(to.name == 'login' || to.name == '404' || to.name == '500' || to.name == '401'){
    //     this.loginFlag = false
    //     this.comFlag = false
    //   }else if(to.name == 'broadband-iptv' ){
    //     this.comFlag = true
    //     this.loginFlag = true
    //     this.homeFlag = true
    //   }else{
    //     this.comFlag = true
    //     this.loginFlag = true
    //     this.homeFlag = false
    //   }
    // }
  }
}
</script>
<style lang="scss" scoped>
#app{
  margin: 0 auto;
}
  .bgc{
    background: #fff !important;
    color: #000 !important;
  }
  .title{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99999;
    height: 40px;
    font-size: 20px;
    line-height: 40px;
    text-align: center;
    color: #333;
    background: #fff;
    .conback{
      position: absolute;
      height: 100%;
      width: 40px;
      img{
        height: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
      }
    }
  }
</style>
