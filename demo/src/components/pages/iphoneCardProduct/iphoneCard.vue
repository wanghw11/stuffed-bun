<template>
<!-- 业务办理-我要办手机卡小模块-->
  <div>
    <!-- 按钮返回 -->
    <div class="back-btn">
       
    </div>
    <!-- banner部分 -->
    <div class="banner">
      <div style="width:100%">
        <van-swipe class="my-swipe" indicator-color="white">
            <van-swipe-item v-for="(item, index) in banner" :key="index">
                <div style="width:100%;box-sizing: border-box;">
                    <img style="width:100%;" :src="item" alt="">
                </div>
            </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 业务办理提示 -->
    <div class="banner-title">
      {{title}}
    </div>
    <!-- 业务办理提示内容 -->
    <div class="banner-title-content">
      <div class="content-item" v-for="(item, index) in dataJson" :key="index" @click="gomenu(item)">
        <img :src="item.img" alt="">
      </div>
    </div>
    <Loading :showZzc="showZzc"/>
  </div>

</template>

<script>
import Loading from '../../common/loading'
import apiGuide from '../../../api/apiGuide'
const api = new apiGuide()
export default {
  components:{
      // addressComm
      Loading
  },
  computed:{
    classId(){
      if(sessionStorage.getItem('classId')){
          return sessionStorage.getItem('classId')
      }else{
          return ''
      }
    },
    menuId(){
      if(sessionStorage.getItem('menuId')){
          return sessionStorage.getItem('menuId')
      }else{
          return ''
      }
    },
    staffId(){
      if(sessionStorage.getItem('staffId')){
          return sessionStorage.getItem('staffId')
      }else{
          return ''
      }
    },
  },
  data(){
    return {
      dataJson:'',
      banner:[],
      title:'',
      showZzc:false
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){
      let data = {
        classId: this.classId,
        menuId: this.menuId
      }
      this.showZzc = true
      api.qryGuidByClassIdMenuId(data).then(res => {
        let dataArr = []
        this.showZzc = false
        if(res.data.msgFlag == '0'){
          let str = res.data.resultJson[0].bottons
          this.banner.push(res.data.resultJson[0].topPicture)
          this.title = res.data.resultJson[0].spare1
          let dataAll = str.split(',,')
          dataAll.map(item => {
            let dataJson = {
              url:item.split('||')[1],
              img:item.split('||')[0]
            }
            dataArr.push(dataJson)
          })
          this.dataJson = dataArr
        }else{
          alert(res.data.errmsg)
        }
      })
    },
    gomenu(item){
      window.location.href = item.url
    }
  },
}
</script>

<style lang="scss" scoped>
  .back-btn {

  }
  .banner {
    width: 100%;

  }
  .banner-title {
    padding: 2vh ;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
  }
  .banner-title-content {
    width: 100%;
    .content-item{
      width: 80%;
      margin: 0 auto 2vh;
      img{
        display: block;
        width: 100%;
      }
    }
  }
</style>>

