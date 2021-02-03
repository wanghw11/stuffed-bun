<template>
    <div id="broadband-iptv">
        <!-- <div class="top">
            <div class="topImage" @click="comback">
                <img src="../../../assets/icon/comback.png" alt="">
            </div>
            <div class="topTitle">
                {{title}}
            </div>
        </div> -->
        <userYZ @getHtmlData='getHtmlData' @getDatas='getDatas'></userYZ>
        <!-- <user-msg :msgData='htmlData'></user-msg> -->
        <goods-msg :msgData='htmlData'></goods-msg>

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
                    <span class="item-name">预约日期：</span>
                    <div class="item-content">
                        <van-cell
                        :value="timeValue"
                        @click="showPopup" />
                        <van-popup v-model="show" position="bottom">
                            <van-datetime-picker
                                type="datetime"
                                v-model="currentDate"
                                title="选择时间"
                                :loading="isLoadingShow"
                                :max-date="maxDate"
                                :formatter="formatter"
                                @cancel="show = false"
                                @confirm="confirmPicker"
                            />
                        </van-popup>
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
            <div class="h3" style="line-height:63px;margin-left: 15px;">本次收费：<span style="font-size: 20px;color: #ff6025;">{{totalPriceStr}}元</span></div>
            <div class="right btn" @click="onQuery" style="width: 30%;">确认</div>
            <div class="clearfix"></div>
        </footer>
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Loading from '../../common/loading'
import Phone from '../../common/phone'
import goodsMsg from '../../common/goodsMsg'
import Api from '../../../api/apiIPTV'
import Api2 from '../../../api/apiHome'
import userYZ from '../../common/kuandaiCommon/userYZ'
import { Dialog } from 'vant';
export default {
    name:'broadband-iptv',
    computed:{
        token(){
            if(sessionStorage.getItem('tokenId')){
                return sessionStorage.getItem('tokenId')
            }else{
                return ''
            }
        },
        address(){
            if(sessionStorage.getItem('address')){
                let add = JSON.parse(sessionStorage.getItem('address'))
                return add.areaname
            }else{
                return '请选择城市'
            }
        },
    },
    data(){
        return {
            showZzc: false, // loading 开关
            searchData:'',  // 搜索框  信息
            dialogShow: false, // 效验  身份认证  开关
            rzShow:false,
            dialogData: '', // 身份证输入信息
            xuanz: false, // 下拉三角1
            xuanz1: false,
            isLoadingShow: true,  // 时间选择  开关
            timeValue: '请选择时间', // 选择时间默认
            show: false, //时间选择器控制变量
            maxDate: new Date(2020, 12, 31), // 规定时间选择器最大日期
            remak:'', // 备注信息
            totalPriceStr: 0,
            currentDate:new Date(),
            checked:false, // 宽带查询  开关
            datas: {},  // 接口返回的客户宽带信息
            phone: '',
            phoneYanzheng: '', // 验证码
            onSecFlag: true,
            onSecDate: 59,
            htmlData: {},
            isMessage1: false, // 客户信息  开关
            isMessage2: false, // 客户信息  开关
            contactPhone:'',// 加装iptv电话
            loginFlag: false,
            classId:'',
            staffId:''
        }
    },
    components:{
        Phone,
        userYZ,
        Loading,
        goodsMsg
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            if(this.token){
                let api2 = new Api()
                let api3 = new Api2()
                api3.qrcodeSelectTokenId(this.token).then(res => {
                    if(res.data.msgFlag == '0') {
                        this.classId = res.data.resultJson[0].classId
                        this.staffId = res.data.resultJson[0].staffId
                        this.$store.commit('updataTokenJson', res.data.resultJson[0])
                        this.$store.commit('updataStaffId',res.data.resultJson[0].staffId)
                        this.$store.commit('updataClassId',res.data.resultJson[0].classId)
                        sessionStorage.setItem('staffId',res.data.resultJson[0].staffId)
                        sessionStorage.setItem('classId',res.data.resultJson[0].classId)
                        sessionStorage.setItem('tokenJson',JSON.stringify(res.data.resultJson[0]))
                        api2.init(this.staffId).then(res => {
                            console.log("222222222222", res)
                        })
                    }else{
                        alert(res.data.errmsg)
                        return
                    }
                })
            }else{
                this.classId = sessionStorage.getItem('classId')
                this.staffId = sessionStorage.getItem('staffId')
                let api2 = new Api()
                api2.login(this.staffId).then(res => {
                    console.log("222222222222", res)
                })
            }
        },
        comback(){
            this.$router.go(-1)
        },
        getHtmlData(val){
            this.htmlData = val
            console.log("1111111111",val)
        },
        getDatas(val){
            console.log("111111111111",val)
            this.datas = val
            this.totalPriceStr = val.tradeFee
        },
        // 获取联系电话   加装iptv的配送电话
        getPhone(val){
            this.contactPhone = val
        },
        // 获取时间
        showPopup () {
            this.show = true
            this.isLoadingShow = true
            setTimeout(() => {
                this.isLoadingShow = false
            }, 500)
        },
        // 确认选择的时间
        confirmPicker (val) {
            let year = val.getFullYear()
            let month = val.getMonth() + 1
            let day = val.getDate()
            let hour = val.getHours()
            let minute = val.getMinutes()
            if (month >= 1 && month <= 9) { month = `0${month}` }
            if (day >= 1 && day <= 9) { day = `0${day}` }
            if (hour >= 0 && hour <= 9) { hour = `0${hour}` }
            if (minute >= 0 && minute <= 9) { minute = `0${minute}` }
            this.timeValue = `${year}-${month}-${day} ${hour}:${minute}`
            this.show = false
        },
        // 选项格式化函数
        formatter (type, value) {
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
        onQuery(){
            //请先校验主号码
            if(!this.datas.phoneNum){
                this.$toast("请先校验主号码")
                return;
            }
            //是否有IPTV产品
            if("1"===this.datas.iPTV){
                this.$toast("该宽带无可办理的IPTV商品！")
                return;
            }
            //是否有IPTV产品
            if("1"!=this.datas.iPTVChild){
                this.$toast("该宽带无可办理的机顶盒！")
                return;
            }
            if("1"!=this.datas.isHaveKey){
                this.$toast("请先完成证短信验证码认证!")
                return;
            }
            //入网信息
            if(this.contactPhone == ''){
                this.$toast("请输入联系人电话！")
                return
            }
            if(this.timeValue == '请选择时间'){
                this.$toast("请选择预约时间！")
                return
            }

            let resultData = JSON.stringify(this.datas.result)
            let oldCustInfo = JSON.stringify(this.datas.oldCustInfo)
            this.$set(this.datas, 'oldCustInfo', oldCustInfo)
            this.$set(this.datas, 'source', this.classId)
            this.$set(this.datas, 'result', resultData)
            this.$set(this.datas, 'MSG_PHONE', this.datas.phone)
            this.$set(this.datas, 'remarks', this.remak)
            this.$set(this.datas, 'contactPhone', this.contactPhone)
            this.$set(this.datas, 'appointmentTime', this.timeValue + ':00')
            this.$set(this.datas, 'tradeFee', this.totalPriceStr)
            this.$set(this.datas, 'open4gMode', 1)
            this.$set(this.datas, 'remoteTag', '1')
            this.$set(this.datas, 'isPrint', '0')
            this.loadingStart("加载中。。。")
            let api = new Api()
            api.broadbandAddIptv(this.datas).then(res => {
                console.log('1111111111',res)
                this.loadingStop()
                if(res.data.msgFlag == '0'){
                    let result = res.data.resultJson
                    if(parseInt(this.totalPriceStr)==0){
                        api.zeroOrderinfoSubTg(this.datas).then(res2 =>{
                            if(res2.data.msgFlag == '0'){
                                Dialog.alert({
                                    message: '下单成功！您的订单号码: '+ result.orderId + '！<br/>请耐心等待施工人员上门服务！',
                                }).then(() => {
                                    this.$router.go(0)
                                });
                            }else{
                                alert("订单生成失败：请重新下单");
                                return;
                            }
                        })
                    }else{
                        Dialog.alert({
                            message: '下单成功！您的订单号码: '+ result.orderId + '！<br/>请耐心等待施工人员上门服务！',
                        }).then(() => {
                            this.$router.go(0)
                        });
                    }
                    
                }else{
                    // this.$toast(res.data.errmsg)
                    Dialog.alert({
                        message: res.data.errmsg+',请重新下单！',
                    }).then(() => {
                       this.$router.go(0)
                    });
                }
            }).catch(error => {
                Dialog.alert({
                        message: error.data.errmsg,
                    }).then(() => {

                    });
            })
        }

    }
}
</script>

