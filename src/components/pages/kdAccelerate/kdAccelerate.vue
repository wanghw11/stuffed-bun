<template>
  <div id="broadband-iptv">
    <userYZ @getHtmlData='getHtmlData' @getDatas='getDatas'></userYZ>
    <!-- <user-msg :msgData='htmlData'></user-msg> -->
    <goods-msg @onActive="onActive" :msgData='htmlData'></goods-msg>

    <div class="userMsg">
      <div style="line-height: 40px;font-weight:600;position: relative;">
        <span>入网信息</span>
        <!-- <div @click="xuanz2 = !xuanz2" :class="xuanz2?'xuanzShun':''" style="position: absolute;top:25%;right:0;border-color: #000 #fff #fff #fff;border-style: solid;border-width: 8px 8px 0 8px;height: 0;width: 0;"></div> -->

      </div>
      <div class="content">
        <div class="content-item">
          <span class="item-name">联系电话：</span>
          <div class="item-content">
            <Phone @getPhone='getPhone'/>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-item">
          <span class="item-name">备注信息：</span>
          <div class="item-content">
            <input type="text" v-model="remak" placeholder="请输入备注信息">
          </div>
        </div>
      </div>
    </div>
    <footer style="background: white;">
      <div class="h3" style="line-height:63px;margin-left: 15px;">本次收费：<span
        style="font-size: 20px;color: #ff6025;">{{ totalPriceStr }}元</span></div>
      <div class="right btn" @click="onQuery" style="width: 30%;">确认</div>
      <div class="clearfix"></div>
    </footer>
    <Loading :showZzc="showZzc"/>
  </div>
</template>
<script>
import Loading from '../../common/loading'
import Phone from '../../common/phone'
import goodsMsg from './goodsMsg'
import Api from '../../../api/apiIPTV'
import Api2 from '../../../api/apiHome'
import userYZ from './userYZ'
import {Dialog} from 'vant';

