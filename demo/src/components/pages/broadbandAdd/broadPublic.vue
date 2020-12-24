<template>
  <div id="broadPublic" :class="{focusState :showFocus}">
    <!--客户信息-->
    <div class="renzheng">
      <div class="rz_contont">
        <div class="contont_top">
          <div class="top_touxiang" @click="rzShow = !rzShow">
            <img v-if="!loginFlag" src="../../../assets/icon/未登录.png" alt="">
            <img v-if="loginFlag" src="../../../assets/icon/头像.png" alt="">
          </div>
          <div class="top_msg">
            <div style="display:flex;justify-content: space-between;flex:1;">
              <div style="padding-bottom: 10px;">
                {{ htmlData.custName ? htmlData.custName : '未校验' }}
              </div>
              <div v-if="showAddress" class="wangji" @click="goAddress">
                {{ addressCity }}
              </div>
            </div>
            <div style="display:flex;justify-content: space-between;flex:1;">
              <div>
                {{ htmlData.phone ? htmlData.phone : '点击头像进行手机号码校验' }}
              </div>
<!--              <div v-if="loginFlag" class="wangji" @click="checkSignOut">
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
    </div>
    <!--商品信息-->
    <div class="content_box">
      <div class="content">
        <h1>商品信息</h1>
        <img @click="checkUserInfoImg" v-if="showUserInfoImg" class="zhankai" src="@/assets/icon/icon1.png" alt="">
        <img @click="checkUserInfoImg" v-else class="zhankai" src="@/assets/icon/icon2.png" alt="">
        <div class="clearfix"></div>
        <div v-if="showProduct && productselect.length>0" style="cursor:pointer;"
             v-for="(item,index) in productselect" :key="index">
          <div v-for="(item2,index2) in item.onuItems" :key="index2">
            <div v-for="(item3,index3) in item.iptvItems" :key="index3">
              <div v-for="(item4,index4) in item.iptvTextlist" :key="index4">
                <table :style="{'background':item.action?'#B0C4DE':'#f7f8fa'}"
                       @click="checkProduct(item,item2,item3,item5)" class="shangpin"
                       v-for="(item5,index5) in item.iptvNumItems"
                       :key="index5">
                  <tbody>
                  <tr>
                    <td>商品名称：</td>
                    <td>{{ item.policyName }}</td>
                  </tr>
                  <tr>
                    <td>光&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;猫：</td>
                    <td><input type="hidden" name="onuRadio" :value="item2.policyId"/>{{ item2.commName }}&nbsp;&nbsp;&nbsp;&nbsp;
                    </td>
                  </tr>
                  <tr>
                    <td>机&nbsp;顶&nbsp;盒：</td>
                    <td>
                      <input style="width: 16px;margin-right: 10px;" type="checkbox"
                             @click="changeCheckbox(item3)" v-model="item3.action"
                             :value="item3.policyId">{{ item3.commName }}&nbsp;&nbsp;&nbsp;&nbsp;
                      <h2>（可选）</h2>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <p style="margin: -15px 0 10px calc(25% + 28px); font-size: 14px;">
                        <input type="hidden" name="iptvMonth" :value="item4.policyId"/>{{ item4.commName }}&nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="hidden" name="iptvSumRadio" :value="item5.iptvNumId"/>&nbsp;&nbsp;&nbsp;&nbsp;
                      </p>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div v-if="showProduct && productselect.length<=0"
             style="color: #999;text-align: center;padding: 20px;">暂无商品信息
        </div>
      </div>
    </div>
    <!--入网信息-->
    <div class="content_box">
      <div class="content">
        <h1>入网信息</h1>
        <img class="zhankai" src="@/assets/icon/icon1.png" alt="">
        <div class="clearfix"></div>
        <table style="padding: 0 20px">
          <tbody>
          <tr>
            <td>联系电话：</td>
            <td><input placeholder="请输入联系人手机号" type="number"
                       v-model="linkTel" oninput="if(value.length > 11)value=value.slice(0,11)"></td>
          </tr>
          <tr>
            <td>预约日期：</td>
            <td>
              <input readonly type="text" onfocus="this.blur()" @click="showDate = true" :value="appointmentTime"
                     placeholder="请选择日期" style="text-align: left;"></td>
            <van-calendar v-model="showDate" @confirm="onConfirm" color="#3f80f7" :show-confirm="false"/>
          </tr>
          <tr>
            <td>预约时间：</td>
            <td><input readonly type="text" onfocus="this.blur()" @click="showTime = true" :value="time"
                       placeholder="请选择时间"
                       style="text-align: left;"/></td>
            <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
              <van-datetime-picker v-model="timeData" type="time" title="选择时间" @confirm='onConfirm2'
                                   @cancel='showTime = false'/>
            </van-popup>
          </tr>
          <tr>
            <td>安装地址：</td>
            <td>
              <input readonly type="text" onfocus="this.blur()" @click="showAddressList=true" :value='address'
                     placeholder="请选择地址" style="text-align: left;">
              <van-action-sheet v-model="showAddressList" title="选择地址">
                <div class="content_addr">
                  <div class="addr_cont_title">
                    <div class="addr_cont_item">{{ htmlCity.provinceName }}</div>
                    <div class="addr_cont_item">{{ htmlCity.cityName }}</div>
                    <div class="addr_cont_item">{{ htmlCity.name }}</div>
                  </div>
                  <div class="addr_cont">
                    <div class="addr_cont_item">
                      <div class="province" v-for="(item, index) in addressList"
                           :class="{active : htmlCity.name == item.name}"
                           :key="index" @click="onClickAdress(item)">{{ item.name }}
                      </div>
                    </div>
                  </div>
                  <div class="confirm">
                    <div class="confirmOn" @click="checkConfirm">确定</div>
                  </div>
                </div>
              </van-action-sheet>
            </td>
          </tr>
          <tr>
            <td>详细地址：</td>
            <td><input type="textarea" placeholder="请输入详细地址" v-model="kdAddress"></td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!--立即办理-->
    <footer style="padding:0 10px;">
      <h1 style="line-height: 63px;">本次收费：<span style="font-size: 28px;color: #ff6025;">{{ moneyTotal }}</span>&nbsp;元
      </h1>
      <div class="right btn" @click="payFee" style="width: 30%;">立即办理</div>
      <div class="clearfix"></div>
    </footer>
    <!--手机验证弹出框-->
    <div id="broadbandPersion">
      <div class="mask" v-if="rzShow">
        <div class="content_box"
             style="width: 70%;margin: 0 !important;position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);padding:20px;border-radius: 16px;">
          <div style="text-align: center;font-size: 18px;margin-bottom: 20px;">
            <span>手机号码校验</span>
            <span style="float: right;" @click="closeNum">X</span>
          </div>
          <div class="clearfix"></div>
          <input style="width:100%;margin: 0;"
                 v-model="serialNumber" type="number"
                 oninput="if(value.length > 11)value=value.slice(0,11)"
                 placeholder="请输入手机号码">
          <div style="padding-top: 15px;display: flex">
            <input :style="{'flex':showCheckNumber?'2':'1'}" style="float: left;margin: 0;"
                   v-model="checkNumber" type="number" placeholder="请输入验证码"
                   oninput="if(value.length > 6)value=value.slice(0,6)">
            <button
              style="flex:1;border: none;float: left;margin: 0;margin-left: 10px; border-radius: 5px;height: 36px;"
              class="anniu" @click="getCheckNumber" v-if="showCheckNumber">获取验证码
            </button>
            <button
              style="flex:1;border: none;float: left;width: 36%;margin: 0;margin-left: 10px; border-radius: 5px;height: 36px;"
              class="anniu" v-if="!showCheckNumber">({{ checkMiao }}s)后重新获取
            </button>
            <div class="clearfix"></div>
          </div>
          <input style="width: 100%;margin: 0;margin-top:15px;" class="anniu" type="button" value="确认"
                 @click="checkYzmNum">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from '../../../api/apiBroadbandAdd'
