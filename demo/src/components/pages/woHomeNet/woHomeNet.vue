<template>
  <div class="intention">
    <div class="content">
      <div class="cont">
        <div class="content_title">
          <div class="title">
            沃家组网-新
          </div>
          <div class="title_staff" v-if="tokenAddr" @click="clearSess()">
            选择受理城市
          </div>
        </div>
        <!-- 产品信息 -->
        <div class="content_items">
          <div class="item1">
            选择服务
          </div>
          <div class="item2">
            <div><input type="text" readonly onfocus="this.blur()" :value='productSelect.policyName'
                        @click="onSelectPro()"
                        placeholder="请选择服务"></div>
            <van-action-sheet v-model="chooseProduct" title="选择服务">
              <div class="content_addr">
                <div class="addr_cont">
                  <div class="addr_cont_item">
                    <div class="province" v-for="(item, index) in productList"
                         :class="{active : active1 == item.policyName}" :key="index" @click="onSelectClickPro(item)">
                      {{item.policyName}}
                    </div>
                  </div>
                </div>
                <div class="confirm">
                  <div class="confirmOn" @click="secConfirmPro">
                    确定
                  </div>
                </div>
              </div>
            </van-action-sheet>
          </div>
        </div>
        <!-- 优惠券号 -->
        <div class="content_items" v-if="displayFlag12">
          <div class="item1">
            优惠券号
          </div>
          <div class="item2">
            <input type="text" :disabled="disabled" v-model='couponTel' placeholder="请输入优惠券业务号码">
          </div>
        </div>
        <!-- 优惠券码 -->
        <div class="content_items" v-if="displayFlag12">
          <div class="item1">
            优惠券码
          </div>
          <div class="item2">
            <van-field
              v-model='couponCode'
              placeholder="请输入优惠券码"
              :disabled="disabled"
            >
              <van-button slot="button" size="small" class="small_btn" @click="checkCoupon">校&emsp;验</van-button>
            </van-field>
          </div>
        </div>
        <!-- 选址方式 -->
        <div class="content_items">
          <div class="item1">
            选址方式
          </div>
          <div class="item2">
            <div><input type="text" readonly onfocus="this.blur()" :value='typeSelect.name' @click="onSelectType()"
                        placeholder="请选择选址方式"></div>
            <van-action-sheet v-model="chooseType" title="选址方式">
              <div class="content_addr">
                <div class="addr_cont">
                  <div class="addr_cont_item">
                    <div class="province" v-for="(item, index) in typeList"
                         :class="{active : active2 == item.name}" :key="index" @click="onSelectClickType(item)">
                      {{item.name }}
                    </div>
                  </div>
                </div>
                <div class="confirm">
                  <div class="confirmOn" @click="secConfirmType">
                    确定
                  </div>
                </div>
              </div>
            </van-action-sheet>
          </div>
        </div>
        <!-- 业务号码 -->
        <div class="content_items" v-if="displayFlag10">
          <div class="item1">
            业务号码
          </div>
          <div class="item2">
            <van-field
              v-model='account'
              placeholder="请输入业务号码"
            >
              <van-button slot="button" size="small" class="small_btn" @click="queryAccount">查&emsp;询</van-button>
            </van-field>
          </div>
        </div>
        <!-- 证件姓名 -->
        <div class="content_items">
          <div class="item1">
            证件姓名
          </div>
          <div class="item2">
            <input type="text" v-model='custName' placeholder="请输入证件姓名">
          </div>
        </div>
        <!-- 证件号码 -->
        <div class="content_items">
          <div class="item1">
            证件号码
          </div>
          <div class="item2">
            <div><input type="text" v-model='psptId' placeholder="请输入证件号码"></div>
          </div>
        </div>
        <!-- 详细地址 -->
        <div class="content_items" v-if="displayFlag13">
          <div class="item1">
            详细地址
          </div>
          <div class="item2">
            <div><input type="text" v-model='address1' placeholder="请输入详细的地址"></div>
          </div>
        </div>
        <!-- 区县地址 -->
        <div class="content_items" v-if="displayFlag11">
          <div class="item1">
            区县地址
          </div>
          <div class="item2">
            <address-comm-2 @getAddress='getAddress'/>

          </div>
        </div>
        <!-- 详细地址 -->
        <div class="content_items" v-if="displayFlag11">
          <div class="item1">
            详细地址
          </div>
          <div class="item2">
            <div><input type="text" v-model='address' placeholder="请输入详细优化WIFI的地址"></div>
          </div>
        </div>
        <!-- 联系电话 -->
        <div class="content_items">
          <div class="item1">
            联系电话
          </div>
          <div class="item2">
            <div><input type="text" v-model='phone' placeholder="请输入联系电话"></div>
          </div>
        </div>
        <!-- 预约日期 -->
        <div class="content_items">
          <div class="item1">
            预约时间
          </div>
          <div class="item2">
            <van-cell
              :value="appointmentTime"
              @click="showPopup"/>
            <van-popup v-model="showDate" position="bottom">
              <van-datetime-picker
                type="date"
                v-model="currentDate"
                title="选择时间"
                :loading="isLoadingShow"
                :max-date="maxDate"
                :formatter="formatter"
                @cancel="showDate = false"
                @confirm="confirmPicker"
              />
            </van-popup>
          </div>
        </div>
        <!-- 备注 -->
        <div class="content_items">
          <div class="item1">
            备注
          </div>
          <div class="item2">
            <div><input type="text" v-model='remark' placeholder="备注内容"></div>
          </div>
        </div>
        <div class="button">
          <div class="btn" @click="clickNext">
            下一步
          </div>
        </div>
      </div>
      <!--<payInfo v-if="payShow" @checkFlag='checkFlag' :orderParameter='payInfo'/>-->
    </div>
    <Loading :showZzc="showZzc"/>
  </div>