export default {
  name: 'broadband-iptv',
  computed: {
    //     title(){
    //         return this.$route.params.title
    //     },
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
      showZzc: false, // loading 开关
      searchData: '',  // 搜索框  信息
      dialogShow: false, // 效验  身份认证  开关
      rzShow: false,
      dialogData: '', // 身份证输入信息
      xuanz: false, // 下拉三角1
      xuanz1: false,
      remak: '', // 备注信息
      totalPriceStr: 0,
      currentDate: new Date(),
      checked: false, // 宽带查询  开关
      datas: {},  // 接口返回的客户宽带信息
      phone: '',
      phoneYanzheng: '', // 验证码
      onSecFlag: true,
      onSecDate: 59,
      htmlData: {},
      isMessage1: false, // 客户信息  开关
      isMessage2: false, // 客户信息  开关
      contactPhone: '',// 加装iptv电话
      loginFlag: false,
      kdSpeedUpInfo: ''
    }
  },
  components: {
    Phone,
    userYZ,
    Loading,
    goodsMsg
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.token) {
        let api1 = new Api()
        let api3 = new Api2()
        // this.showZzc = true
        this.loadingStart("加载中。。。")
        api3.qrcodeSelectTokenId(this.token).then(res => {
          if (res.data.msgFlag == '0') {
            this.classId = res.data.resultJson[0].classId
            this.staffId = res.data.resultJson[0].staffId
            this.$store.commit('updataTokenJson', res.data.resultJson[0])
            this.$store.commit('updataStaffId', res.data.resultJson[0].staffId)
            this.$store.commit('updataClassId', res.data.resultJson[0].classId)
            sessionStorage.setItem('staffId', res.data.resultJson[0].staffId)
            sessionStorage.setItem('classId', res.data.resultJson[0].classId)
            sessionStorage.setItem('tokenJson', JSON.stringify(res.data.resultJson[0]))
            api1.init(this.staffId).then(res => {
              // this.showZzc = false
              this.loadingStop()
              console.log("222222222222", res)
            })
          } else {
            alert(res.data.errmsg)
            return
          }
        })
      } else {
        this.classId = sessionStorage.getItem('classId')
        this.staffId = sessionStorage.getItem('staffId')
        let data = {
          staffId: this.staffId
        }
        let api1 = new Api()
        // this.showZzc = true
        this.loadingStart("加载中。。。")
        api1.init(this.staffId).then(res => {
          console.log("222222222222", res)
          // this.showZzc = false
          this.loadingStop()
        })
      }

    },
    getHtmlData(val) {
      this.htmlData = val
      console.log("1111111111", val)
    },
    getDatas(val) {
      console.log("111111111111", val)
      this.datas = val
    },
    // 获取联系电话   加装iptv的配送电话
    getPhone(val) {
      this.contactPhone = val
    },
    onActive(val) {
      this.kdSpeedUpInfo = JSON.stringify(val)
    },
    loadingStart(tips) {
      this.$toast.loading({
        message: tips,
        forbidClick: true,
        duration: 0,
        overlay: true,
      })
    },
    loadingStop() {
      this.$toast.clear()
    },
    onQuery() {
      if ("" == this.contactPhone || undefined == this.contactPhone) {
        alert("请输入联系人电话！");
        return;
      }
      if (!this.kdSpeedUpInfo) {
        alert("请选择提速套餐！");
        return;
      }
      this.$set(this.datas, 'contactPhone', this.contactPhone)
      this.$set(this.datas, 'remarks', this.remak)
      this.$set(this.datas, 'kdSpeedUpInfo', this.kdSpeedUpInfo)
      this.$set(this.datas, 'wo', '')
      console.log("2222222222222222222222222222222222", this.datas)
      // this.showZzc = true
      this.loadingStart("加载中。。。")
      let api = new Api()
      api.kdSpeedDataAdd(this.datas).then(res => {
        // this.showZzc = false
        this.loadingStop()
        if (res.data.msgFlag == 0) {
          //取订单号
          var result = res.data.resultJson;
          Dialog.alert({
              message: '下单成功！您的订单号码: '+ result.orderId + '！',
          }).then(() => {
              this.$router.go(0)
          });
        } else {
          alert(res.data.errmsg);
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
#broadband-iptv {
  margin-bottom: 80px;
  box-sizing: border-box;
  width: 100%;
  background-color: #f2f2f2;

  .top {
    height: 6vh;
    width: 100%;
    position: fixed;
    top: 0;
    background-color: #fff;

    .topImage {
      height: 50%;
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);

      img {
        height: 100%;
      }
    }

    .topTitle {
      text-align: center;
      line-height: 6vh;
      font-size: 1.2rem;
    }
  }

  .xuanzShun {
    transform: rotate(180deg);
  }

  .van-overlay {
    z-index: 0 !important;
  }

  .van-cell {
    padding: 5px 8px;
    background-color: #f7f8fa;
  }

  .van-action-sheet {
    height: 60%;
  }


  .title {
    background-color: #fff;
    margin: 10px;

    border-radius: 5px;

    .title-s {
      margin: 10px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .secah {
        width: 75%;

        .van-search {
          padding: 10px 0;
        }
      }

    }

  }

  .xiaoyanBtn {
    margin-left: 10px;
    margin-right: 10px;
    flex: 1;

    .search-btn {
      background: #3f80f7;
      color: white;
      font-weight: bold;
      text-align: center;
      border-radius: 4px;
      padding: 5px;
      line-height: 24px;
      font-size: 14px;
    }

  }

  .userMsg {
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    margin: 10px;
    border-radius: 5px;

    .cor {
      background-color: #f7f8fa;
    }

    .content {
      padding: 10px;
      box-sizing: border-box;

      .content-item {
        display: flex;
        // align-items: center;
        margin-bottom: 5px;
        // font-size: 12px;
        .item-name {
          flex: 3;
        }

        .item-content {
          flex: 8;

          .van-cell {
            padding: 0;
            background-color: #fff;
          }
        }
      }
    }
  }

  footer {
    background: #f2f2f2;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  footer .btn {
    margin: 5px 15px;
  }

  .btn {
    background: #3f80f7;
    color: white;
    font-weight: bold;
    padding: 14px;
    text-align: center;
    border-radius: 4px;
    margin: 20px 20px 0;
  }

  .clearfix {
    clear: both;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .h3 {
    font-size: 16px;
    float: left;
    font-weight: 600;
  }
}
</style>
