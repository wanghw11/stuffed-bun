<template>
    <div class="flowDetail">
        <div class="fenxiang" @click.stop="fenxiang">
            <div>分享</div>
        </div>
        <div class="content">
            <div class="item_title">

                <div class="title_name">
                    <img class="title_img" src="@/assets/icon/title_2x.png" alt="">
                    <span>&nbsp;&nbsp;{{dataJson.commName}}</span>
                </div>
            </div>
            <div class="item_content">
                <div class="content_shuoming">
                    <div class="shuoming_fee">
                        价格：{{dataJson.price}}
                    </div>
                    <div class="shuoming_fee">
                        流量：{{dataJson.busiType}}
                    </div>
                </div>
                <div class="content_shuoming" style="margin-top:2vh;">
                    <div class="shuoming_fee">
                        速率：下行速率峰值 500Mbps
                    </div>
                </div>
                <div class="content_shuoming">
                    <div class="shuoming_tui">
                        退订次月生效
                    </div>
                </div>
                <div class="content_main">
                    <div class="main_nav">
                        <div style="flex:1;" v-for="(item, index) in navTitle" :key="index">
                            <div class="main_nav_title" :class="{nav_title_active:item.id==navActive}" @click="onNavTab(item)">
                                {{item.name}}
                            </div>
                        </div>
                    </div>
                    <div class="coupon-contain" v-if="navShow1">
                        联通5G升级包是针对高品质、最潮流的5G应用需求用户推出的包括大流量、优惠购、5G网络服务等内容的高品质特权包。包括三项权益：<br>
                        1、大流量：<br>
                        5G升级包19元/月：包含国内流量5GB；<br>
                        5G升级包29元/月：包含国内流量10GB；<br>
                        5G升级包49元/月：包含国内流量20GB；<br>
                        5G升级包69元/月：包含国内流量30GB；<br>
                        5G升级包99元/月：包含国内流量40GB。<br>
                        2、优惠购：5G升级包订购用户可登录“优惠购”平台按优惠价订购相关权益。权益涵盖视频、出行、娱乐、生活、教育等。<br>
                        3、5G网络服务：提供5G优享服务（上行速率峰值100Mbps，下行速率峰值500Mbps）。<br>
                    </div>
                    <div class="coupon-contain" v-if="navShow2">
                        1、4G套餐订购用户如需退订5G升级包，可在【手机营业厅-首页-搜索-5G升级包退订】中进行退订，次月生效。<br>
                        2、订购后立即生效，5G升级包费用每月一次性收取，用户不取消默认续订，变更（即用户订购的5G升级包生效期间再次订购其他档位升级包）、退订次月生效。同一档位升级包生效期间不能重复订购。副卡可共享主卡订购的5G升级包包含的流量、速率，不可共享“优惠购”。<br>
                        3、2G、3G和5G套餐、4G副卡、智慧沃家共享版用户号码暂不支撑订购升级包。<br>
                        4、订购5G升级包的用户需要退订升级包，才能办理变更为5G套餐的业务；本月已变更为5G套餐的用户需取消套餐变更以后才能订购升级包。<br>
                        5、升级包办理当月登录中国联通“手机营业厅”APP，在服务-5G-优惠购，可选购“优惠购”权益。若当月没有选购则当月权益资格失效，过期不补。权益在相应互联网平台按照相关规则使用。<br>
                        6、订购用户登录4G网络享受4G网络速率；用户需持有5G终端（手机）登录5G网络，在理想状态下可达到5G升级包对应的最高速率，但用户实际体验速率受网络环境、用户位置、同一时间上网用户数、终端、业务等因素的影响可能会低于最高速率。<br>
                        7、在5G高速率下，流量消耗会比较快，如果流量不够，可订购流量包或在手机设置自行选择4G网络模式。<br>
                        8、达量限速套餐用户，在限速前订购5G升级包，按订购5G升级包包含流量值提高一次限速阈值；在限速后订购升级包，订购后打开限速，升级包包含流量消费完后限速。限速之前均可享受5G优享服务。达量封顶套餐和王卡套餐在未关闭上网功能状态下均可享受5G上网服务，计算封顶阈值时5G升级包流量算套内流量。<br>
                    </div>
                    <div class="coupon-contain" v-if="navShow3">
                        1、什么用户可以订购5G升级包？<br>
                        答：99元5G升级包4G套餐移网用户可订购，69元5G升级包月费16元及以上套餐用户可订购，49元5G升级包月费49元及以上套餐用户可订购，29元5G升级包月费56元及以上套餐用户可订购，19元5G升级包月费66元及以上套餐用户可订购。主副卡仅限主卡订购，副卡不能订购；承诺低消用户可订购，5G升级包月费计入低消；融合共享版用户迁转到组合版产品后订购；2、3G套餐用户迁转到4G套餐后可订购；5G套餐用户不可订购。<br>
                        2、畅爽冰激凌5G套餐用户、腾讯王卡5G套餐用户可以订购5G升级包吗？<br>
                        答：以上5G套餐用户已包含5G优享服务或5G极速服务，无需再订购。<br>
                        3、订购5G升级包用户上网速率能达到对应的最高速率吗？<br>
                        答：订购用户登网4G网络享受4G网络速率；登录5G网络，用户需持有5G终端（手机）在理想状态下可达到5G升级包对应的峰值速率，但实际体验速率受网络环境、用户位置、同一时间上网用户数、终端、业务等因素的影响可能会低于峰值速率。<br>
                        4、5G升级包如何退订？<br>
                        答：4G套餐订购用户如需取消订购，用户在【手机营业厅-首页-搜索-5G升级包退订】中进行退订，次月生效。<br>
                        5、5G升级包订购用户变更套餐需要取消订购吗？<br>
                        答：订购用户如在档内变更为4G套餐，延续5G升级包订购；如低于档位下限变更为4G套餐，提示用户取消5G升级包后办理变更；如变更为5G套餐，提示用户取消5G升级包后办理变更，5G套餐包含相应的5G速率服务。<br>
                    </div>
                </div>
            </div>
        </div>
        <div class="onOrder" @click="onOrder">
            <div class="weui-btn">立即订购</div>
        </div>
        <van-dialog v-model="show2" :show-confirm-button='false' :close-on-click-overlay='true'>
            <div class="show1">
                <div class="tips-title">
                    订购确认
                </div>
                <div class="tips-content">
                    业务名称：{{dataJson.commName}}
                </div>
                <div class="tips-content">
                    消费标准：{{dataJson.price}}
                </div>
                <!-- <div class="tips-select">
                    <span>生效时间：</span>
                    <van-radio-group v-model="radioDate" direction="horizontal" @change='changeRedioDate'>
                        <van-radio name="1" checked-color="#ff990a" icon-size="16px">立即生效</van-radio>
                        <van-radio name="2" checked-color="#ff990a" icon-size="16px">次月生效</van-radio>
                    </van-radio-group>
                </div> -->
                <div>
                    <input type="number" name="phone" v-model="phone" maxlength="11" class="ser-css" placeholder="请输入手机号">
                    <div style="width: 100%; display:flex; justify-content: space-between; margin-top: 0.4rem;">
                        <input id="yanzhengma_confrim" maxlength="6" v-model="yzm" placeholder="请输入验证码" class="yzm-css">
                        <input id="huoquyan_confirm" type="button" v-if="onSecFlag" @click="onSec" value="获取验证码" class="get-yzm-css">
                        <div class="get-yzm-css" v-if="!onSecFlag">
                            <span >{{onSecDate}}秒后重新获取</span>
                        </div>
                    </div>
                </div>
                <div class="order-css" @click="onquery">确认</div>
            </div>
        </van-dialog>
        <van-dialog v-model="show3" :show-confirm-button='false'>
            <div class="show1">
                <div class="tips-title">
                    温馨提示
                </div>
                <div class="tips-content">
                    开通号码：{{phone}}
                </div>
                <div class="tips-content">
                    开通产品：{{dataJson.commName}}
                </div>
                <div class="tips-content">
                    订单号：{{dataJson.orderId}}
                </div>
                <div class="tips-content_toast">
                    您的订购请求已受理，具体订购结果请以短信通知为准，感谢您的支持，祝您生活愉快！
                </div>
                <div class="order-css" @click="onquery2">确认</div>
            </div>
        </van-dialog>
        <van-dialog v-model="show4" :show-confirm-button='false' :close-on-click-overlay='true'>
            <div class="show1">
                <div class="tips-title">
                    温馨提示
                </div>
                <div class="tips-content_toast">
                    您的套餐目前不支持订购该产品，请选择其他流量包产品！
                </div>
                <div class="order-css" @click="onquery3">确认</div>
            </div>
        </van-dialog>
        <van-dialog v-model="show5" :show-confirm-button='true' :close-on-click-overlay='true'>
            <div class="show1">
                <div class="tips-title">
                    分享
                </div>
                <div class="qRCode">
                    <div class="qrcode_box">
                        <div  id="qrcode" ref="qrCodeUrl" >
                            <!-- 二维码框 -->
                        </div>
                    </div>
                    <div class="fot">
                        流量包订购
                    </div>
                </div>
            </div>
        </van-dialog>
    </div>
