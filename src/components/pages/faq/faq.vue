<template>
<div>
  <div class="nav">
    <van-nav-bar
      title="帮助中心"
      left-arrow
      @click-left="onClickLeft"
      class="nav_title"
    />
    <div class="knowledge_base">
      <div class="title">知识库</div>
      <van-search
        v-model="value"
        shape="round"
        left-icon="none"
        right-icon="search"
        placeholder="请输入您要搜索的关键词"
        @search="onSearch"
      >
      </van-search>
<!--      <div class="label" >-->
<!--        <div class="label_span" v-for="(item,indexLable) in lableList" :key="indexLable">-->
<!--          {{item}}-->
<!--        </div>-->
<!--      </div>-->
    </div>
    <img src="../../../assets/icon/img/faq.png" class="faqImg" v-if="faqImgBg">
  </div>

  <div class="list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="index+1+'：'+item.questionDesc" @click="gotoDetail(item.questionId)"/>
    </van-list>
    <div class="nullValue" v-show="nullValue">暂无搜索数据</div>
  </div>


</div>
</template>

<script>
    import Api from '../../../api/api'
    export default {
      name: "faq",
      data(){
          return{
            value:"",
            lableList:["掌沃通常见问题","版本说明","我的介绍","佣金奖励","宽带咨询","绑卡问题"],
            list: [],
            listCount:0,
            loading: false,
            finished: false,
            nullValue:false,
            faqImgBg:true,
            pageNum:1,
            pageSize:2,
          }
      },
      created () {
        let setList = this.$store.state.faqList;
        if(setList.length!==0){
          this.list=setList[0];
          this.faqImgBg=false;
        }
      },
      watch:{
        value(newValue,oldValue){
          if(newValue.length===0){
            this.nullValue = false;
          }else{
            this.nullValue = true;
          }
        }
      },
      methods:{
        onSearch(){
          this.faqImgBg=false;
          this.loading = true;
          let api = new Api()
          let key = {
            key:this.value,
            pageNum:this.pageNum,
            pageSize:this.pageSize
          }
          api.faqSearch(key).then(res=>{
            this.list=res.data.resultJson.questionList;
            this.$store.commit('setfaqList',this.list)
            console.log(this.$store.state.faqList)
            this.listCount=res.data.resultJson.total;
            this.loading = false;
            if(this.listCount==0){
              this.nullValue = true;
              this.faqImgBg=true;
            }
          })
        },

        onLoad() {
          this.loading = false;
          // 异步更新数据
          // setTimeout 仅做示例，真实场景中一般为 ajax 请求
          // setTimeout(() => {
          //   for (let i = 0; i < 10; i++) {
          //     this.list.push(this.list.length + 1);
          //   }
          //
          //   // 加载状态结束
          //   this.loading = false;
          //
          //   // 数据全部加载完成
          //   if (this.list.length >= 40) {
          //     this.finished = true;
          //   }
          // }, 1000);
        },
        gotoDetail(questionId){
          this.$router.push({
            path: '/faqDetail',
            query: {
              questionId: questionId
            }
          })
        },
        onClickLeft(){
           this.$router.go(-1)
        }
      },
    }
</script>

<style lang="scss" scoped>
$bg-color:#ffffff;
$blue: #1989fa;
$font-size-mini:15px;
$bg-hui:#f2f2f2;
  .nav{
    width: 100%;
    position: fixed;
    top: 0;
    z-index: 99;
  }
  .nav_title{
    border-bottom: 10px solid $bg-hui;
  }
  .knowledge_base{
    background-color: $bg-color;
    margin-bottom: 10px;
    .title{
       padding: 8px 20px 0 20px;
    }
    .label{
       padding:10px 15px 15px 15px;
       border-bottom: 1px solid $bg-hui;
        box-shadow: 0 2px 20px $bg-hui;
      .label_span{
        background-color: rgba(63,128,247,0.1);
        border: 1px solid $blue;
        color: $blue;
        padding: 6px 12px;
        display: inline-block;
        margin: 4px;
        font-size: $font-size-mini;
      }
    }
  }
  .list{
    margin-top: 150px;
    .nullValue{
      text-align: center;
      padding: 15px 0;
      color: #9697b0;
      font-size: 14px;
    }
  }
  .faqImg{
    margin: 50px auto;
  }
</style>
