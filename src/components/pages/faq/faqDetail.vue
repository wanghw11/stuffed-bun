<template>
  <div>

    <div >
      <loading :showZzc="showZzc"></loading>
      <van-nav-bar
        title="详情信息"
        left-arrow
        @click-left="onClickLeft"
        class="nav_title"
      />
      <div class="con" v-show="!showZzc">
        <div class="con_title">{{conTitle}}</div>
        <div class="con_con">
          <img @error="handleError01($event)"  :src="img01" :class="[imgList01?'img':'noimg']"/>
          <img @error="handleError02($event)"  :src="img02" :class="[imgList02?'img':'noimg']"/>
          <img @error="handleError03($event)"  :src="img03" :class="[imgList03?'img':'noimg']"/>
          <img @error="handleError04($event)"  :src="img04" :class="[imgList04?'img':'noimg']"/>
          <img @error="handleError05($event)"  :src="img05" :class="[imgList05?'img':'noimg']"/>
          <div>{{conCon}}</div>
        </div>
      </div>
      <div class="btn_div" v-show="!showZzc">
        <van-button type="info" class="btn_know" @click="onClickLeft">我知道了</van-button>
      </div>
    </div>
  </div>

</template>

<script>
    import Api from '../../../api/api'
    import Loading from "../../common/loading";
    export default {
      name: "faqDetail",
      components: {Loading},
      data(){
          return{
            conTitle:"",
            conCon:"",
            showZzc:true,
            img01:"",
            img02:"",
            img03:"",
            img04:"",
            img05:"",
            imgList01:true,
            imgList02:true,
            imgList03:true,
            imgList04:true,
            imgList05:true,
          }
      },
      created() {
        this.getDetail();
      },
      methods:{
        onClickLeft(){
          this.$router.go(-1)
        },
        getDetail(){
          let api = new Api()
          let questionId = {
            questionId:this.$route.query.questionId
          }
          this.img01="https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/faq/"+questionId.questionId+"/1.png"
          this.img02="https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/faq/"+questionId.questionId+"/2.png"
          this.img03="https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/faq/"+questionId.questionId+"/3.png"
          this.img04="https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/faq/"+questionId.questionId+"/4.png"
          this.img05="https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/faq/"+questionId.questionId+"/5.png"
          api.faqDetail(questionId).then(res=>{
            console.log(res)
            this.conTitle=res.data.resultJson.question.questionDesc;
            this.conCon=res.data.resultJson.question.answerDesc;
            this.showZzc=false
          })
        },
        handleError01(e){
          e.currentTarget.src=""
          this.imgList01=false
        },
        handleError02(e){
          e.currentTarget.src=""
          this.imgList02=false
        },
        handleError03(e){
          e.currentTarget.src=""
          this.imgList03=false
        },
        handleError04(e){
          e.currentTarget.src=""
          this.imgList04=false
        },
        handleError05(e){
          e.currentTarget.src=""
          this.imgList05=false
        },
      }
    }
</script>

<style lang="scss" scoped>
$bg-hui:#f2f2f2;
  .nav_title{
    margin-bottom: 10px;
  }
  .con{
    background-color: white;
    padding: 10px 16px;
    .con_title{
      padding: 0 0 10px 0;
      border-bottom: 1px solid #e2e1e1;
      font-weight: bolder;
    }
    .con_con{
      padding: 20px 0 20px 0;
      font-size: 14px;
      .img{
        margin: 0 auto 15px auto;
      }
      .noimg{
        display: none;
      }
    }
  }
  .btn_div{
    padding: 30px 0;
    text-align: center;
    .btn_know{
      width: 50%;
      border-radius: 6px;
    }
  }
</style>