</template>
<script>
/**
 * name: 流量包详情页
 */
import Api from '../../../api/apiFlowPacket'
import QRCode from 'qrcodejs2'
export default {
    name:'flowDetail',
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
            classId:'',
            staffId:'',
            jsonData:[],
            show2:false,
            show3:false,
            show4:false,
            show5:false,
            radioDate:'2',
            phone:'',
            phoneFlag:false,
            yzm:'',
            onSecFlag: true,
            onSecDate:59,
            navTitle:[
                {
                    name:'业务说明',
                    id:1
                },
                {
                    name:'温馨提示',
                    id:2
                },
                {
                    name:'常见问题',
                    id:3
                }
            ],
            navActive:1,
            navShow1:true,
            navShow2:false,
            navShow3:false,
            busiType:'',
            jfproductid:'',
            dataJson:{},
            orderCommitJson:{}
        }
    },
    watch:{
        phone(val){
            if(val == '' || !(/^1[3456789]\d{9}$/.test(val)) || val.length != 11){
                this.phoneFlag = true
            }else{
                this.phoneFlag = false
            }
        }
    },
    created(){
        this.init()
    },
    methods: {
        init(){
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
                    api.init(this.staffId).then(resultData => {
                        this.global.loadingStop()
                        if(resultData.data.msgFlag == "0"){
                            this.selectInit()
                        }else{
                            alert("用户信息获取失败：请重新打开！");
                            return;
                        }
                    }).catch(error => {
                        this.global.loadingStop()
                        alert(error)
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
                let api = new Api()
                // this.showZzc = true
                this.global.loadingStart("加载中。。。")
                api.init(this.staffId).then(resultData => {
                    this.global.loadingStop()
                    if(resultData.data.msgFlag == "0"){
                        this.selectInit()
                    }else{
                        alert("用户信息获取失败：请重新打开！");
                        return;
                    }
                }).catch(error => {
                    this.global.loadingStop()
                    alert(error)
                })
            }
        },
        selectInit(){
            this.global.loadingStart("加载中。。。")
            let str = window.location.href.split('#')[0]
            let classStr = str.split('?')[1] ? str.split('?')[1]:''
            let arr;
            if (classStr){
                arr = classStr.split('&')
            }else{
                arr = []
            }
            arr.map(item => {
                if(item.indexOf('commId') != -1){
                    this.jfproductid = item.split('=')[1]
                }else if(item.indexOf('busiType') != -1){
                    this.busiType = item.split('=')[1]
                }
            })

            // this.jfproductid = '1585874280886469'
            // this.busiType = '5G'
            let api = new Api()
            api.qryCbssPromByProductIdLimit(this.busiType, this.jfproductid).then(result => {
                console.log("qryCbssPromByProductIdLimit", result)
                this.global.loadingStop()
                if(!(result.data.msgFlag == '0')) {
                    var errmsg=result.data.errmsg;
                    if(errmsg!=null && errmsg.indexOf("根据productId没有查询到对应的商品数据")>0){
                        this.show4 = true
                        return;
                    }else{
                        alert("可选流量包获取失败："+result.data.errmsg);
                    }
                    return;
                }
                let resultJson = result.data.resultJson;
                let rows=resultJson.rows[0];
                let arr = rows.description.split('-')
                this.$set(this.dataJson, 'commName', rows.commName) // 产品名
                this.$set(this.dataJson, 'price', arr[0]) // 价格
                this.$set(this.dataJson, 'busiType', arr[1]) // 流量
                this.$set(this.orderCommitJson, 'promtheme', rows.commName)
                this.$set(this.orderCommitJson, 'promid', rows.commId)
                this.$set(this.orderCommitJson, 'promcode', rows.commCode)
                this.$set(this.orderCommitJson, 'prompriceval', '0')
                this.$set(this.orderCommitJson, 'remoteTag', '1')
                if(rows.commType == '111'){
                    this.$set(this.orderCommitJson, 'sceneType', '62')
                    this.$set(this.orderCommitJson, 'busyType', rows.commType)
                }else{
                    this.$set(this.orderCommitJson, 'sceneType', '63')
                    this.$set(this.orderCommitJson, 'busyType', '110')
                }
                this.$set(this.orderCommitJson, 'source', '')
                this.$set(this.orderCommitJson, 'wo', '')
            }).catch(err => {
                this.global.loadingStop()
                alert(err)
            })

        },
        // 分享
        fenxiang(){
            this.show5 = true
            let codeHtml = this.$refs.qrCodeUrl;
            if(codeHtml){
                codeHtml.innerHTML  = "";
            }
            let url = window.location.href
            this.$nextTick(() => {
                let qrcode = new QRCode('qrcode', {
                    width: 200,// 宽度
                    height: 200,  // 高度
                    text: url, // 二维码内容
                })
            });
        },
        // tab  切换
        onNavTab(item){
            this.navActive = item.id
            if(item.id == 1){
                this.navShow1 = true
                this.navShow2 = false
                this.navShow3 = false
            }else if(item.id == 2){
                this.navShow1 = false
                this.navShow2 = true
                this.navShow3 = false
            }else{
                this.navShow1 = false
                this.navShow2 = false
                this.navShow3 = true
            }
        },
        // // 生效时间  单选框
        // changeRedioDate(val){
        //     console.log("changeRedioDate",val)
        // },
        // 获取验证码
        onSec(){
            if(this.phone && !this.phoneFlag){
                let comData = this.checkMobile(this.phone)
                if(comData.status){
                    if(comData.data.name == "ChinaUnion"){  // 联通
                        this.global.loadingStart('正在获取验证码。。。')
                        let api = new Api()
                        api.userDataCheck(this.phone).then(result => {
                            var resultJson = null;
                            try {
                                resultJson = result.data;
                            } catch (e) {}
                            if (result.data.msgFlag != "0") {
                                if (resultJson == null || resultJson.code == null || resultJson.detail == null) {
                                    //同时存在detail和errmsg报错时按detail提示
                                    this.global.loadingStop()
                                    alert(result.data.errmsg);
                                    return false;
                                }
                            }

                            if (resultJson != null) {
                                this.onSecFlag = false
                                let setTime=setInterval(() => {
                                    this.onSecDate --
                                    if(this.onSecDate == 0){
                                        this.onSecFlag = true
                                        this.onSecDate = 59
                                        clearInterval(setTime)
                                    }
                                }, 1000);
                                api.sendMsg(this.phone).then(res => {
                                    this.global.loadingStop()
                                    if (res.data.msgFlag == "0") {
                                        this.$toast('发送成功！')
                                    } else {
                                        alert(res.data.errmsg);
                                    }
                                }).catch(errData => {
                                    this.global.loadingStop()
                                    alert(errData)
                                })
                            } else {
                                this.global.loadingStop()
                                alert("没有查询到用户信息");
                                return false;
                            }
                        }).catch(err => {
                            this.global.loadingStop()
                            alert(err)
                        })
                    }else if(comData.data.name == "ChinaMobile"){ // 移动
                        this.$toast('请输入正确的联通号码！')
                        return;
                    }else if(comData.data.name == "ChinaTelcom"){ // 电信
                        this.$toast('请输入正确的联通号码！')
                        return;
                    }else{  // 其他
                        this.$toast('请输入正确的联通号码！')
                        return;
                    }
                }else{
                    this.$toast(comData.msg)
                    return;
                }

            }else{
                this.$toast('请输入正确的手机号！')
                return;
            }

        },
        // 手机号校验
        checkMobile(telphone){
            let isChinaMobile =  /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/; //移动方面最新答复
            let isChinaUnion = /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/; //向联通微博确认并未回复
            let isChinaTelcom = /^0?(133|149|153|17[34]|177|18[01]|189|199)\d{8}$/; //1349号段 电信方面没给出答复，视作不存在
            let isOtherTelphone = /^170\\d{7}$/;//其他运营商
            if(telphone.length !== 11){
                return this.setReturnJson(false, '未检测到正确的手机号码');
            }else{
                if(isChinaMobile.test(telphone)){
                    return this.setReturnJson(true, '移动', {name: 'ChinaMobile'});
                }else if(isChinaUnion.test(telphone)){
                    return this.setReturnJson(true, '联通', {name: 'ChinaUnion'});
                }else if(isChinaTelcom.test(telphone)){
                    return this.setReturnJson(true, '电信', {name: 'ChinaTelcom'});
                }else if(isOtherTelphone.test(telphone)){
                    var num = isOtherTelphone.exec(telphone);
                    return this.setReturnJson(true, '', {name: '其他'});
                }else{
                    return this.setReturnJson(false, '未检测到正确的手机号码');
                }
            }
        },
        setReturnJson(status, msg, data){
            if(typeof status !== 'boolean' && typeof status !== 'number'){
                status = false;
            }
            if(typeof msg !== 'string'){
                msg = '';
            }
            return {
                'status': status,
                'msg': msg,
                'data': data
            };
        },

        // 立即订阅
        onOrder(){
            this.show2 = true
        },

        // 确定下单
        onquery(){
            if(!this.phone || this.phoneFlag){
                this.$toast('请输入正确的手机号！')
                return;
            }
            if(!this.yzm){
                this.$toast('请输入验证码！')
                return;
            }
            this.$set(this.orderCommitJson, 'serialNumber', this.phone)
            this.$set(this.orderCommitJson, 'checkNum', this.yzm)
            this.global.loadingStart("下单中。。。")
            let api = new Api()
            api.orderCommit(this.orderCommitJson).then(res => {
                if(res.data.msgFlag == '0'){
                    let data = {
                        ordersId: res.data.resultJson.orderId,
                        origTotalFee:'0',
                        serialNumber:this.phone,
                        source:0
                    }
                    this.$set(this.dataJson, 'orderId', res.data.resultJson.orderId)
                    api.zeroOrderinfoSubTg(data).then(result => {
                        if(result.data.msgFlag == '0'){
                            this.global.loadingStop()
                            this.show2 = false
                            this.show3 = true
                            api.getProcessData(res.data.resultJson.orderId).then(ress => {

                            })
                        }else{
                            this.global.loadingStop()
                            alert("订单生成失败："+result.data.errmsg);
                        }
                    })
                }else{
                    this.global.loadingStop()
                    alert("订购异常："+res.data.errmsg);
                }
            }).catch(err => {
                this.global.loadingStop()
                alert(err)
                return
            })

        },
        onquery2(){
            this.show3 = false
            this.$router.go(0)
        },
        onquery3(){
            this.show4 = false
        }
    }
}
</script>
<style lang="scss" scoped>
.flowDetail{
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    position: relative;
    padding-bottom: 70px;
    .fenxiang{
        position: fixed;
        right: 4vw;
        top: 2vh;
        width: 15vw;
        height: 30px;
        line-height: 25px;
        border-radius: 15px;
        color: #fff;
        text-align: center;
        font-size: 4vw;
        background-color:#000;
        opacity: 0.3

    }
    .onOrder{
        height: 54px;
        line-height: 54px;
        background-color: #fff;
        position: fixed;
        bottom: 0px;
        left: 0;
        width: 100%;
        display: flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        text-align: center;
        z-index: 30;
        margin: 0 auto;
        .weui-btn{
            width: 90%;
            height: 40px;
            font-size: 14px;
            color: white;
            margin: 3px auto;
            line-height: 40px;
            top: 0;
            left: 0;
            text-align: center;
            box-sizing: border-box;
            border-radius: 40px;
            display: block;
            position: relative;
            padding-left: 14px;
            padding-right: 14px;
            text-decoration: none;
            overflow: hidden;
            background-image: -webkit-linear-gradient(left,#fe962d,#fca92d);
            box-shadow: 0 5px 10px rgba(253,161,25,0.3);
        }
    }
    .content{
        background-color: #fff;
        margin-top: 10px;
        width: 100%;
        border-radius: 6px;
        padding: 10px;
        box-sizing: border-box;
        .item_title{
            width: 100%;
            position: relative;
            margin-bottom: 10px;
            .title_img{
                height: 4vh;
                float: left;
            }
            .title_name{
                width: 100%;
                font-size: 4vw;
                display: flex;
                justify-content: center;
            }
        }
        .item_content{
            width: 100%;
            padding: 0 4vw;
            box-sizing: border-box;
            .content_shuoming{
                display: flex;
                .shuoming_fee{
                    flex:1;
                    font-size: 3vw;
                }
                .shuoming_tui{
                    margin: 2vh 0vw;
                    font-size: 3vw;
                    padding: 1vh 0;
                    box-sizing: border-box;
                    width: 100%;
                    text-align: center;
                    background-color: #fcf6ed;
                    color: #ff990a;
                }
            }
            .content_main{
                .main_nav{
                    display: flex;
                    justify-content: space-around;
                    .main_nav_title{
                        width: 90%;
                        height: 36px;
                        line-height: 36px;
                        font-size: 13px;
                        background-color: #f5f4f9;
                        box-sizing: border-box;
                        text-align: center;
                        border-radius: 36px;
                        color: #979797;
                    }
                    .nav_title_active{
                        background-image: -webkit-linear-gradient(left,#fe932d,#fda82d);
                        box-shadow: 0 3px 9px rgba(254,153,45,0.4);
                        color: #fff;
                    }
                }
                .coupon-contain{
                    font-size: 12px;
                    line-height: 1.8;
                    text-align: justify;
                    color: #666666;
                    margin-top: 16px;
                }
            }
        }

    }
    .show1{
        padding: 20px 40px;
        box-sizing: border-box;
        .tips-title{
            text-align: center;
            // color: #73B2FA;
            font-size: 5vw;
            margin-bottom: 3%;
        }
        .tips-content{
            font-size: 3vw;
            margin-top: 1%;
            font-weight: bold;
        }
        .tips-content_toast{
            font-size: 3vw;
            margin-top: 3%;
            font-weight: bold;
            color: red;
        }
        .tips-select{
            display: flex;
            font-size: 3vw;
            margin-top: 1%;
            font-weight: bold;
        }
        .tips_yb{
            width: 100%;
            margin-top: 2%;
            font-size: 3vw;
            display: flex;
            justify-content: space-around;
            align-items: center;
        }
        .order-css{
            width: 100%;
            font-size: 4vw;
            text-align: center;
            padding: 4% 0;
            color: #ffffff;
            background-image: -webkit-linear-gradient(left,#fe962d,#fca92d);
            margin-top: 5%;
            border-radius: 5px;
        }
        .ser-css{
            padding: 3vw 0;
            width: 100%;
            border: 1px solid #ffc301;
            margin-top: 3vw;
            border-radius: 5px;
            outline: none;
            text-indent: 15px;
            font-size: 3.5vw;
        }
        .yzm-css{
            padding: 3vw 0;
            width: 50%;
            border: 1px solid #ffc301;
            border-radius: 5px;
            outline: none;
            text-indent: 15px;
            font-size: 3.5vw;

        }
        .get-yzm-css{
            margin-left: 5%;
            width: 43%;
            text-align: center;
            color: #fff;
            padding: 3vw 0;
            border: none;
            background-image: -webkit-linear-gradient(left,#fe962d,#fca92d);
            border-radius: 5px;
            -webkit-appearance: none;
            font-size: 3.2vw;
        }
        .qRCode{
            width: 100%;
            height: 22rem;
            position: relative;
            .qrcode_box{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 80%;
                height: 70%;
                #qrcode{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .fot{
                position: absolute;
                bottom: 5%;
                width: 100%;
                text-align: center;
            }
        }
    }
}
</style>
