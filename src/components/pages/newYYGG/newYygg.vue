<template>
    <div class="newYygg">
        <div class="swper">
            <img src="https://wxxapp.chinaunicom.cn/newwofortg/mobile/img/hn/kuandai0yuan.jpg" alt="">
        </div>
        <div class="main">
            <div class="number gong" style="padding-bottom: 0;margin-bottom: 0;">
                <input type="tel" class="phone" :disabled='disShow' v-model="phone" maxlength="11" placeholder="请输入手机号">
            </div>
            <div class="number gong">
                <input type="test" class="phone" :disabled='disShow' v-model="youhui"  placeholder="请输入优惠码">
                <div class="confirmOn" @click="confirmYh">查询</div>
            </div>
            <div class="userMsg gong">
                <div class="title" @click="checkUserInfoImg(1)" >
                    <h3>客户信息</h3>
                    <img v-if="!showUserInfoImg1" class="zhankai" src="@/assets/icon/icon1.png" alt="">
                    <img v-else class="zhankai" src="@/assets/icon/icon2.png" alt="">
                </div>
                <div class="user-msg" v-if="showUserInfo1">
                    <div class="user-msg-tr">
                        <div class="user-msg-td1">
                            套餐名称：
                        </div>
                        <div class="user-msg-td2">
                            {{htmlData.productName}}
                        </div>
                    </div>
                    <div class="user-msg-tr">
                        <div class="user-msg-td1">
                            客户姓名：
                        </div>
                        <div class="user-msg-td2">
                            {{htmlData.custName}}
                        </div>
                    </div>
                    <div class="user-msg-tr">
                        <div class="user-msg-td1">
                            证件号码：
                        </div>
                        <div class="user-msg-td2">
                            {{htmlData.certCode}}
                        </div>
                    </div>
                </div>
            </div>
            <div class="userMsg gong">
                <div class="title"  @click="checkUserInfoImg(2)">
                    <h3>商品信息</h3>
                    <img v-if="!showUserInfoImg2" class="zhankai" src="@/assets/icon/icon1.png" alt="">
                    <img v-else class="zhankai" src="@/assets/icon/icon2.png" alt="">
                </div>
                <div class="goods" v-if="showUserInfo2">
                    <div class="goods-tr " v-for="(item, index) in productselect" :key="index" @click.stop="checkPolicy(item, index)" :class="{action:index==isactive}">
                        <div class="goods-tr-item">
                            <div class="goods-tr-td1">
                                商品名称：
                            </div>
                            <div class="goods-tr-td2">
                                {{item.policyName}}
                            </div>
                        </div>
                        <div class="goods-tr-item">
                            <div class="goods-tr-td1">
                                光 猫 ：
                            </div>
                            <div class="goods-tr-td2">
                                {{item.onuItems[0].policyName}}    
                            </div>
                        </div>
                        <div class="goods-tr-item">
                            <div class="goods-tr-td1">
                                机 顶 盒 ：
                            </div>
                            <div class="goods-tr-td2">
                                <div v-if="item.iptvItems.length>0">
                                    <div v-for="(items, indexs) in item.iptvItems" :key="indexs">
                                        <input style="width: 16px;margin-right: 10px;display:inline-block" v-model="items.action" type="checkbox" @click.stop="changeCheckbox(items, item, index)">
                                        {{ items.commName }}   
                                        <span style="font-size: 14px;color: red;margin-left:20px">(可选)</span>
                                    </div>
                                </div>
                                <div v-else>
                                    无
                                </div>
                            </div>
                        </div>
                        <div class="goods-tr-item" v-for="(items, indexs) in item.iptvTextlist" :key="indexs">
                            <span style="font-size: 14px;text-align:center;display:block;width:100%">{{items.commName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="userMsg gong">
                <div class="title">
                    <h3>地址信息</h3>
                    <img  class="zhankai" src="@/assets/icon/icon2.png" alt="">
                </div>
                <div class="table">
                    <div class="table-tr">
                        <div style="flex:1;">联系电话：</div>
                        <input type="tel" class="phone" placeholder="请输入联系电话" v-model="number" maxlength="11">
                    </div>
                    <div class="table-tr">
                        <div style="flex:1;">预约日期：</div>
                        <input type="text" onfocus="this.blur()" class="phone" @click="showTime = true" placeholder="请选择预约日期" v-model="dateTime" >
                        <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
                            <van-datetime-picker v-model="onDate" type="datetime" title="选择时间" @confirm='onConfirmTime' @cancel='showTime = false'/>
                        </van-popup>
                    </div>
                    <div class="table-tr">
                        <div style="flex:1;">安装区域：</div>
                        <input type="text" onfocus="this.blur()" @click="getAdd" class="phone"  placeholder="请选择安装地址" v-model="addCity">
                        <address-comm-3 ref="childAdd" @getAddress='getAddress'/>
                    </div>
                    <div class="table-tr">
                        <div style="flex:1;">详细地址：</div>
                        <input type="text" class="phone" placeholder="请输入详细地址" v-model="address" >
                    </div>
                    <!-- <div class="table-tr">
                        <div style="flex:1;">证件号码：</div>
                        <input type="text" onfocus="this.blur()" class="phone" placeholder="请输入身份证号码" v-model="psdCode" @click="psdShow = true">
                    </div> -->
                    <!-- <div class="table-tr">
                        <div style="flex:1;">优 惠 码 ：</div>
                        <input type="text" class="phone" onfocus="this.blur()" placeholder="请输入优惠码" v-model="youhui" @click="yhShow = true" >
                    </div> -->
                </div>
            </div>
            <!--立即办理-->
            <footer style="background: white;">
                <div class="price">本次收费：<span style="font-size: 20px;color: #ff6025;">{{moneyTotal}}</span>元</div>
                <div class="confirmOn" @click="payFee">提交</div>
            </footer>
            <van-dialog v-model="showPhone" :show-confirm-button='false' :close-on-click-overlay='true'>
                <div class="show1">
                    <div class="tips-title">
                        手机号码校验
                    </div>
                    <div class="tips-content_toast">
                        <input type="number" class="phone" placeholder="请输入验证码" v-model="yan" >
                        <div class="confirmOn" v-if="!yanShow" @click="onSecYan">获取验证码</div>
                        <div class="confirmOn" style="font-size:3.2vw;" v-if="yanShow">{{onSecDate}}秒后重新获取</div>
                    </div>
                    <div class="order-css" @click="confirmYan">确认</div>
                </div>
            </van-dialog>
            <van-dialog v-model="yhShow" :show-confirm-button='false' :close-on-click-overlay='true'>
                <div class="show1">
                    <div class="tips-title">
                        优惠码校验
                    </div>
                    <div class="tips-content">
                        <input type="text" class="phone" placeholder="请输入优惠码" v-model="psYh" >
                    </div>
                    <div class="order-css" @click="confirmYh">确认</div>
                </div>
            </van-dialog>
            <!-- <van-dialog v-model="psdShow" :show-confirm-button='false' :close-on-click-overlay='true'>
                <div class="show1">
                    <div class="tips-title">
                        身份证校验
                    </div>
                    <div class="tips-content">
                        <input type="text" class="phone" placeholder="请输入姓名" v-model="psdName" >
                        <input type="number" class="phone" placeholder="请输入身份证号码" v-model="psptId" >
                    </div>
                    <div class="order-css" @click="confirmPsd">确认</div>
                </div>
            </van-dialog> -->
        </div>
    </div>
</template>
<script>
import addressComm3 from '../../common/addressComm3'
import Api from '../../../api/apiBroadbandAdd'
const api = new Api()
export default {
    name:'newYygg',
    components:{
        addressComm3
    },
    computed:{
        token() {
            if (sessionStorage.getItem('tokenId')) {
                return sessionStorage.getItem('tokenId')
            } else {
                return ''
            }
        },
    },
    data(){
        return {
            staffId:'',
            classId:'',
            isactive:1000,
            phone:'', // 手机号
            showPhone:false,
            disShow:false,
            yan:'', // 验证码
            onSecDate:59,
            yanShow:false,
            showUserInfoImg1:false, // 用户信息   箭头
            showUserInfo1:false,
            showUserInfoImg2:false, // 商品信息   箭头
            showUserInfo2:false,
            checkIptv:true,  // iptv 多选框
            number:'',  // 联系电话
            addCity:'',  // 城市
            address:'',  // 详细地址
            dateTime:'',  // 预约日期
            onDate:new Date(),
            moneyTotal:0,  // 金额
            showTime:false,  // 日期弹框  
            // psptId:'', // 身份证号码
            // psdCode:'',
            // psdName:'',
            // psdShow:false, // 身份证弹框
            youhui:'', // 优惠码
            yhShow:false,
            psYh:'',
            htmlData:{}, // 页面渲染信息
            datas:{}, // 下单参数
            productselect:[],
            productData:''
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.global.loadingStart("页面初始化,请稍等……")
            if(this.token){
                api.qrcodeSelectTokenId(this.token).then(res => {
                    if(res.data.msgFlag == '0') {
                        this.classId = res.data.resultJson[0].classId
                        this.staffId = res.data.resultJson[0].staffId
                        this.$store.commit('updataTokenJson', res.data.resultJson[0])
                        this.$store.commit('updataStaffId',res.data.resultJson[0].staffId)
                        this.$store.commit('updataClassId',res.data.resultJson[0].classId)
                        sessionStorage.setItem('staffId',res.data.resultJson[0].staffId)
                        sessionStorage.setItem('classId',res.data.resultJson[0].classId)
                        sessionStorage.setItem('tokenJson',JSON.stringify(res.data.resultJson[0]))
                        let par = {}
                        par.staffId = this.staffId
                        api.init(par).then(res => {
                            this.global.loadingStop()
                        })
                    }else{
                        alert(res.data.errmsg)
                        return
                    }
                })
            }else{
                this.classId = sessionStorage.getItem('classId')
                this.staffId = sessionStorage.getItem('staffId')
                let par = {}
                par.staffId = this.staffId
                api.init(par).then(res => {
                    this.global.loadingStop()
                })
            }
        },
        // 手机号校验
        checkConfirm(){
            if(!this.phone || !(/^1[3456789]d{9}$/.test(this.phone)) && this.phone.length != 11){
                alert('请输入正确的手机号！')
                return;
            }
            this.showPhone = true
        },
        // 获取验证码
        onSecYan(){
            this.yanShow = true  // 60秒   开关
            let setTime=setInterval(() => {
                this.onSecDate --
                if(this.onSecDate == 0){
                    this.yanShow = false
                    this.onSecDate = 59
                    clearInterval(setTime)
                }
            }, 1000);
            this.global.loadingStart('正在获取验证码')
            api.sendMsg(this.phone).then(res => {
                this.global.loadingStop()
                if (res.data.msgFlag == 0) {
                } else {
                    alert(res.data.errmsg)
                }
            }).catch(error => {
                alert(error)
            })
        },
        // 获取用户信息 
        confirmYan(){
            this.datas = {}
            this.htmlData = {}
            this.global.loadingStart("正在验证,请稍等……");
            api.checkMobileBroadbandNum(this.phone).then(result => {
                this.global.loadingStop();
                if ("0" != result.data.msgFlag) {
                    alert("对不起，您的套餐无法办理宽带！")
                    this.disShow = false
                    return;
                } else {
                    this.showPhone = false
                    this.disShow = true
                    this.productselect = []
                    this.checkYZMResult(result.data, this.phone);
                }
            }).catch(error => {
                this.global.loadingStop();
                alert(error)
            })
        },
        // 页面展示数据  
        checkYZMResult(result, phone){
            this.htmlData = {
                productName: result.userThreePartInfo.userInfo.productName ? result.userThreePartInfo.userInfo.productName : '',
                phone: phone,
                custName: this.global.cardEncrypt(result.userThreePartInfo.custInfo.custName, "custName") ? this.global.cardEncrypt(result.userThreePartInfo.custInfo.custName, "custName") : '无',
                certCode: this.global.cardEncrypt(result.userThreePartInfo.custInfo.certCode, "certCode") ? this.global.cardEncrypt(result.userThreePartInfo.custInfo.certCode, "certCode") : '无'
            }
            let userThreePartInfo = result.userThreePartInfo;//三户信息
            this.datas.mainNumber = phone;
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
                alert("对不起！您的套餐无法办理宽带!")
                this.disShow = false
                return
            }
            let nextProductId = result.userThreePartInfo.userInfo.nextProductId
            for (let i = 0; i < result.comInfo.rows.length; i++) {
                let product = result.comInfo.rows[i];
                let onulist = [];
                let iptvlist = [];
                let iptvTextlist = [];
                let iptvNumlist = [];
                let commCode = []
                let childInfos = product.qryCoCustInfoRsp.childCoInfo;
                for (let j = 0; j < childInfos.length; j++) {
                    let childInfo = childInfos[j];
                    commCode.push(childInfo.commCode)
                    if (childInfo.roleId == 6) {
                        childInfo.OnuId = childInfo.commId;
                        childInfo.OnuName = childInfo.commName;
                        onulist.push(childInfo);
                    }
                    if (childInfo.roleId == 5) {
                        childInfo.iptvId = childInfo.commId;
                        childInfo.iptvName = childInfo.commName;
                        childInfo.action = false
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
                product.action = false
                console.log("rouid",commCode)
                if(commCode.length > 0){
                    commCode.map(item => {
                        if(item == nextProductId){
                            this.productselect.push(product);
                        }
                    })
                }
            }
            if(this.productselect.length == 0){
                alert("该手机号无可办理的商品！")
                this.disShow = false
                return;
            }
            this.checkPolicy(this.productselect[0], 0)
            this.showUserInfo1 = true  // 信息展示
            this.showUserInfo2 = true  // 商品信息展示
        },
        // 商品信息  展开
        checkUserInfoImg(num){
            if(num == 1){
                this.showUserInfoImg1 = !this.showUserInfoImg1
                if(this.htmlData.phone){
                    this.showUserInfo1 = !this.showUserInfo1
                }
            }else if(num == 2){
                this.showUserInfoImg2 = !this.showUserInfoImg2
                if(this.productselect){
                    this.showUserInfo2 = !this.showUserInfo2
                }
            }
        },
        // 商品多选框 选中
        changeCheckbox(item, items, index){
            if(!item.action){
                if(this.datas.canComp == 0){
                    alert('您输入的号码已经存在宽带订单！')
                    this.disShow = false
                    this.$set(item, 'action', false)
                    return
                }
                if ((items.offerTypeCode == '211' || items.offerTypeCode == '214') && this.datas.canComp == 1) {
                    this.datas.ACCESS_TYPE = 'A13';
                } else {
                    alert("已经存在宽带，无法继续办理！")
                    this.disShow = false
                    this.$set(item, 'action', false)
                    return
                }
                this.isactive = index
            }
            if (!item.action) {
                items.iptvValue = item.iptvId;
                items.iptvSumValue = '1';
            } else {
                items.iptvValue = "";
                items.iptvSumValue = "";
            }
            
            this.checkPolicy(items, index)
            
        },
        checkPolicy(item, index){
            if(this.datas.canComp == 0){
                alert('您输入的号码已经存在宽带订单！')
                this.disShow = false
                return
            }
            if ((item.offerTypeCode == '211' || item.offerTypeCode == '214') && this.datas.canComp == 1) {
                this.datas.ACCESS_TYPE = 'A13';
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
                identityInfo.birth = this.global.birth(this.datas.customerInfo.certCode);
                identityInfo.sex = this.global.Getsex(this.datas.customerInfo.certCode);
                identityInfo.address = this.datas.customerInfo.certAddr;
                identityInfo.name = this.datas.customerInfo.custName;
                if (this.datas.customerInfo.certEndDate) {
                    identityInfo.period = this.datas.customerInfo.certEndDate.substring(0, 8);
                } else {
                    identityInfo.period = "20501230";
                }
                this.datas.custId = this.datas.customerInfo.custId;
                this.datas.identityInfo = identityInfo;
            } else {
                alert("已经存在宽带，无法继续办理！")
                return
            }
            item.onuValue = item.onuItems[0].OnuId;
            this.isactive = index
            this.datasObj(item, index)
        },
        datasObj(data, num){
            this.productselect.map((item, index) =>{
                if(index == num){
                    item.action = true
                }else{
                    item.action = false
                }
            })
            this.datas.rhProductInfo = data;
            this.datas.getActivityPolicyId = data.policyId;
            let buyLimits = data.buyLimits;
            // 移网能添加副卡数量
            let onlySecond = 0;
            // 融合能添加副卡数量
            let mixSecond = 0;
            // 已开副卡数量
            let viceCount = parseInt(this.datas.viceCount);
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
            this.productData = data
            this.moneyTotal = this.getProductFee()
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
        // 时间选择
        onConfirmTime(){
            this.showTime = false
            this.dateTime = moment(this.onDate).format("YYYY-MM-DD HH:mm:ss")
        },
        // 选择地址 弹框
        getAdd(){
            this.$refs.childAdd.onInput(2)
        },
        // 获取地址
        getAddress(data){
            this.global.loadingStart('正在加载。。。')
            let param = {}
            param.provinceCode = data.provinceCode;
            param.cityCode = data.cityCode;
            param.countyCode = data.areaid;
            api.mofficeId(param).then(result => {
                this.global.loadingStop();
                if ("0" != result.data.msgFlag) {
                    alert("获取调测地址出错：" + result.data.errmsg)
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
                    this.addCity = data.provinceName + '-' + data.cityName + '-' + data.areaName
                }
            }).catch(error => {
                alert(error)
                return
            })
        },
        confirmYh(){
            
            if(!this.phone){
                alert('请先输入手机号！')
                return
            }
            if(!this.youhui){
                alert('请输入优惠码！')
                return
            }
            let data = {
                serialNumber:this.phone,
                couponCode:this.youhui,
                couponType:2
            }
            this.global.loadingStart("正在查询优惠码！");
            api.coupon(data).then(res => {
                this.global.loadingStop();
                if(res.data.msgFlag == '0'){
                    if(res.data.resultJson.code == '0000'){
                        this.$toast('优惠码可用！')
                        this.confirmYan()
                    }else{
                        this.$toast('优惠码不可用！')
                    }
                }else{
                    this.$toast(res.data.errmsg)
                }
            })
        },
        payFee() {
            if (!(/^1[123456789]\d{9}$/.test(this.number))) {
                alert("请输入有效的联系人电话！")
                return;
            }
            if (!this.dateTime) {
                alert("请选择预约日期！")
                return;
            }
            if (!this.addCity) {
                alert("请选择安装地址！")
                return;
            }
            if (!this.address) {
                alert("请填写详细地址！")
                return;
            }
            if (!this.datas.rhProductInfo) {
                alert("请选择对应的商品！")
                return;
            }
            if (!this.youhui) {
                alert("请输入优惠码！")
                return;
            }
            let kdAddInfo = this.datas.kdAddInfo;
            kdAddInfo.linkTel = this.phone;
            kdAddInfo.kdYyFlag = "1";
            console.log('222222222',this.dateTime)
            kdAddInfo.kdYyTime = this.dateTime;
            kdAddInfo.isInstrallAddress = "0";
            kdAddInfo.kdAddress = this.address;
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
            this.datas.couponSerialNumber = this.phone
            this.datas.couponCode = this.youhui
            this.datas.couponType = '2'
            let param = {};
            param.data = this.datas;
            param.data.productInfos.map(item => {
                delete item.action;
                item.iptvItems.map(item2 => {
                delete item2.action;
                })
            })
            param = JSON.stringify(param.data)
            this.global.loadingStart("正在提交订单,请稍等……");
            api.submitFuseInto0kuandai(param).then(resultData => {
                this.global.loadingStop();
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
                            error:resultData.data.resultJson.detail,
                            successFlag: '0'
                        }
                        this.$store.commit('updataOrderData', orderData)
                        this.$router.push('/orderSuccess')
                    }
                } else {
                    let orderData = {
                        error:resultData.data.resultJson.detail,
                        successFlag: '0'
                    }
                    this.$store.commit('updataOrderData', orderData)
                    this.$router.push('/orderSuccess')
                }
            }).catch(error => {
                let orderData = {
                    error:error,
                    successFlag: '0'
                }
                this.$store.commit('updataOrderData', orderData)
                this.$router.push('/orderSuccess')
            })
        },
    }
    
}
</script>
<style lang="scss" scoped>
.newYygg{
    
    margin-bottom: 70px;
    .main{
        padding: 10px;
        box-sizing: border-box;
    }
    .swper{
        width: 100%;
        img{
            width: 100%;
        }
    }
    .show1{
        padding: 20px 20px;
        box-sizing: border-box;
        .tips-title{
            text-align: center;
            // color: #73B2FA;
            font-size: 5vw;
            margin-bottom: 3%;
        }
        .tips-content_toast{
            display: flex;
            justify-content: space-between;
            margin: 15px 0;
            .phone{
                flex:1;
                padding-left: 10px;
                box-sizing: border-box;
                border-radius: 5px;
                line-height: 2.5rem;
                border: 1px solid #3f80f7;
            }
            .confirmOn{
                flex:1;
                line-height: 2.5rem;
                border: 1px solid #3f80f7;
                margin-left: 10px;
                border-radius: 5px;
                text-align: center;
                background-color: #3f80f7;
                color: white;
            }
        }
        .tips-content{
            margin: 15px 0;
            .phone{
                padding-left: 10px;
                box-sizing: border-box;
                border-radius: 5px;
                line-height: 2.5rem;
                border: 1px solid #3f80f7;
                margin-bottom: 15px;
                width: 100%;
            }
        }
        .order-css{
            width: 100%;
            font-size: 4vw;
            text-align: center;
            padding: 4% 0;
            color: #ffffff;
            background-color: #3f80f7;
            margin-top: 5%;
            border-radius: 5px;
        }
    }
    .phone{
        flex:3;
        padding-left: 10px;
        box-sizing: border-box;
        border-radius: 5px;
        line-height: 2.5rem;
        border: 1px solid #3f80f7;
    }
    .confirmOn{
        flex:1;
        line-height: 2.5rem;
        border: 1px solid #3f80f7;
        margin-left: 10px;
        border-radius: 5px;
        text-align: center;
        background-color: #3f80f7;
        color: white;
    }
    .number{
        display: flex;
        justify-content: space-between;
        
    }
    .gong{
        margin-bottom: 10px;
        background-color: #fff;
        padding: 10px 15px;
        box-sizing: border-box;
        border-radius: 5px;
    }
    .userMsg{
        .title{
            position: relative;
            .zhankai{
                position: absolute;
                top: 10px;
                right: calc(12% - 31px);
                margin-top: -5px;
            }
        }
        .user-msg{
            .user-msg-tr{
                display: flex;
                margin: 5px 0;
                align-items: center;
                .user-msg-td1{
                    flex:1;
                }
                .user-msg-td2{
                    flex:3;
                }
            }
        }
        .goods{
            .action{
                background-color: #B0C4DE !important;
            }
            .goods-tr{
                margin: 10px 0;
                padding: 8px 8px;
                box-sizing: border-box;
                background-color: #f7f8fa;
                border-radius: 5px;
                
                .goods-tr-item{
                    display: flex;
                    align-items: center;
                    margin-bottom: 5px;
                    .goods-tr-td1{
                        flex:1;
                    }
                    .goods-tr-td2{
                        flex:3;
                    }
                }
            }
        }
        .table{
            .table-tr{
                margin: 10px 0;
                display: flex;
                align-items: center;
                .phone{
                    flex:3;
                    padding-left: 10px;
                    box-sizing: border-box;
                    border-radius: 5px;
                    line-height: 2rem;
                    border: 1px solid #3f80f7;
                }
            }
        }
    }
    
    footer {
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        .price{
            line-height: 40px;
            padding: 10px 20px;
            box-sizing: border-box;
        }
        .confirmOn{
            width: 20%;
            line-height: 40px;
            border: 1px solid #3f80f7;
            margin: 10px 20px;
            border-radius: 5px;
            text-align: center;
            background-color: #3f80f7;
            color: white;
        }
    }

}
</style>