</template>

<script>
  import Api from '../../../api/apiWoHomeNet'
  import Loading from '../../common/loading'
  //import payInfo from '../../common/payInfo1';
  import AddressComm2 from '../../common/addressComm2.vue'
  import store from "../../../store";

  export default {
    name: "woHomeNet",
    components: {
      AddressComm2,
      Loading,
      //payInfo,
    },
    created: function () {
      this.showChooseCity();
      this.getInfo();
      this.login();
    },
    computed: {
      menuId() {
        if (sessionStorage.getItem('menuId')) {
          return sessionStorage.getItem('menuId')
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
    },
    watch: {
      serialNumber(val) {
        if (val == '' || !(/^1[3456789]\d{9}$/.test(val)) || val.length != 11) {
          this.phoneShow = true
        } else {
          this.phoneShow = false
        }
      },
    },
    props: {
      disabled: {
        default: false
      }
    },
    data() {
      return {
        showZzc: false, //加载框
        payShow: false, // 支付
        tokenAddr: true,
        payInfo: {},

        //  配置  项
        displayFlag10: false,
        displayFlag11: true,
        displayFlag12: false,
        displayFlag13: false,
        displayFlag14: false,
        displayFlag15: false,

        //  预约时间
        showDate: false,
        maxDate: new Date(2020, 12, 31),
        currentDate: new Date(),  // 时间选择框默认值
        isLoadingShow: true,  // 时间选择  开关

        appointmentTime: '请选择时间', //  14  "预约时间"
        couponTel: '',    //优惠券号
        couponCode: '',   //优惠券码
        account: '',      //业务号码
        psptId: '',       //证件号码
        custName: '',     //证件姓名
        address: '',      //详细地址
        address1: '',
        phone: '',        //联系电话
        remark: '',       //备注信息
        addrData: {},     //区县地市
        addr: {},
        price: '',
        active: '',
        active1: '',
        active2: '',
        staffId: '',
        isCoupon: false,  //是否使用优惠券,true使用 false:不使用
        couponFlag: false, //使用优惠券是否校验成功,true成功 false:未成功
        param: {},        //下单信息
        datas: {},        //支付数据
        productInfo: {},
        productSelect: '',
        typeSelect: '',
        productList: [],  //商品列表
        chooseType: false,//选址方式
        chooseProduct: false,
        typeList: [{value: '0', name: "传统宽带选址"}, {value: '1', name: "按业务号码选址"}],

      }
    },

    methods: {
      //判断是否展示选择地市按钮
      showChooseCity() {
        if (!sessionStorage.getItem('token'))
          this.tokenAddr = false;
      },
      //区县地址
      getAddress(json) {
        this.addrData = JSON.parse(JSON.stringify(json))
      },
      clearSess() {
        if (sessionStorage.getItem('staffId')) {
          this.$dialog.alert({
            message: '是否重新选择受理城市？',
            showCancelButton: true
          }).then(() => {
            sessionStorage.removeItem('staffId')
            this.$router.push('/getStaff2')
          }).catch(() => {

          })
        }
      },

      /**
       * 登录
       */
      login(serialNumber) {
        let par = {
          "staffId": this.staffId
        };
        //判断number是否是手机号，如果是手机号，直接显示到mainNumber里面，如果不是手机号需要手动输入
        if (serialNumber) {
          par.serialNumber = serialNumber;
        } else if (!this.staffId || typeof this.staffId == 'undefined') {
          return;
        }
        let api = new Api();
        api.login(par).then(res => {
          let msgFlag = res.data.msgFlag;
          if (msgFlag == "0") {
            console.log("登录成功！")
            if (serialNumber && typeof serialNumber != 'undefined') {
              this.getInfo(true);
              api.checkNum(serialNumber).then(res => {
                if ("0" != res.data.msgFlag) {
                  alert("对不起，您的套餐无法办理宽带！");
                  console.log("主号码校验失败：" + res.data.errmsg);
                  return;
                }
              })
            }
          } else {
            alert(res.data.errmsg);
          }
        });
      },

      /**
       * 获取商品信息
       * @param commId
       */
      getInfo(ignoreStaffId) {
        if (this.token) {
          let api = new Api()
          api.qrcodeSelectTokenId(this.token).then(res => {
            if (res.data.msgFlag == '0') {
              let classId = res.data.resultJson[0].classId
              this.staffId = res.data.resultJson[0].staffId
              store.commit('updataTokenJson', res.data.resultJson[0])
              store.commit('updataStaffId', res.data.resultJson[0].staffId)
              store.commit('updataClassId', res.data.resultJson[0].classId)
              sessionStorage.setItem('staffId', res.data.resultJson[0].staffId)
              sessionStorage.setItem('classId', res.data.resultJson[0].classId)
              sessionStorage.setItem('tokenJson', JSON.stringify(res.data.resultJson[0]))
              this.getinfoData()
            } else {
              alert(res.data.errmsg)
              return
            }
          })

        } else {
          let staffId = sessionStorage.getItem('staffId')
          this.staffId = staffId;
          if (!ignoreStaffId && (staffId == "" || staffId == undefined)) {
            alert("二维码无效！");
            return;
          }
          this.getinfoData()
        }
      },

      getinfoData() {
        this.showZzc = true;
        let api = new Api();
        api.qryProductInfo(this.staffId).then(res => {
          this.showZzc = false;
          let msgFlag = res.data.msgFlag;
          let resultJson = res.data.resultJson;
          if (msgFlag == "0") {
            //画商品列表
            let rows = resultJson.rows.rows;
            if (rows.length <= 0) {
              alert("该工号" + this.staffId + "没有配置商品信息");
              return;
            }
            this.$set(this.productInfo, 'cityName', resultJson.cityName);
            this.$set(this.productInfo, 'cityCode', resultJson.cityCode);
            this.productList = rows;
            //默认选择第一个
            this.productSelect = this.productList[0];
            this.typeSelect = this.typeList[0];
            this.changeProduct()
          } else {
            alert(res.data.errmsg);
          }
        });
      },

      /*
      * 添加手动选择服务类型
      * */
      changeProduct() {
        let product = this.productSelect;
        let qryCoCustInfoRsp = product.qryCoCustInfoRsp;
        if (qryCoCustInfoRsp == undefined) {
          alert("该商品" + product.policyId + "未配置子商品信息！");
          this.productSelect = '';
        } else {
          let productName = product.policyName;
          let productId = product.policyId;
          let childCoInfo = qryCoCustInfoRsp.childCoInfo;
          let productList = [];
          for (var j = 0; j < childCoInfo.length; j++) {
            let child = childCoInfo[j];
            let childing = child;
            let childName = child.policyName;
            let policyId = child.policyId;
            childing.parentProductName = productName;
            childing.parentProductId = productId;
            childing = JSON.stringify(childing);
            let commPrice = child.commPrice;
            let roleId = child.roleId;
            productList.push(childing);
            if (0 == roleId) {
              this.$set(this.productInfo, 'roleId', 0);
            }
          }
          this.$set(this.productInfo, "productList", JSON.stringify(productList));

          //画页面
          if (0 != this.productInfo.roleId) {
            alert("该商品" + product.policyId + "未配置主产品");
            return;
          }
          let sum = 0;
          productList.map(item => {
            let it = JSON.parse(item);
            productName = it.parentProductName;
            productId = it.parentProductId;
            sum += parseInt(it.commPrice);
          })
          this.price = sum / 100;
          this.$set(this.param, 'productName', productName);
          this.$set(this.param, 'productId', productId);
          this.$set(this.param, 'totalFee', sum);
          this.$set(this.productInfo, 'productName', productName);
          this.$set(this.productInfo, 'productId', productId);
          this.$set(this.productInfo, 'totalFee', sum);
          this.$set(this.param, 'productInfo', JSON.stringify(this.productInfo));
          //判断是否展示优惠券输入框
          if (product.commLabel) {
            let labels = product.commLabel
            if (labels.length > 0) {
              let label = product.commLabel[0]
              if (label.labelId == '2020042801134062') {
                this.displayFlag12 = true;
                this.isCoupon = true;
                return
              }
            }
          }
          this.displayFlag12 = false;
          this.isCoupon = false
        }
      },

      /*
	    * 校验优惠码
	    * */
      checkCoupon() {
        if (this.couponFlag) {
          alert('您已查询成功!请继续填写相关信息!')
          return
        }
        let params = {};
        params.serialNumber = this.couponTel;
        params.couponCode = this.couponCode;
        params.couponType = 1;
        let api = new Api();
        api.checkCoupon(params).then(res => {
          if ('0' == res.data.msgFlag) {
            alert('查询成功!');
            this.disabled = true;
            this.couponFlag = true;
          } else {
            alert('请确认业务号码或优惠码是否正确!')
          }
        })
      },

      /**
       * 搜索业务号码
       */
      queryAccount() {
        let account = this.account.trim();
        if (account == "") {
          alert('请输入业务号码')
          this.account = '';
          return
        }
        if (account.startsWith("1")) {
          alert('请输入宽带/固话号码')
          this.account = '';
          return
        }
        this.showZzc = true;
        let staffId = this.staffId;
        if (!staffId || typeof staffId == 'undefined') {
          this.login(account);
        } else {
          this.doQueryAccount(account);
        }

      },

      doQueryAccount(account) {
        let data = {};
        data.serialNumber = account;
        let api = new Api();
        api.qryAddress(data).then(res => {
          this.showZzc = false;
          if (res.data.msgFlag == '0') {
            let USER_DATA_CHECK_RSP = res.data.resultJson.UNI_BSS_BODY.USER_DATA_CHECK_RSP;
            let custInfo = USER_DATA_CHECK_RSP.custInfo;
            let userInfo = USER_DATA_CHECK_RSP.userInfo;
            this.custName = custInfo.custName;
            this.psptId = custInfo.certCode;
            let info = userInfo.resourceInfo[0];
            //拼地址
            this.address1 = info.installAddr;
            this.$set(this.param, 'info_addrCode', info.addrCode);
            this.$set(this.param, 'info_installAddr', info.installAddr);
            this.$set(this.param, 'info_cityCode', info.cityCode);
            this.$set(this.param, 'info_addrName', info.addrName);
            this.$set(this.param, 'info_exchCode', info.exchCode);
            this.$set(this.param, 'info_addr', custInfo.certAddr);
          } else {
            alert('获取号码信息失败,请检查业务号码是否正确!')
          }
        });
      },

      //下一步
      clickNext() {
        //证件姓名：
        let custName = this.custName;
        //证件号：
        let psptId = this.psptId;
        //联系方式：
        let phone = this.phone.trim();
        //装机地址：
        let addrData = this.addrData;
        //详细地址：
        let address = this.address;
        if (this.typeSelect == 1) {
          address = this.address1;
        }
        //预约装机时间：
        let appointmentTime = this.appointmentTime;
        //备注
        this.$set(this.param, 'remark', this.remark);

        //列表选址
        let provinceCode = addrData.provinceCode;
        let cityCode = addrData.cityCode;
        let code = addrData.areaid;
        let provinceName = addrData.provinceName;
        let cityName = addrData.cityName;
        let name = addrData.areaName;

        this.$set(this.addr, "provinceCode", provinceCode);
        this.$set(this.addr, "provinceName", provinceName);
        this.$set(this.addr, "cityCode", cityCode);
        this.$set(this.addr, "cityName", cityName);
        this.$set(this.addr, "countyCode", code);
        this.$set(this.addr, "countyName", name);


        this.$set(this.param, 'provinceCode', provinceCode);
        this.$set(this.param, 'provinceName', provinceName);
        this.$set(this.param, 'cityCode', cityCode);
        this.$set(this.param, 'cityName', cityName);
        this.$set(this.param, 'countyCode', code);
        this.$set(this.param, 'countyName', name);

        //判断是否使用优惠券
        if (this.isCoupon) {
          if (this.couponFlag) {
            this.$set(this.param, 'couponSerialNumber', this.couponTel);
            this.$set(this.param, 'couponType', 1);
            this.$set(this.param, 'couponCode', this.couponCode);
          } else {
            alert('请先校验优惠券码!');
            return
          }
        }

        if (custName != null && custName != "") {
          this.$set(this.param, 'custName', custName);
        } else {
          alert("请输入姓名");
          return;
        }
        if (psptId != null && psptId != "") {
          var cartIdPattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
          if (!psptId || !cartIdPattern.test(psptId)) {
            alert("身份证格式错误！");
            return;
          }
          this.$set(this.param, 'psptId', psptId);
        } else {
          alert("请输入证件号");
          return;
        }

        if (phone != null && phone != "") {
          var contactPhonePattern = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
          if (!phone || !contactPhonePattern.test(phone)) {
            alert("联系电话格式错误！");
            return;
          }
          this.$set(this.param, 'phone', phone);
        } else {
          alert("请输入联系方式");
          return;
        }
        if (this.addr != null && this.addr != "") {
          this.$set(this.param, 'addr', JSON.stringify(this.addr));
        } else {
          alert("请选择装机地址");
          return;
        }

        if (address != null && address != "") {
          if (!this.checkIsChEnNum(address)) {
            alert("详细地址填写不正确，必须包含中文，不可以包含特殊字符，纯数字,纯英文！");
            return;
          }
          this.$set(this.param, 'address', address);
        } else {
          alert("请输入详细地址");
          return;
        }

        let postAddress = provinceName + cityName + name + this.param.address;
        this.$set(this.param, 'postAddress', postAddress);
        if (appointmentTime != null && appointmentTime != "") {
          this.$set(this.param, 'appointmentTime', appointmentTime);
        } else {
          alert("请选择预约装机时间");
          return;
        }

        let par = {};
        par.name = custName;
        par.cardNo = psptId;
        par.netTypeCode = 50;
        this.showZzc = true;
        let api = new Api();
        api.identityVerify(par).then(res => {
          this.showZzc = false;
          if (res.data.msgFlag != '0') {
            alert("身份校验失败！" + res.data.reason);
          } else {
            //下单
            if (this.typeSelect == 1) {
              this.xiaDan();
              return;
            }
            this.downOrder(this.param);
          }
        });
      },

      //下单
      downOrder(data) {
        this.showZzc = true;
        console.log(data);
        let api = new Api();
        api.downOrder(data).then(res => {
          this.showZzc = false;
          var msgFlag = res.data.msgFlag;
          var resultJson = res.data.resultJson;
          if (msgFlag == "0") {
            let ordersId = resultJson.orderId;
            console.log(ordersId);
            //this.orderPay(ordersId);
            data.ordersId = ordersId;
            //添加开户人姓名和身份证号
            data.custerName = this.custName;
            data.payIdCardNo = this.psptId;
            // 提交成功后。缓存信息
            sessionStorage.setItem('number', this.phone);
            sessionStorage.setItem('productImg', "../../productcss/images/4.png");
            sessionStorage.setItem('acceptTime', this.appointmentTime);
            sessionStorage.setItem('page', "");
            sessionStorage.setItem('token', "");
            sessionStorage.setItem('ms', this.staffId);

            if (this.price * 100 == 0) {
              sessionStorage.setItem('totalFee', "0.0");
            } else {
              sessionStorage.setItem('totalFee', this.price * 100);
            }
            sessionStorage.setItem('ordersId', ordersId);
            sessionStorage.setItem('saleMode', "1");
            sessionStorage.setItem('orderSubMap', JSON.stringify(data));
            sessionStorage.setItem('isComp', "1");
            sessionStorage.setItem('productName', this.param.productName);
            sessionStorage.setItem('productId', this.param.productId);
            sessionStorage.setItem('orderProductInfo', data.productInfo);
            window.location.href = "https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/product/OrderCenter1.html";

          } else {
            alert(res.data.errmsg);
          }
        });
      },

      //type类型为2时的下单接口
      xiaDan() {
        this.$set(this.param, 'address', this.address1);
        this.$set(this.param, 'info_acct', this.account);
        this.showZzc = true;
        let data = this.param;
        let api = new Api();
        api.downOrder(data).then(res => {
          this.showZzc = false;
          var msgFlag = res.data.msgFlag;
          var resultJson = res.data.resultJson;
          if (msgFlag == "0") {
            let ordersId = resultJson.orderId;
            console.log(ordersId);
            //更新session
            let staffId = this.staffId;
            $.ajax({
              url: '../../tgInfo/aotoLogin.json',// 跳转到 action
              data: {
                ms: staffId
              },
              type: 'post',
              cache: false,
              dataType: 'json',
              success: function (resultData) {
                if (resultData.msgFlag == "0") {
                  //this.orderPay(ordersId);
                  data.put("ordersId", ordersId);
                  //添加开户人姓名和身份证号
                  data.put("custerName", this.custName);
                  data.put("payIdCardNo", this.psptId);
                  // 提交成功后。缓存信息
                  sessionStorage.setItem('number', this.phone);
                  sessionStorage.setItem('productImg', "../../productcss/images/4.png");
                  sessionStorage.setItem('acceptTime', this.appointmentTime);
                  sessionStorage.setItem('page', "");
                  sessionStorage.setItem('token', "");
                  sessionStorage.setItem('ms', staffId);

                  if (this.price * 100 == 0) {
                    sessionStorage.setItem('totalFee', "0.0");
                  } else {
                    sessionStorage.setItem('totalFee', this.price * 100);
                  }
                  sessionStorage.setItem('ordersId', ordersId);
                  sessionStorage.setItem('saleMode', "1");
                  sessionStorage.setItem('orderSubMap', JSON.stringify(data));
                  sessionStorage.setItem('isComp', "1");
                  sessionStorage.setItem('productName', this.param.productName);
                  sessionStorage.setItem('productId', this.param.productId);
                  sessionStorage.setItem('orderProductInfo', data.productInfo);

                  window.location.href = "https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/product/OrderCenter1.html";

                } else {
                  alert("用户信息获取失败：" + resultData.reason);
                }
              }
            });
          } else {
            alert(res.data.errmsg);
          }
        });
      },

      // 下单成功后   返回的订单信息
      orderPay(orderId) {
        this.$toast('下单成功！费用总计：' + this.orderPay + '元，请支付！')
        this.payInfo = {
          ordersId: orderId,
          orderId: orderId,
          businessTotalFee: parseInt(this.price) * 100,
          origTotalFee: parseInt(this.price) * 100,
        }
        this.payShow = true
      },

      //详情内必须输入正确的标识中文，英文，数字，单纯数字，特殊字符不满足
      checkIsChEnNum(str) {
        //中文加数字可以通过校验
        var pattern = /^([A-Za-z0-9]+[\u4e00-\u9fa5]+[A-Za-z0-9]+)|([\u4e00-\u9fa5]+[A-Za-z0-9]+)|([A-Za-z0-9]+[\u4e00-\u9fa5])|([\u4e00-\u9fa5])$/gi;
        if (pattern.test(str)) {
          var specialKey = "[`~!#$^&*@()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";//特殊字符列表
          var strArray = str.toString().split("");
          for (var i = 0; i < strArray.length; i++) {
            var key = specialKey.indexOf(strArray[i]);
            if (key != -1) {
              return false;
            }
          }
          return true;
        } else {
          return false;
        }
      },


      // 选择服务
      onSelectClickPro(val) {
        this.productSelect = val;
        this.active1 = val.policyName;
        this.changeProduct();
      },
      onSelectPro(val) {
        this.chooseProduct = true
      },
      secConfirmPro() {
        this.chooseProduct = false;
      },
      //选址方式
      onSelectClickType(val) {
        this.typeSelect = val;
        this.active2 = val.name;
        if ('1' == this.typeSelect.value) {
          this.displayFlag10 = true;
          this.displayFlag11 = false;
          this.displayFlag13 = true;
        } else if ('0' == this.typeSelect.value) {
          this.displayFlag10 = false;
          this.displayFlag11 = true;
          this.displayFlag13 = false;
        }
      },
      onSelectType(val) {
        this.chooseType = true
      },
      secConfirmType() {
        this.chooseType = false;
      },
      // 获取时间
      showPopup() {
        this.staffId = sessionStorage.getItem('staffId');
        this.showDate = true;
        this.isLoadingShow = true;
        setTimeout(() => {
          this.isLoadingShow = false
        }, 500)
      },

      checkFlag() {
        this.payShow = false;
      },

      // 确认选择的时间
      confirmPicker(val) {
        let year = val.getFullYear()
        let month = val.getMonth() + 1
        let day = val.getDate()
        let hour = val.getHours()
        let minute = val.getMinutes()
        if (month >= 1 && month <= 9) {
          month = `0${month}`
        }
        if (day >= 1 && day <= 9) {
          day = `0${day}`
        }
        if (hour >= 0 && hour <= 9) {
          hour = `0${hour}`
        }
        if (minute >= 0 && minute <= 9) {
          minute = `0${minute}`
        }
        this.appointmentTime = `${year}-${month}-${day}`
        this.showDate = false
      },
      // 选项格式化函数
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`
        } else if (type === 'month') {
          return `${value}月`
        } else if (type === 'day') {
          return `${value}日`
        } else if (type === 'hour') {
          return `${value}时`
        } else if (type === 'minute') {
          return `${value}分`
        } else if (type === 'second') {
          return `${value}秒`
        }
        return value
      },


    }


  }
</script>


<style lang="scss" scoped>
  .intention {
    height: 100%;

    .content {
      padding: 6% 8%;
      box-sizing: border-box;
      background-color: #F9E0B2;

      .cont {
        padding: 3% 4%;
        background-color: #fff;
        border-radius: 10px;
      }

      .content_title {
        box-sizing: border-box;
        text-align: center;
        height: 1.2rem;
        margin-bottom: 10px;
        position: relative;

        .title {
          margin-top: 3%;
          font-size: 17px;
        }

        .title_staff {
          position: absolute;
          top: 0;
          right: 0;
          text-align: right;
          font-size: 12px;
          color: #777;
          text-decoration: underline;
        }
      }

      .content_items {
        padding: 2%;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        background-color: #e6e6e6;
        border-radius: 10px;
        margin-bottom: 6%;
        margin-top: 6%;

        .active {
          background: #ccc;
          color: #fff;
        }

        .content_addr {
          padding: 5px 16px;
          height: 100%;
          box-sizing: border-box;

          .addr_title {
            display: flex;
            height: 2rem;
            border-bottom: 1px solid #ccc;
            align-items: center;

            .addr_title_item {
              flex: 1;
              text-align: center;
            }
          }

          .addr_cont_title {
            display: flex;
            margin-top: 10px;
            justify-content: space-around;
          }

          .addr_cont {
            display: flex;
            margin-top: 10px;
            height: 80%;

            .addr_cont_item {
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
            margin-top: 5px;
            text-align: center;

            .confirmOn {
              width: 90%;
              line-height: 2.5rem;
              margin: auto;
              border-radius: 8px;
              background: linear-gradient(to right, #ff9924, #ff6025);
              color: white;
            }
          }
        }

        .van-action-sheet {
          position: fixed;
          height: 55%;
          bottom: 0;
          background-color: #f2f2f2;
          left: 50%;
          transform: translateX(-50%);

          .van-action-sheet__content {
            height: 85%;
          }
        }

        .item1 {
          flex: 2;
          padding: 1%;
        }

        .item2 {
          flex: 5;

          .item_select {
            font-size: 14px;
            width: 60%;
            height: 100%;
            border: 1px solid #e2e2e2;
            border-radius: 3px;
            padding: 1%;
            position: relative;

            .select_item {
              position: absolute;
              background-color: #fff;
              width: 100%;
              padding: 0 2%;
              box-sizing: border-box;
              top: 100%;
              left: 0;
              border: 1px solid #e2e2e2;
              border-top: none;

              .item {
                padding: 3%;
              }
            }
          }

          input {
            height: 100%;
            width: 100%;
          }

          .queryPhone {
            margin-top: 5px;
            color: red;
            font-size: 14px;
          }

          .van-cell {
            padding: 0 0;
            background-color: #e6e6e6;
          }
        }
      }

      .button {
        .btn {
          width: 50%;
          margin: 10% auto;
        }
      }

      .small_btn {
        background: linear-gradient(to right, #ff9924, #ff6025);
        color: white;
        text-align: center;
        border-radius: 4px;
      }
    }
  }
</style>
