<template>
  <div class="flowPacket">
    <!--轮播图-->
    <div style="width:100%">
      <van-swipe class="my-swipe" indicator-color="white" :autoplay="3000">
        <van-swipe-item v-for="(item, index) in bannerList" :key="index">
          <div style="width:100%;padding:1.87vh 3.7%;box-sizing: border-box;">
            <img style="width:100%;border-radius:4px;" :src="item" alt="">
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <!--流量专区-->
    <div class="outer_box">
      <div class="outer_div">流量专区</div>
      <div class="content" v-if="flowList.length>0">
        <div class="content_two">
          <div class="content_flex" v-for="(item, index) in flowList" :key="index" @click="checkFlow(item)">
            <img v-lazy="item.img"/>
            <div style="text-align: center">
              <div class="content_div" :style="{color:item.color}">{{ item.commName }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="outer_div2" v-else>暂无可选择的流量包</div>
    </div>
  </div>
</template>

<script>
import Api from '../../../api/apiFlowPacket'
import Vue from 'vue';
import {Lazyload} from 'vant';

Vue.use(Lazyload, {
  lazyComponent: true,
});
export default {
  name: 'flowPacket',
  computed: {
    token() {
      if (sessionStorage.getItem('tokenId')) {
        return sessionStorage.getItem('tokenId')
      } else {
        return ''
      }
    },
    address() {
      if (sessionStorage.getItem('address')) {
        let add = JSON.parse(sessionStorage.getItem('address'))
        return add.areaname
      } else {
        return '请选择城市'
      }
    },
  },
  data() {
    return {
      //背景图
      jsonData: [
        {img: './static/flowImg/01.png', color: '#F8AD00'},
        {img: './static/flowImg/02.png', color: '#EB4F5B'},
        {img: './static/flowImg/03.png', color: '#1A83EB'},
        {img: './static/flowImg/04.png', color: '#8623D9'},
        {img: './static/flowImg/05.png', color: '#E63888'},
        {img: './static/flowImg/06.png', color: '#41BC96'},
      ],
      //轮播图
      bannerList: [
        'https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/brand/banner1.jpg',
        /*'https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/brand/banner2.jpg',
        'https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/qrcode/brand/banner3.jpg'*/
      ],
      //流量包类型
      quanyiObj: [
        {busiType: '5G'},
        {busiType: '4G'},
        {busiType: 'SC'},
      ],
      flowList: [], //流量包信息
      staffId: '',
      classId: ''
    }
  },
  created() {
    this.login()
  },
  methods: {
    //登录验证
    login() {
      if (this.token) {
        let api = new Api()
        this.global.loadingStart("加载中。。。")
        api.qrcodeSelectTokenId(this.token).then(res => {
          if (res.data.msgFlag == '0') {
            this.classId = res.data.resultJson[0].classId
            this.staffId = res.data.resultJson[0].staffId
            this.$store.commit('updataTokenJson', res.data.resultJson[0])
            this.$store.commit('updataStaffId', res.data.resultJson[0].staffId)
            this.$store.commit('updataClassId', res.data.resultJson[0].classId)
            sessionStorage.setItem('staffId', res.data.resultJson[0].staffId)
            sessionStorage.setItem('classId', res.data.resultJson[0].classId)
            sessionStorage.setItem('tokenJson', JSON.stringify(res.data.resultJson[0]))
            api.login(this.staffId).then(resultData => {
              this.global.loadingStop()
              if (resultData.data.msgFlag == "0") {
                for (let i = 0; i < this.quanyiObj.length; i++) {
                  this.getActivity(this.quanyiObj[i].busiType)
                }
              } else {
                alert("用户信息获取失败：请重新打开！");
              }
            }).catch(error => {
              this.global.loadingStop()
              alert(error)
            })
          }
        })
      } else {
        this.classId = sessionStorage.getItem('classId')
        this.staffId = sessionStorage.getItem('staffId')
        this.global.loadingStart("加载中。。。")
        let api = new Api()
        api.login(this.staffId).then(resultData => {
          this.global.loadingStop()
          if (resultData.data.msgFlag == "0") {
            for (let i = 0; i < this.quanyiObj.length; i++) {
              this.getActivity(this.quanyiObj[i].busiType)
            }
          } else {
            alert("用户信息获取失败：请重新打开！");
          }
        }).catch(error => {
          this.global.loadingStop()
          alert(error)
        })
      }
    },
    //获取流量包
    getActivity(busiType) {
      this.global.loadingStart("加载中。。。")
      let api = new Api();
      api.qryCbssPromByProductIdLimitAll({busiType: busiType}).then(resultMap => {
        this.global.loadingStop()
        if (resultMap.data.msgFlag == '0') {
          let rows = resultMap.data.resultJson.rows;
          let offerSort = resultMap.data.resultJson.offerSort;
          let sortArr = offerSort.split(",");
          if (rows && rows.length > 0 && offerSort) {
            let num = this.jsonData.length;
            for (let j = 0; j < sortArr.length; j++) {
              for (let i = 0; i < rows.length; i++) {
                if (rows[i].commId == sortArr[j]) {
                  let c = j % num;
                  let obj = {
                    img: this.jsonData[c].img,
                    color: this.jsonData[c].color,
                    commId: rows[i].commId,
                    commName: rows[i].commName,
                    busiType: busiType
                  }
                  this.flowList.push(obj)
                }
              }
            }
          }
        } else {
          alert("可选流量包获取失败：" + resultMap.data.errmsg);
        }
      }).catch(error => {
        this.global.loadingStop()
        alert(error)
      })
    },
    //选中流量包
    checkFlow(item) {
      this.global.loadingStart("加载中。。。")
      let api = new Api()
      api.qrcodeUpdataToken(this.classId, this.staffId, '', 'flowDetail').then(res => {
        this.global.loadingStop()
        if (res.data.msgFlag == '0') {
          let token = res.data.resultJson[0].tokenId
          let url = 'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/functionVue/index.html?' +
            'sourceId=' + this.classId +
            '&routerId=flowDetail' +
            '&menuId=' + sessionStorage.getItem('menuId') +
            '&commId=' + item.commId +
            '&busiType=' + item.busiType +
            '&token=' + token
          window.location.href = url
        } else {
          alert(res.data.errmsg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.flowPacket {
  box-sizing: border-box;
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: scroll;
  background-color: #f9f9f9;

  .outer_box {
    margin-bottom: 0.75vh;
    background-color: #fff;
    padding: 1.87vh 3.7%;

    .outer_div {
      font-size: 4.26vw;
      color: #000;
      font-weight: 600;
    }

    .outer_div2 {
      font-size: 3.8vw;
      width: 100%;
      text-align: center;
      color: #999;
      padding: 5vh 0 3vh 0;
    }

    .content {
      margin-top: 0.8vh;

      .content_two {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .content_flex {
          margin-top: 1.6vh;
          position: relative;
          width: 45vw;

          img {
            width: 100%;
          }

          .content_div {
            word-break: break-all;
            max-height: 5vh;
            padding: 0 2.5vh;
            box-sizing: border-box;
            overflow: scroll;
            font-weight: bold;
            font-size: 3.62vw;
            position: absolute;
            top: 48%;
            width: 100%;
            text-align: left;
            transform: translateY(-48%);
          }
        }
      }
    }
  }
}
</style>
<style>
.van-swipe__indicators {
  bottom: 3vh;
}
</style>