import ApiHome from '../../../api/apiHome'
import Utils from '../../../utils/utils'
import store from "../../../store";

export default {
  name: 'broadPublic',
  computed: {
    staffId() {
      if (sessionStorage.getItem('staffId')) {
        return sessionStorage.getItem('staffId')
      } else {
        return ''
      }
    },
    addressCity() {
      if (sessionStorage.getItem('address')) {
        let add = JSON.parse(sessionStorage.getItem('address'))
        return add.areaname
      } else {
        return '请选择城市'
      }
    },
    token() {
      if (sessionStorage.getItem('tokenId')) {
        return sessionStorage.getItem('tokenId')
      } else {
        return ''
      }
    },
  },
  data() {
    return {
      showFocus: false,
      addrData: '',
      htmlCity: {},
      showAddressList: false,
      showAddress: false,
      timeData: moment(new Date()).format("HH:mm"), //时间格式
      showTime: false, //时间弹窗
      showDate: false, //日期弹窗
      htmlData: {}, //三户信息
      rzShow: false,
      loginFlag: false,
      serialNumber: '', //手机号
      checkNumber: '', //验证码
      dialogShow: false, //弹窗显示
      showCheckNumber: true, //验证码显示按钮
      showProduct: false,  //商品信息展示
      showUserInfoImg: true,
      datas: {},  //所有信息
      checkMiao: 60, //验证码时间
      addressList: '', //对应客户地市
      productselect: [], //商品信息
      moneyTotal: 0, //金额
      productData: {}, //选中商品信息
      linkTel: '',  //联系手机号
      appointmentTime: '', //预约日期
      time: '',  //预约时间
      address: '', //地址选中信息
      kdAddress: '', //详细地址
    }
  },
  components: {},
  watch: {},
  mounted() {
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    window.onresize = () => {
      let nowClientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      if (clientHeight - nowClientHeight > 60) {//因为ios有自带的底部高度
        //键盘弹出的事件处理
        this.showFocus = true
      } else {
        //键盘收起的事件处理
        this.showFocus = false
      }
    };
    if (this.token) {
      this.showAddress = false
      this.getTokenId(this.token)
    } else {
      this.showAddress = true
      this.login()
    }
  },
  methods: {
    getTokenId(token) {
      this.loadingStart("页面初始化,请稍等……")
      let api = new ApiHome()
      api.qrcodeSelectTokenId(token).then(res => {
        if (res.data.msgFlag == '0') {
          store.commit('updataTokenJson', res.data.resultJson[0])
          store.commit('updataStaffId', res.data.resultJson[0].staffId)
          store.commit('updataClassId', res.data.resultJson[0].classId)
          sessionStorage.setItem('staffId', res.data.resultJson[0].staffId)
          sessionStorage.setItem('classId', res.data.resultJson[0].classId)
          sessionStorage.setItem('tokenJson', JSON.stringify(res.data.resultJson[0]))
          this.login()
        } else {
          alert(res.data.errmsg)
          return
        }
      })
    },
    // 重新获取城市工号
    goAddress() {
      this.$router.push('/getStaff2')
    },
    //工号登录
    login() {
      this.loadingStart("页面初始化,请稍等……")
      let par = {}
      par.staffId = this.staffId
      let api = new Api()
      api.init(par).then(resultData => {
          let msgFlag = resultData.data.msgFlag;
          if (msgFlag == "0") {
            console.log("登录成功！")
            this.getProvcityarea(resultData.data.staffInfo.eparchyName);
          } else {
            this.dialogUp(resultData.data.errmsg);
          }
        }
      ).catch(error => {
        this.dialogUp(error);
      })
    },
    //获取验证码
    getCheckNumber() {
      if (!(/^1[3456789]\d{9}$/.test(this.serialNumber)) && this.serialNumber.length != 11) {
        this.$toast("请输入正确手机号码!")
        return
      }
      let api = new Api();
      this.showCheckNumber = false  // 60秒   开关
      let setTime = setInterval(() => {
        this.checkMiao--
        if (this.checkMiao == 0) {
          this.showCheckNumber = true
          this.checkMiao = 60
          clearInterval(setTime)
        }
      }, 1000);
      api.sendMsg(this.serialNumber).then(res => {
        this.loadingStop()
        if (res.data.msgFlag == 0) {
        } else {
          this.dialogUp(res.data.errmsg)
        }
      }).catch(error => {
        this.dialogUp(error)
      })
    },
    //确定验证码校验
    checkYzmNum() {
      if (!this.checkNumber) {
        this.$toast("请输入验证码！")
        return
      }
      if (!this.serialNumber) {
        this.$toast("请输入手机号！")
        return
      }
      this.loadingStart("正在验证,请稍等……");
      let apis = new Api()
      apis.getRandomNum(this.serialNumber).then(resultData => {
        if (resultData.data.msgFlag == 0) {
          if (this.checkNumber == resultData.data.randomNum) {
            this.resetChooseInfo();
            apis.checkMobileBroadbandNum(this.serialNumber).then(result => {
              this.loadingStop();
              if ("0" != result.data.msgFlag) {
                this.dialogUp("对不起，您的套餐无法办理宽带！")
                this.checkNumber = ''
                console.log("主号码校验失败：" + result.data.errmsg);
                return;
              } else {
                this.rzShow = false
                this.checkYZMResult(result.data, this.serialNumber);
                this.loginFlag = true
                this.checkNumber = ''
                this.serialNumber = ''
              }
            }).catch(error => {
              this.dialogUp(error)
            })
          } else {
            this.$toast("验证码输入错误，请重新输入！")
          }
        } else {
          this.loadingStop();
          this.dialogUp(resultData.data.errmsg)
        }
      }).catch(error => {
        this.loadingStop();
        this.dialogUp(error)
      })
    },
    //关闭弹出窗口
    closeNum() {
      this.serialNumber = ''
      this.rzShow = false
      this.checkNumber = ''
    },
    //客户信息
    checkYZMResult(result, serialNumber) {
      this.htmlData = {
        productName: result.userThreePartInfo.userInfo.productName ? result.userThreePartInfo.userInfo.productName : '',
        phone: serialNumber,
        custName: Utils.cardEncrypt(result.userThreePartInfo.custInfo.custName, "custName") ? Utils.cardEncrypt(result.userThreePartInfo.custInfo.custName, "custName") : '无',
        certCode: Utils.cardEncrypt(result.userThreePartInfo.custInfo.certCode, "certCode") ? Utils.cardEncrypt(result.userThreePartInfo.custInfo.certCode, "certCode") : '无'
      }
      let userThreePartInfo = result.userThreePartInfo;//三户信息
      this.datas.mainNumber = serialNumber;
      this.datas.certCode = userThreePartInfo.custInfo.certCode; //身份证号;
      this.datas.custName = userThreePartInfo.custInfo.custName; //姓名
      this.datas.custId = userThreePartInfo.custInfo.custId;
      this.datas.mainUserId = result.userThreePartInfo.userInfo.userId;
      this.datas.userType = "1"; //0 新客户 1 老客户
      this.datas.oldCustInfo = userThreePartInfo.custInfo;
      // 能否纳入融合（装宽带） 1能 0不能
      this.datas.canComp = result.canComp;
      if (result.fkInfo && typeof result.fkInfo != 'undefined') {
        this.datas.fkInfo = result.fkInfo;
      }
      this.datas.hasMainCardTag = result.hasMainCardTag;
      this.datas.viceCount = result.viceCount;  //已经开的副卡数量
      if (result.comInfo.rows && result.comInfo.rows.length > 0) {
        this.datas.productInfos = result.comInfo.rows;
      } else {
        // this.resetChooseInfo();
        this.dialogUp("对不起！您的套餐无法办理宽带!")
        return
      }
      this.showUserInfoImg = false
      this.selectShow();
    },
    //商品信息
    selectShow() {
      for (let i = 0; i < this.datas.productInfos.length; i++) {
        let product = this.datas.productInfos[i];
        let onulist = [];
        let iptvlist = [];
        let iptvTextlist = [];
        let iptvNumlist = [];
        let childInfos = product.qryCoCustInfoRsp.childCoInfo;
        for (let j = 0; j < childInfos.length; j++) {
          let childInfo = childInfos[j];
          if (childInfo.roleId == 6) {
            childInfo.OnuId = childInfo.commId;
            childInfo.OnuName = childInfo.commName;
            onulist.push(childInfo);
          }
          if (childInfo.roleId == 5) {
            childInfo.iptvId = childInfo.commId;
            childInfo.iptvName = childInfo.commName;
            iptvlist.push(childInfo);
          }
          if (childInfo.roleId == 4) {
            childInfo.iptvMonthId = childInfo.commId;
            childInfo.iptvMonthName = childInfo.commName;
            iptvTextlist.push(childInfo);
          }
        }
        let buyLimits = product.buyLimits;
        for (let h = 0; h < buyLimits.length; h++) {
          let buyLimit = buyLimits[h];
          if (buyLimit.roleId == 5) {
            // 默认IPTV只支持一个
            let iptvNum = {};
            iptvNum.iptvNumId = 1;
            iptvNum.iptvNumName = "一个";
            iptvNumlist.push(iptvNum);
          }
        }
        product.onuItems = onulist;
        product.iptvItems = iptvlist;
        product.iptvNumItems = iptvNumlist;
        product.iptvTextlist = iptvTextlist;
        this.productselect.push(product);
      }
      let res = this.productselect
      res.map(item => {
        this.$set(item, 'action', false)
        item.iptvItems.map(itemIptv => {
          this.$set(itemIptv, 'action', false)
        })
      })
      this.productselect = res
      this.showUserInfoImg = false
      this.showProduct = true
    },
    //商品选择
    checkProduct(data, onuItemsData, iptvData, iptvNumItemsData) {
      this.productselect.map(item => {
        this.$set(item, 'action', false)
        item.iptvItems.map(itemIptv => {
          if (iptvData.action != itemIptv.action) {
            this.$set(itemIptv, 'action', false)
          }
        })
      })
      this.$set(data, 'action', true)
      let json = {}
      json.data = data;
      let offerTypeCode = data.offerTypeCode;
      let onuItems = data.onuItems;
      json.getActivityPolicyId = data.policyId;
      console.log("机顶盒选中", iptvData.action)
      if (iptvData.action) {
        json.data.iptvValue = iptvData.policyId;
        json.data.iptvSumValue = iptvNumItemsData.iptvNumId;
      } else {
        json.data.iptvValue = "";
        json.data.iptvSumValue = "";
      }
      json.data.onuValue = onuItemsData.policyId;
      if (offerTypeCode == '214' && onuItems && typeof onuItems != 'undefined' && onuItems.length != 0) {
        if (json.data.onuValue == '' || json.data.onuValue == undefined) {
          this.dialogUp("请选择一个ONU设备来源！")
          return;
        }
      }
      this.sumbitselect(json)
    },
    // 机顶盒选择
    changeCheckbox(data) {
      this.productselect.map(item => {
        this.$set(item, 'action', false)
        item.iptvItems.map(itemIptv => {
          if (data.action != itemIptv.action) {
            this.$set(itemIptv, 'action', false)
          }
        })
      })
      if (data.action) {
        data.action = false
      } else {
        data.action = true
      }
    },
    // 商品选中确认
    sumbitselect(result) {
      if (result) {
        let resultData = result.data;
        this.datas.rhProductInfo = resultData;
        this.datas.getActivityPolicyId = resultData.policyId;
        let offerTypeCode = resultData.offerTypeCode;
        let buyLimits = resultData.buyLimits;
        // 移网能添加副卡数量
        let onlySecond = 0;
        // 融合能添加副卡数量
        let mixSecond = 0;
        // 已开副卡数量
        let viceCount = parseInt(this.datas.viceCount);
        let canComp = this.datas.canComp;
        for (let i = 0; i < buyLimits.length; i++) {
          let buyLimit = buyLimits[i];
          if (buyLimit.roleId == '1') {
            let mixMode = buyLimit.mixMode;
            if (mixMode == 0) {
              onlySecond = parseInt(buyLimit.maxNum) - viceCount;
            } else if (mixMode == 1) {
              mixSecond = parseInt(buyLimit.maxNum) - viceCount;
            }
          }
        }
        this.datas.onlySecond = onlySecond;
        this.datas.mixSecond = mixSecond;
        if (canComp == 0) {
          this.dialogUp("您输入的号码已经存在宽带订单！")
          return;
        }
        this.productData = resultData;
        // 融合展示宽带
        if ((offerTypeCode == '211' || offerTypeCode == '214') && canComp == 1) {
          this.datas.ACCESS_TYPE = 'A13';
          this.moneyTotal = this.getProductFee()
          this.userinfo2identityInfo()
        } else {
          this.dialogUp("已经存在宽带，无法继续办理！")
          this.resetBroadBandInfo();
          this.moneyTotal = this.getProductFee()
        }
      }
    },
    //产品费用（宽带产品费用）
    getProductFee() {
      let productFee = 0;
      let splitFee = 0;
      let childCoInfos = this.productData.qryCoCustInfoRsp.childCoInfo;
      if (typeof childCoInfos != 'string' && childCoInfos.length > 0) {
        for (let i = 0; i < childCoInfos.length; i++) {
          let childCoInfo = childCoInfos[i];
          if (childCoInfo.roleId == 3) {
            splitFee = parseInt(childCoInfo.commPrice);
          }
        }
      }
      let broadBandPackageFee = parseInt(splitFee) / 100;
      productFee = broadBandPackageFee + this.getPackageFee();
      return productFee;
    },
    //宽带套餐费用（onu费用+iptv设备费用+iptv产品费用）
    getPackageFee() {
      let packageFee = 0;
      if (this.productData) {
        let rhProductInfo = this.productData;
        // 获取onu费用
        let onuPrice = this.getOnuPrice(rhProductInfo.onuValue, rhProductInfo.onuItems);
        let iptvId = rhProductInfo.iptvValue;  //iptvId
        if (iptvId) {
          // iptv设备费用
          let iptvPrice = this.getIptvPrice(iptvId, rhProductInfo.iptvItems);
          // iptv产品费用
          let iptvDisncnt = 0;
          // iptv数量
          let iptvNum = rhProductInfo.iptvSumValue;
          if (parseInt(iptvNum) > 0) {
            let childInfo = rhProductInfo.qryCoCustInfoRsp.childCoInfo;
            for (let i = 0; i < childInfo.length; i++) {
              let iptvDisncntItem = childInfo[i];
              if (iptvDisncntItem.roleId == 4) {
                iptvDisncnt = parseInt(iptvDisncntItem.commPrice) / 100;
              }
            }
          }
          packageFee = packageFee + iptvPrice * iptvNum + onuPrice + iptvDisncnt;
        } else {
          packageFee = packageFee + onuPrice;
        }
      }
      return parseInt(packageFee);
    },
    // 获取uno费用
    getOnuPrice(onuId, onuItems) {
      let onuPrice = 0;
      if (typeof onuItems != 'string' && onuItems.length > 0) {
        for (let i = 0; i < onuItems.length; i++) {
          let onuItem = onuItems[i];
          let OnuId = onuItem.OnuId;
          //0 主卡 1副卡 2融合主套餐 3宽带 4IPTV 5机顶盒 6ONU光猫
          if (onuId == OnuId) {
            onuPrice = onuItem.commPrice;
          }
        }
      }
      return parseInt(onuPrice) / 100;
    },
    // 获取iptv设备费用
    getIptvPrice(iptvId, iptvItems) {
      let iptvPrice = 0;
      if (typeof iptvItems != 'string' && iptvItems.length > 0) {
        for (let i = 0; i < iptvItems.length; i++) {
          let iptvItem = iptvItems[i];
          let IptvId = iptvItem.iptvId;
          //0 主卡 1副卡 2融合主套餐 3宽带 4IPTV 5机顶盒 6ONU光猫
          if (iptvId == IptvId) {
            iptvPrice = iptvItem.commPrice;
          }
        }
      }
      return parseInt(iptvPrice) / 100;
    },
    //获取全部地址
    getProvcityarea(cityName) {
      let apis = new Api();
      apis.qryQRCodeAddress().then(resultData => {
        this.loadingStop()
        let jsonArray = {};
        let pareanamejsonArr = [];
        let areanamejsonArr = [];
        let countynamejsonArr = [];
        let address = [];
        if (resultData.data.msgFlag == 0) {
          let jsonData = resultData.data.resultJson;
          jsonData.forEach((item, index) => {
            if (item.areaLevel == 1) {
              pareanamejsonArr.push(item);
            }
            if (item.areaLevel == 2) {
              areanamejsonArr.push(item);
            }
            if (item.areaLevel == 3) {
              countynamejsonArr.push(item);
            }
          })
          jsonArray.provinces = pareanamejsonArr;
          jsonArray.citys = areanamejsonArr;
          jsonArray.areas = countynamejsonArr;
          jsonArray.areas.forEach((item, index) => {
            if (item.cityName == cityName) {
              address.push(item);
              this.htmlCity = {
                provinceName: item.provinceName,
                cityName: item.cityName,
                name: '区/县'
              }
            }
          })
          this.addressList = address
        } else {
          this.dialogUp("地址查询错误！")
        }
      }).catch(error => {
        this.dialogUp(error)
      })
    },
    //获取userinfo 和 identityInfo 和 custId 和 productInfos
    userinfo2identityInfo() {
      this.datas.customerInfo = this.datas.oldCustInfo;
      let identityInfo = {};
      identityInfo.pic1 = "";
      identityInfo.pic2 = "";
      identityInfo.pic7 = "";
      identityInfo.pic6 = "";
      identityInfo.pic5 = "";
      identityInfo.avatar = "";
      identityInfo.ethnicity = "";
      identityInfo.cardNo = this.datas.customerInfo.certCode;
      identityInfo.authority = this.datas.customerInfo.certAddr;
      identityInfo.birth = Utils.birth(this.datas.customerInfo.certCode);
      identityInfo.sex = Utils.Getsex(this.datas.customerInfo.certCode);
      identityInfo.address = this.datas.customerInfo.certAddr;
      identityInfo.name = this.datas.customerInfo.custName;
      if (this.datas.customerInfo.certEndDate) {
        identityInfo.period = this.datas.customerInfo.certEndDate.substring(0, 8);
      } else {
        identityInfo.period = "20501230";
      }
      this.datas.custId = this.datas.customerInfo.custId;
      this.datas.identityInfo = identityInfo;
    },
    //下单
    payFee() {
      if (!(/^1[123456789]\d{9}$/.test(this.linkTel))) {
        this.dialogUp("请输入有效的联系人电话！")
        return;
      }
      if (!this.appointmentTime) {
        this.dialogUp("请选择预约日期！")
        return;
      }
      if (!this.time) {
        this.dialogUp("请选择预约时间！")
        return;
      }
      if (!this.address) {
        this.dialogUp("请选择安装地址！")
        return;
      }
      if (!this.kdAddress) {
        this.dialogUp("请填写详细地址！")
        return;
      }
      if (!this.datas.rhProductInfo) {
        this.dialogUp("请选择对应的商品！")
        return;
      }
      let kdAddInfo = this.datas.kdAddInfo;
      kdAddInfo.linkTel = this.linkTel;
      kdAddInfo.kdYyFlag = "1";
      kdAddInfo.kdYyTime = this.appointmentTime + " " + this.time + ":00";
      kdAddInfo.isInstrallAddress = "0";
      kdAddInfo.kdAddress = this.kdAddress;
      kdAddInfo.IOM_STAFF_ID = "";
      kdAddInfo.areaExchId = "";
      kdAddInfo.kdRemark = "";
      kdAddInfo.addrEx = "";
      kdAddInfo.linkMan = "";
      this.datas.tcfeeVerify = "0";
      this.datas.tcfee = 0;
      this.datas.kdAddInfo = kdAddInfo;
      this.datas.totalFee = this.moneyTotal;
      this.datas.productInfo = this.productData;
      this.datas.shigongzhongshoufei = "1";
      let param = {};
      param.data = this.datas;
      param.data.productInfos.map(item => {
        delete item.action;
        item.iptvItems.map(item2 => {
          delete item2.action;
        })
      })
      param = JSON.stringify(param.data)
      this.loadingStart("正在提交订单,请稍等……");
      let api = new Api()
      api.submitFuseInto(param).then(resultData => {
        this.loadingStop();
        if (typeof resultData.data == 'object') {
          if (resultData.data.msgFlag == '0') {
            let orderData = {
              orderId: resultData.data.resultJson.orderId,
              successFlag: '1'
            }
            this.$store.commit('updataOrderData', orderData)
            this.$router.push('/orderSuccess')
          } else {
            let orderData = {
              successFlag: '0'
            }
            this.$store.commit('updataOrderData', orderData)
            this.$router.push('/orderSuccess')
          }
        } else {
          let orderData = {
            successFlag: '0'
          }
          this.$store.commit('updataOrderData', orderData)
          this.$router.push('/orderSuccess')
        }
      }).catch(error => {
        let orderData = {
          successFlag: '0'
        }
        this.$store.commit('updataOrderData', orderData)
        this.$router.push('/orderSuccess')
      })
    },
    // 重置宽带信息
    resetBroadBandInfo() {
      this.productselect = []
      this.showUserInfoImg = true;
      // delete this.datas.kdAddInfo;
      this.datas.tcfee = 0;
    },
    //重置选择信息
    resetChooseInfo() {
      this.loginFlag = false
      this.resetBroadBandInfo();
      this.htmlData = {}
      this.linkTel = ''
      this.appointmentTime = ''
      this.time = ''
      this.address = ''
      this.kdAddress = ''
      this.addrData = ''
      this.htmlCity.name = '区/县'
      delete this.datas.kdAddInfo;
      delete this.datas.productInfos;
      delete this.datas.customerInfo;
      delete this.datas.mainNumber;
      this.moneyTotal = 0;
      this.showUserInfoImg = true
    },
    onClickAdress(addr) {
      this.htmlCity.name = addr.name
      this.addrData = addr
    },
    checkConfirm() {
      let addr = this.addrData
      if (!addr) {
        this.$toast("请选择完整市区！")
        return
      }
      let param = {}
      param.provinceCode = addr.provinceCode;
      param.cityCode = addr.cityCode;
      param.countyCode = addr.code;
      this.loadingStart("正在获取数据。。")
      let api = new Api();
      api.mofficeId(param).then(result => {
        this.loadingStop();
        if ("0" != result.data.msgFlag) {
          this.dialogUp("获取调测地址出错：" + result.data.errmsg)
          return
        } else {
          let moffice = result.data.resultJson;
          let addInfoDatas = {};
          addInfoDatas.mofficeName = "";
          addInfoDatas.mofficeId = moffice.exchCode;
          addInfoDatas.cityCode = moffice.cityCode;
          addInfoDatas.serviceCode = "";
          addInfoDatas.instrallAddress = "";
          addInfoDatas.addressId = "";
          let kdAddInfo = {};
          kdAddInfo.addInfo = addInfoDatas;
          this.datas.kdAddInfo = kdAddInfo;
          this.address = addr.provinceName + '-' + addr.cityName + '-' + addr.name
          this.showAddressList = false
        }
      }).catch(error => {
        this.dialogUp(error)
      })
    },
    onConfirm(date) { // 日期选择  确定
      this.showDate = false;
      this.appointmentTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    onConfirm2(time) {  // 时间选择  确定
      this.showTime = false
      this.time = time
    },
    checkSignOut() {  //退出登录
      this.$router.go(0);
    },
    //商品展示图标
    checkUserInfoImg() {
      if (this.showUserInfoImg) {
        this.showProduct = true
      } else {
        this.showProduct = false
      }
      this.showUserInfoImg = !this.showUserInfoImg
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
    dialogUp(tips) {
      this.$dialog.alert({
        title: '提示',
        message: tips,
        confirmButtonColor: '#3f80f7'
      }).then(() => {
      });
    }
  }
}
</script>

<style lang="scss" scoped>
#broadPublic {
  margin-bottom: 80px;
  box-sizing: border-box;
  width: 100%;
  background-color: #f2f2f2;

  .renzheng {
    background-color: #588EF1;
    margin-bottom: 10px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;

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

  .renzheng:after {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0px;
    content: "";
    z-index: 1;
    height: 5vh;
    width: 100%;
    border-radius: 50% 50% 0 0;
    background: #fff;
  }

  footer {
    background: white;
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  footer .btn {
    margin: 10px 20px;
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
}

.focusState {
  position: absolute;
}

.active {
  background: #b0c4de;
  color: #3f80f7;
}

.content_addr {
  padding: 5px 0;
  height: 100%;
  box-sizing: border-box;

  .addr_cont_title {
    display: flex;
    height: 2rem;
    border-bottom: 1px solid #ccc;
    align-items: center;

    .addr_cont_item {
      flex: 1;
      text-align: center;
    }
  }

  .addr_cont {
    display: flex;
    margin-top: 10px;
    height: 70%;

    .addr_cont_item {
      padding-bottom: 10px;
      flex: 1;
      overflow: scroll;
      text-align: center;

      .province {
        height: 2rem;
        width: 90%;
        line-height: 2rem;
        margin: auto;
        border-radius: 8px;
      }
    }
  }

  .confirm {
    margin-top: 10px;
    padding: 10px 0;
    text-align: center;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;

    .confirmOn {
      width: 90%;
      line-height: 2.5rem;
      border: 1px solid #3f80f7;
      margin: auto;
      border-radius: 8px;
      background-color: #3f80f7;
      color: white;
    }
  }
}

.van-action-sheet {
  position: fixed;
  bottom: 0;
  height: 50%;
  background-color: white;
  left: 50%;
  transform: translateX(-50%);

  .van-action-sheet__content {
    height: 85%;
  }
}

.mask {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 101;
}

input, select {
  box-sizing: border-box;
  border: solid 1px #3f80f7;
  background: #f2f2f2;
  border-radius: 5px;
  width: 54%;
  height: 36px;
  margin: 5px 10px;
  font-size: 14px;
  padding-left: 10px;
}

h1 {
  font-size: 16px;
  font-weight: bold;
}

h2 {
  font-size: 14px;
  color: red;
  font-weight: normal;
  display: inline;
}

h4 {
  font-weight: normal;
  margin-top: 6px;
  color: red;
  font-size: 14px;
}

h6 {
  font-weight: normal;
  text-align: center;
}

p {
  font-size: 16px;
}

.clearfix {
  clear: both;
}

.content_box {
  background: white;
  border-radius: 5px;
  margin: 10px;
}

.content {
  padding: 10px 0;
  position: relative;
}

.content img {
  margin-left: calc(12% - 31px);
}

.content img, .content input {
  float: left;
}

.anniu {
  font-weight: bold;
  color: white;
  background: #3f80f7;
  width: 22%;
  margin: 5px 0;
  padding: 0;
  font-size: 14px;
}

.content h1 {
  float: left;
  margin: 0 10px;
  line-height: 42px;
}

.zhankai {
  position: absolute;
  top: 31px;
  right: calc(12% - 31px);
  margin-top: -5px;
}

table {
  padding: 0 10px;
}

td {
  padding-top: 10px;
}

td:nth-child(1) {
  width: 25%;
  white-space: nowrap;
}

.shangpin {
  background: #f7f8fa;
  border-radius: 6px;
  margin: 10px;
  margin-bottom: 0;
}

td input, td select {
  width: 100%;
  margin: 0;
}

td h2 {
  line-height: 36px;
  margin-left: 10px;
}

footer h1 {
  float: left;
}

@media(max-width: 320px) {
  footer h1 {
    font-size: 15px;
  }
  span {
    font-size: 16px;
  }
  input {
    font-size: 12px;
  }
  h4 {
    font-size: 12px;
  }
  td {
    font-size: 15px;
  }
  botton {
    font-size: 15px;
  }
}
</style>
