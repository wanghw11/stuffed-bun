<template>
  <div class="renzheng">
    <div class="rz_contont">
      <div class="contont_top">
        <div class="top_touxiang" @click="rzShow = !rzShow">
          <img v-if="!loginFlag" src="../../../assets/icon/未登录.png" alt="">
          <img v-if="loginFlag" src="../../../assets/icon/头像.png" alt="">
        </div>
        <div class="top_msg">
          <div style="display:flex;justify-content: space-between;flex:1;">
            <div>
              {{ htmlData.custName ? htmlData.custName : '未校验' }}
            </div>
            <div v-if="addrFlag">
              <div class="wangji" @click="goAddress">
                {{ address }}
              </div>
            </div>
          </div>
          <div style="display:flex;justify-content: space-between;flex:1;">
            <div>
              {{ htmlData.phone ? htmlData.phone : '此业务需输入宽带号进行校验' }}
            </div>
            <div v-if="!loginFlag" class="wangji">
              <div @click="selKuandai">
                忘记宽带号码
              </div>
              <van-action-sheet v-model="checked" @cancel='cancel' title="宽带查询">
                <SelectKuandai @getKuandai="getKuandai"/>
              </van-action-sheet>
            </div>
<!--            <div v-if="loginFlag" class="wangji">
              <img src="../../../assets/icon/退出登录.png" alt="">
            </div>-->
          </div>
        </div>
      </div>
      <div style="margin:5px;font-size:14px;">
        证件号码：{{ htmlData.certCode ? htmlData.certCode : '暂无' }}
      </div>
    </div>
    <div class="rz_msg">
      {{ htmlData.productName ? htmlData.productName : '' }}
    </div>
    <van-dialog v-model="rzShow" title="宽带校验" :show-confirm-button='false' :close-on-click-overlay='true'>

      <div class="title">
        <div class="title-s">
          <div class="secah">
            <van-search v-model="searchData" shape="round" background="#fff" placeholder="请输入宽带号码"/>
          </div>
          <div class="xiaoyanBtn" @click="dialog">
            <div class="search-btn">
              校验
            </div>
          </div>

        </div>

      </div>
    </van-dialog>
    <van-dialog v-model="dialogShow" title="身份认证" :show-confirm-button='false' :close-on-click-overlay='true'>
      <div>
        <!-- <van-search v-model="dialogData" shape="round" background="#fff" placeholder="请输入您的身份证后6位" /> -->
        <div style="padding:10px 0px 10px 10px ;">
          <van-field v-model="dialogData" placeholder="请输入您的身份证后6位"/>
        </div>
        <div style="padding:0px 0px 10px 10px ;">
          <van-field v-model="phone" placeholder="请输入手机号"/>
        </div>
        <div class="yanzhengm" style="display:flex;padding:0px 0px 10px 10px ;">
          <van-field v-model="phoneYanzheng" placeholder="请输入验证码"/>
          <div class="xiaoyanBtn">
            <div class="search-btn" v-if="onSecFlag" @click="onSec">
              <span>获取验证码</span>
            </div>
            <div class="search-btn" v-if="!onSecFlag">
              <span>{{ onSecDate }}秒后重新获取</span>
            </div>
          </div>
        </div>
        <div>
          <div class="xiaoyanBtn" style="margin: 10px;display:flex;" @click="onPhone">
            <div class="search-btn" style="flex:1;">
              确认
            </div>
          </div>
        </div>
      </div>
    </van-dialog>
    <Loading :showZzc="showZzc"/>
  </div>
</template>
<script>
import Loading from '../../common/loading'
import SelectKuandai from './selectKuandai'
import Api from '../../../api/apiIPTV'