<style lang="scss" scoped>
#broadband-iptv{
    margin-bottom: 80px;
    box-sizing: border-box;
    width: 100%;
    background-color: #f2f2f2;
    .top{
        height: 6vh;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: #fff;

        .topImage{
            height: 50%;
            position: absolute;
            top: 50%;
            left: 20px;
            transform: translateY(-50%);
            img{
                height: 100%;
            }
        }
        .topTitle{
            text-align: center;
            line-height: 6vh;
            font-size: 1.2rem;
        }
    }
    .xuanzShun{
        transform: rotate(180deg);
    }
    .van-overlay{
        z-index: 0 !important;
    }

    .van-cell{
        padding: 5px 8px;
        background-color: #f7f8fa;
    }
    .van-action-sheet{
        height: 60%;
    }




    .title{
        background-color: #fff;
        margin: 10px;

        border-radius: 5px;
        .title-s{
            margin: 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            .secah {
                width: 75%;

                .van-search{
                    padding: 10px 0;
                }
            }

        }

    }
    .xiaoyanBtn{
                margin-left: 10px;
                margin-right: 10px;
                flex:1;
                .search-btn{
                    background:#3f80f7;
                    color: white;
                    font-weight: bold;
                    text-align: center;
                    border-radius: 4px;
                    padding: 5px;
                    line-height: 24px;
                    font-size: 14px;
                }

            }
    .userMsg{
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        margin: 10px;
        border-radius: 5px;
        .cor{
            background-color: #f7f8fa;
        }
        .content{
            padding: 10px;
            box-sizing: border-box;
            .content-item{
                display: flex;
                // align-items: center;
                margin-bottom: 5px;
                // font-size: 12px;
                .item-name{
                    flex:3;
                }
                .item-content{
                    flex:8;
                    .van-cell{
                        padding: 0;
                        background-color: #fff;
                    }
                }
            }
        }
    }
    footer{background: #f2f2f2; position: fixed;bottom: 0;width:100%;  }
    footer .btn{margin: 5px 15px;}
    .btn{background:#3f80f7;color: white;font-weight: bold;padding: 14px;text-align: center;border-radius: 4px;margin: 20px 20px 0;}
    .clearfix{clear:both;}
    .left{float: left;}
    .right{float: right;}
    .h3{font-size: 16px;float: left;font-weight: 600;}
}
</style>
