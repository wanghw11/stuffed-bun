<template>
<!-- 热销商品-智慧家庭小模块 -->
  <div>
    <!-- 按钮返回 -->
    <div id="detailImgList">
      <div class="detailImgList-item">
        <img :src="dataJson.img" alt="">
      </div>
      
      <div class="commit" @click="goMenu">
        <img src="../../../assets/icon/commit.png" alt="">
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
        console.log("11111111111",res)
        this.showZzc = false
        if(res.data.msgFlag == '0'){
          let str = res.data.resultJson[0].overallPicture
          let dataJson = {
            url : str.split('||')[1],
            img : str.split('||')[0],
          }
          this.dataJson = dataJson
        }else{
          alert(res.data.errmsg)
        }
      })
    },
    goMenu(){
      window.location.href = this.dataJson.url
    }
  },
}
</script>

<style lang="scss" scoped>
  #detailImgList {
    width: 100%;
    position: relative;
    .detailImgList-item{
      img{
        width: 100%;
      }
    }
    .commit{
      width: 40%;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
  }
</style>