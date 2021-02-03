<template>
    <div class="divineEye">
        <div class="main">
            <div class="number gong">
                <input type="test" class="phone" :disabled='disShow' v-model="phone"  placeholder="请输入手机号">
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
                    <div class="goods-main">
                        <van-radio-group v-model="selectData" >
                            <van-radio class="select-goods" :name="item.commCode" v-for="item in selectList" :key="item.commCode" @click="selecClick(item)">{{item.commName}}</van-radio>
                        </van-radio-group>
                    </div>
                </div>
            </div>
            <!--立即办理-->
            <footer style="background: white;">
                <div class="price">本次收费：<span style="font-size: 20px;color: #ff6025;">{{moneyTotal}}</span>元</div>
                <div class="confirmOn" @click="payFee">立即办理</div>
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
        </div>
    </div>
</template>
<script>
import Api from '../../../api/divineEyeApi'
const api = new Api()
export default {
    name:'divineEye',
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
            phone:'',
            yan:'',
            disShow:false,
            showPhone:false,
            yanShow:false,
            onSecDate:59,
            showUserInfoImg1:false, // 用户信息   箭头
            showUserInfo1:false,
            showUserInfoImg2:false, // 商品信息   箭头
            showUserInfo2:false,
            htmlData:{},
            datas:{},
            productselect:[], // 选中
            moneyTotal:0,
            selectData:'',
            selectList:[],
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
        // 吊起验证码框
        confirmYh(){
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
                    this.$toast('发送成功！')
                } else {
                    alert(res.data.errmsg)
                }
            }).catch(error => {
                alert(error)
            })
        },
        confirmYan(){
            if(!this.yan){
                alert('请输入验证码')
                return
            }
            this.datas = {}
            this.htmlData = {}
            this.global.loadingStart("正在验证,请稍等……");
            api.getRandomNum(this.phone).then(resultData => {
                if (resultData.data.msgFlag == 0) {
                    if (this.yan == resultData.data.randomNum) {
                        api.checkBroadNum(this.phone).then(result => {
                            if ("0" != result.data.msgFlag) {
                                alert("对不起，您的套餐无法办理宽带！")
                                console.log("主号码校验失败：" + result.data.errmsg);
                                return;
                            } else {
                                let product = result.data.userThreePartInfo.userInfo.productId
                                let serviceClassCode = result.data.userThreePartInfo.userInfo.serviceClassCode;
                                if(serviceClassCode != '0050'){
                                    alert("请输入移网手机号码。");
                                    return;
                                }
                                api.queryEye(product).then(res => {
                                    this.global.loadingStop();
                                    if(res.data.msgFlag == '0'){
                                        this.showPhone = false
                                        this.showUserInfo1 = true  // 信息展示
                                        this.showUserInfo2 = true  // 商品信息展示
                                        this.disShow = true
                                        this.htmlData = {
                                            productName: result.data.userThreePartInfo.userInfo.productName ? result.data.userThreePartInfo.userInfo.productName : '',
                                            phone: this.phone,
                                            custName: this.global.cardEncrypt(result.data.userThreePartInfo.custInfo.custName, "custName") ? this.global.cardEncrypt(result.data.userThreePartInfo.custInfo.custName, "custName") : '无',
                                            certCode: this.global.cardEncrypt(result.data.userThreePartInfo.custInfo.certCode, "certCode") ? this.global.cardEncrypt(result.data.userThreePartInfo.custInfo.certCode, "certCode") : '无'
                                        }
                                        let elementInfo = result.data.userThreePartInfo.userInfo.elementInfo
                                        let haveCommCode1='';
                                        for(var i=0;i<elementInfo.length;i++){
                                            haveCommCode1 = haveCommCode1 + elementInfo[i].id + ',';
                                        }

                                        this.$set(this.datas, 'open4gMode', 1)
                                        this.$set(this.datas, 'remoteTag', '1')
                                        this.$set(this.datas, 'isPrint', '0')
                                        this.$set(this.datas, 'contactPhone', this.phone)
                                        this.$set(this.datas, 'bandNum', this.phone)
                                        this.$set(this.datas, 'source', this.classId)
                                        this.$set(this.datas, 'phoneNum', this.phone)
                                        this.$set(this.datas, 'result', JSON.stringify(result))
                                        this.$set(this.datas, 'serviceClassCode', serviceClassCode)
                                        this.$set(this.datas, 'haveCommCode1', haveCommCode1)
                                        this.$set(this.datas, 'mainProductId', product)
                                        this.$set(this.datas, 'mainNumber', this.phone)
                                        this.$set(this.datas, 'certCode', result.data.userThreePartInfo.custInfo.certCode)
                                        this.$set(this.datas, 'certAddr', result.data.userThreePartInfo.custInfo.certAddr)
                                        this.$set(this.datas, 'custType', result.data.userThreePartInfo.custInfo.custType)
                                        this.$set(this.datas, 'certTypeCode', result.data.userThreePartInfo.custInfo.certTypeCode)
                                        this.$set(this.datas, 'certEndDate', result.data.userThreePartInfo.custInfo.certEndDate)
                                        this.$set(this.datas, 'custName', result.data.userThreePartInfo.custInfo.custName)
                                        this.$set(this.datas, 'custId', result.data.userThreePartInfo.custInfo.custId)
                                        this.$set(this.datas, 'userId', result.data.userThreePartInfo.userInfo.userId)
                                        this.$set(this.datas, 'userType', '1')
                                        this.$set(this.datas, 'acctId', result.data.userThreePartInfo.acctInfo.acctId)
                                        this.$set(this.datas, 'payName', result.data.userThreePartInfo.acctInfo.payName)
                                        this.$set(this.datas, 'oldCustInfo', result.data.userThreePartInfo.oldCustInfo)

                                        this.selectList = res.data.resultJson.rspData.rows
                                    }
                                }).catch(error => {
                                    this.global.loadingStop();
                                    alert(error)
                                })
                            }
                        }).catch(error => {
                            this.global.loadingStop();
                            alert(error)
                        })
                    } else {
                        this.$toast("验证码输入错误，请重新输入！")
                    }
                } else {
                    this.global.loadingStop();
                    alert(resultData.data.errmsg)
                }
            }).catch(error => {
                this.global.loadingStop();
                alert(error)
            })
        },
        // 商品信息展开
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
        selecClick(commInfo){
            this.$set(commInfo, 'productName', commInfo.commName)
            let childInfo = commInfo.qryCoCustInfoRsp.childCoInfo
            let chooiceProduct1 = []
            let totalFee = 0;
            let childProName='';
            let sceneType='';
            let haveCommCode1 = this.datas.haveCommCode1;
            let serviceClassCode = this.datas.serviceClassCode;
            let a=1;
            if (serviceClassCode=='0040'){
                for(var i=0;i<childInfo.length;i++){
                    if(childInfo[i].roleId=="0"){
                        chooiceProduct1.push(childInfo[i]);
                        totalFee+=parseInt(childInfo[i].commPrice);
                        a=a+1;
                        break;
                    }
                }
                for (var i=0;i<childInfo.length;i++){
                    //判断子商品是否已经订购过
                    if(childInfo[i].roleId!="0"){
                        if(haveCommCode1.indexOf(childInfo[i].commCode)==-1){
                            chooiceProduct1.push(childInfo[i]);
                            totalFee+=parseInt(childInfo[i].commPrice);
                            childProName = childInfo[i].commName;
                            break;
                        }
                    }
                }

                //如果一个子商品都没选中，说明该商品下所有子商品都订购过，该商品不能再订购
                if(chooiceProduct1.length<a){
                    totalFee=0;
                    alert("该商品订购数量已达上限，请选择其他商品！");
                    return false;
                }
                sceneType='124';
            }else {
                for(var i=0;i<childInfo.length;i++){
                    if(childInfo[i].roleId=="0"){
                        chooiceProduct1.push(childInfo[i]);
                        totalFee+=parseInt(childInfo[i].commPrice);
                        a=a+1;
                        break;
                    }
                }
                for (var i=0;i<childInfo.length;i++){
                    //判断子商品是否已经订购过
                    if(childInfo[i].roleId!="0"){
                        if(haveCommCode1.indexOf(childInfo[i].commCode)==-1){
                            chooiceProduct1.push(childInfo[i]);
                            totalFee+=parseInt(childInfo[i].commPrice);
                            childProName = childInfo[i].commName;
                            break;
                        }
                    }
                }
                //如果一个子商品都没选中，说明该商品下所有子商品都订购过，该商品不能再订购
                if(chooiceProduct1.length<a){
                    totalFee=0;
                    alert("该商品订购数量已达上限，请选择其他商品！");
                    return false;
                }
                sceneType='125';
            }
            this.$set(this.datas, 'productInfo', JSON.stringify(commInfo))
            this.$set(this.datas, 'chooiceProduct', JSON.stringify(chooiceProduct1))
            this.$set(this.datas, 'sceneType', sceneType)
            this.$set(this.datas, 'tradeFee', totalFee/100)
            this.moneyTotal = totalFee/100
        },
        // 支付
        payFee(){
            if(!this.datas.phoneNum){
                alert("请先校验主号码");
                return;
            }
            if(!this.datas.chooiceProduct){
                alert("请选择商品");
                return;
            }
            this.global.loadingStart('正在提交订单，请稍等...')
            api.downEye(this.datas).then(res=>{
                this.global.loadingStop()
                if(res.data.msgFlag == '0'){
                    let orderId = res.data.resultJson.orderId
                    this.$set(this.datas, 'ordersId', orderId)
                    let acceptTime = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
                    
                    sessionStorage.setItem('number', this.datas.phoneNum)
                    sessionStorage.setItem('acceptTime', acceptTime)
                    sessionStorage.setItem('page', 'online')
                    if (parseInt(this.moneyTotal) * 100 == 0) {
                        sessionStorage.setItem("totalFee", "0.0");
                    } else {
                        sessionStorage.setItem("totalFee", parseInt(this.moneyTotal) * 100);
                    }
                    sessionStorage.setItem('ordersId', orderId)
                    sessionStorage.setItem('ms', this.staffId);
                    sessionStorage.setItem('orderSubMap', JSON.stringify(this.datas))
                    sessionStorage.setItem('isComp', '0')
                    sessionStorage.setItem('orderProductInfo', this.datas.productInfo)
                    window.location.href = "https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/orderCenter/OrderCenter.html";
                }else{
                    alert(res.data.errmsg)
                    return;
                }
            }).catch(error => {
                this.global.loadingStop()
                alert(error)
                return;
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.divineEye{
    margin-bottom: 70px;
    .main{
        padding: 10px;
        box-sizing: border-box;
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
            .goods-main{
                padding: 0 10px;
                // background-color: #B0C4DE;
                border-radius: 5px;
                box-sizing: border-box;
                .select-goods{
                    padding: 10px 0;
                    div{
                        background-color: #fff !important;
                    }
                }
            }
        }
    }
    .van-radio__icon{
        background-color: #fff !important;
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