export default {
  components: {
    SelectKuandai,
    Loading
  },
  computed: {
    staffId() {
      if (sessionStorage.getItem('staffId')) {
        return sessionStorage.getItem('staffId')
      } else {
        return ''
      }
    },
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
      checked: false, // 宽带查询  开关
      datas: {
        open4gMode: 1,
        remoteTag: '1',
        isPrint: '0'
      },  // 接口返回的客户宽带信息
      phone: '',
      phoneYanzheng: '', // 验证码
      onSecFlag: true,
      onSecDate: 59,
      htmlData: {},
      loginFlag: false,
      addrFlag: false,
      flag: true,  //  按钮抗压
      goodsList: []
    }
  },
  mounted() {
    this.getQrcode()
  },
  methods: {
    // 重新获取城市工号
    goAddress() {
      this.$router.push('/getStaff2')
    },
    // 忘记宽带号
    selKuandai() {
      this.checked = true  // 忘记宽带  弹窗
    },
    getQrcode() {
      if (this.token != '') {
        this.addrFlag = false
      } else {
        this.addrFlag = true
      }
    },
    getKuandai(data) {
      this.checked = false   // 忘记宽带  弹窗
      this.rzShow = true  // 宽带  查询   弹窗
      this.searchData = data.accountNet
      this.phone = data.linkPhone.split('|')[1]
    },
    cancel() {
      this.checked = false
      this.searchData = ''
    },
    //身份认证弹窗
    dialog() {
      if (this.searchData == '') {
        this.$toast('请输入宽带号码！')
        return
      }
      if (this.searchData.substring(0, 1) != '0') {
        alert("请输入正确的宽带号码!");
        return;
      }
      if (this.searchData.length > 13) {
        alert("位数太长，请确认正确性!");
        return;
      }
      if (this.flag) {
        this.loadingStart("加载中。。。")
        // this.showZzc = true
        this.flag = false
        let api = new Api()
        let list = [api.checkKDHasPre(this.searchData), api.qryMainNumber2(this.searchData)]
        this.$axios.all(list).then(
          this.$axios.spread((res1, res2) => {
            // this.showZzc = false
            this.loadingStop()
            if ('1111' == res1.data.msgFlag) {
              var ticp = res1.data.commName;
              alert("此号码已经提速，产品为：" + ticp + ",不允许重复办理");
              this.flag = true
              return;
            } else if ('2' == res1.data.msgFlag) {
              alert("没有可提速的产品！");
              this.flag = true
              return;
            } else {
              this.rzShow = false
              this.dialogShow = true
            }

            if (res2.data.msgFlag == 0) {
              //放入主号码信息
              var mainNumber = res2.data.mainNumber;
              if ("" != mainNumber && mainNumber != undefined) {
                this.phone = mainNumber
              }
            } else {
              console.log(res2.data.errmsg);
            }
          })
        )
      }

    },
    // 获取验证码
    onSec() {
      if (this.phone == '') {
        alert('请输入手机号！')
        return;
      }
      this.onSecFlag = false  // 60秒   开关

      let setTime = setInterval(() => {
        this.onSecDate--
        if (this.onSecDate == 0) {
          this.onSecFlag = true
          this.onSecDate = 59
          clearInterval(setTime)
        }
      }, 1000);
      let api = new Api()
      api.sendMsg(this.phone).then(res => {
        if (res.data.msgFlag == '0') {
          this.$toast('验证码发送成功')
        } else {
          this.$dialog.alert({
            message: res.data.errmsg,
          }).then(() => {

          });
        }
      }).catch(error => {
        alert(error)
      })
    },
    // 确认验证码  // 根据宽带号码  获取客户信息 iptv信息
    onPhone() {
      if (this.dialogData == '') {
        this.$toast('请输入身份证后6位！')
        return
      }
      if (this.phone == '') {
        this.$toast('请输入手机号！')
        return
      }
      if (this.phoneYanzheng == '') {
        this.$toast('请输入验证码！')
        return
      }
      let api = new Api()
      let data = {
        'phoneNumber': this.phone,
        'serialNumber': this.searchData
      }
      // this.showZzc = true
      this.loadingStart("加载中。。。")
      api.checkKDBroadbandNum(data).then(result => {

        if (result.data.msgFlag == '0') {
          if (this.phoneYanzheng != result.data.randomNum) {
            alert('请输入正确的验证码！')
            return
          }
          let userThreePartInfo = result.data.userThreePartInfo;
          if (null == userThreePartInfo || undefined == userThreePartInfo || "" == userThreePartInfo) {
            alert("主号码校验失败,请重试!");
            return;
          }

          this.htmlData = {
            productName: userThreePartInfo.userInfo.productName ? userThreePartInfo.userInfo.productName : '',
            certCode: userThreePartInfo.custInfo.certCode ? this.encrypt(userThreePartInfo.custInfo.certCode, "certCode") : '无',
            phone: this.searchData,
            custName: userThreePartInfo.custInfo.custName ? this.encrypt(userThreePartInfo.custInfo.custName, "custName") : '无'
          }


          this.$set(this.datas, 'phoneNum', this.searchData) //
          this.$set(this.datas, 'result', JSON.stringify(result.data)) //
          let userInfo = userThreePartInfo.userInfo;//附加产品
          let productName = userInfo.productName;//套餐名
          let nextProductId = userInfo.nextProductId;//套餐名
          let ProductId = userInfo.productId;//套餐名
          let certCode = userThreePartInfo.custInfo.certCode; //身份证号
          let custName = userThreePartInfo.custInfo.custName; //姓名
          let custId = userThreePartInfo.custInfo.custId; //老客户编码
          let custType = userThreePartInfo.custInfo.custType; //custType
          let certTypeCode = userThreePartInfo.custInfo.certTypeCode; //certTypeCode
          let certEndDate = userThreePartInfo.custInfo.certEndDate; //certTypeCode
          let certAddr = userThreePartInfo.custInfo.certAddr; //certTypeCode
          this.$set(this.datas, 'mainNumber', this.searchData) //
          this.$set(this.datas, 'certCode', certCode) //
          this.$set(this.datas, 'certAddr', certAddr) //
          this.$set(this.datas, 'custType', custType) //
          this.$set(this.datas, 'certTypeCode', certTypeCode) //
          this.$set(this.datas, 'certEndDate', certEndDate) //
          this.$set(this.datas, 'custName', custName) //
          this.$set(this.datas, 'custId', custId) //
          this.$set(this.datas, 'mainUserId', userInfo.userId) //
          this.$set(this.datas, 'userType', '1') //
          this.$set(this.datas, 'oldCustInfo', JSON.stringify(userThreePartInfo.custInfo)) //

          let ss = certCode.substring(certCode.length - 6)
          if (this.dialogData != ss) {
            alert("请输入本人正确的证件号后6位！");
            return;
          }
          let par = {
            'cbProductId': ProductId,
            'inputType': '1'
          }
          api.qryCbssPromByProductId(par).then(res => {
            // this.showZzc = false
            this.loadingStop()
            if (res.data.msgFlag == '0') {
              let resultJson = res.data.resultJson;
              let rows = resultJson.root.rows;
              if (rows != null) {
                this.goodsList = []
                for (let i = 0; i < rows.length; i++) {
                  let elem = rows[i];
                  if (elem.commType == "111") {
                    console.log("elem", elem)
                    this.goodsList.push(elem)
                    var commId = elem.commId;
                    var commName = elem.commName;
                    var dename = "elem" + commId;
                    this.$set(this.datas, dename, JSON.stringify(elem)) //
                  }
                }
                this.dialogShow = false
                this.loginFlag=true
                this.$emit('getHtmlData', JSON.parse(JSON.stringify(this.goodsList)))
                this.$emit('getDatas', JSON.parse(JSON.stringify(this.datas)))
              }
            }
          })
        } else {
          alert(result.data.errmsg)
          return;
        }
      })
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
    encrypt(content, type) {
      if (!content) {
        return "无";
      }
      var reurnContent = "";
      if (type == 'custName') {
        //用户姓名脱密
        if (1 < content.length && content.length < 4) {
          reurnContent = content.substring(0, 1);
          for (var i = 0; i < content.length - 1; i++) {
            reurnContent = reurnContent + "*";
          }
        } else if (content.length > 3) {
          reurnContent = content.substring(0, 2);
          for (var i = 0; i < content.length - 2; i++) {
            reurnContent = reurnContent + "*";
          }
        }

      } else if (type == 'certCode') {
        //用户身份证脱密
        reurnContent = content.substring(0, content.length - 12) + "************";

      } else if (type == 'phone') {
        //用户号码脱密
        reurnContent = content.substring(0, content.length - 4);
        for (var i = 0; i < 4; i++) {
          reurnContent = reurnContent + "*";
        }

      } else if (type == 'address') {
        //用户住址脱密

      } else if (type == 'imei') {
        //IMEI脱密

      } else if (type == 'position') {
        //位置信息脱密

      }

      return reurnContent;
    }
  }
}
</script>
<style lang="scss" scoped>
.renzheng {
  background-color: #588EF1;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
  position: relative;

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

  .rz_contont {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 20vh;
    box-sizing: border-box;

    .contont_top {
      display: flex;

      .top_touxiang {
        height: 8vh;
        width: 8vh;
        border-radius: 50%;

        img {
          width: 100%;
        }
      }

      .top_msg {
        margin-left: 10px;
        font-size: 12px;
        line-height: 18px;
        flex: 1;

        .wangji {
          padding: 10px;
          padding-top: 0;
          text-align: right;
          font-size: 12px;
          color: #777;
          text-decoration: underline;

          img {
            height: 100%;
          }
        }
      }
    }
  }

  .rz_msg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 6vh;
    width: 80%;
    z-index: 100;
    background-color: #588EF1;
    border-radius: 8px;
    padding: 10px;
    box-sizing: border-box;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 0.4;
  }

}

.yanzhengm {
  .van-cell {
    padding: 5px 8px;
    background-color: #f7f8fa;
    width: 55%;
  }
}

.renzheng:after {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0px;
  content: "";
  height: 5vh;
  width: 100%;
  border-radius: 50% 50% 0 0;
  background: #fff;
}
</style>
