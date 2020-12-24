<template>
    <div class="intention">
        <!-- 轮播图 -->
        <div v-if="displayFlag19">
            <div style="width:100%">
                <van-swipe class="my-swipe" indicator-color="white">
                    <van-swipe-item v-for="(item, index) in swiperList" :key="index">
                        <div style="width:100%;box-sizing: border-box;">
                            <img style="width:100%;" :src="item" alt="">
                        </div>
                    </van-swipe-item>
                </van-swipe>
            </div>
        </div>
        <div class="content">
            <div class="cont">
                <div class="content_title" >
                    <div v-if="displayFlag23">
                        {{orderTitle}}
                    </div>
                    <div class="title_staff" v-if="tokenAddr" @click="clearSess()">
                        选择受理城市
                    </div>
                </div>
                <!-- 产品信息 -->
                <div class="content_items" v-if="displayFlag26">
                    <div class="item1">
                        产品信息
                    </div>
                    <div class="item2">
                        <div>{{productInfo}}</div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <!-- 意向信息 -->
                <div class="content_items" v-if="displayFlag25">
                    <div class="item1">
                        意向信息
                    </div>
                    <div class="item2">
                        <div>{{offerName}}</div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <!-- 姓名 -->
                <div class="content_items" v-if="displayFlag10">
                    <div class="item1">
                        用户姓名
                    </div>
                    <div class="item2">
                        <input type="text" v-model='custName' placeholder="请输入用户姓名">
                    </div>
                </div>
                <!-- 联系电话 -->
                <div class="content_items" v-if="displayFlag15">
                    <div class="item1">
                        联系电话
                    </div>
                    <div class="item2">
                        <div><input type="text" v-model='serialNumber' placeholder="请输入联系电话"></div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <!-- 身份证号 -->
                <div class="content_items" v-if="displayFlag11">
                    <div class="item1">
                        身份证号
                    </div>
                    <div class="item2">
                        <div><input type="text" v-model='psptId' placeholder="请输入身份证号"></div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <!-- 证件地址 -->
                <div class="content_items" v-if="displayFlag12">
                    <div class="item1">
                        证件地址
                    </div>
                    <div class="item2">
                        <div><input type="text" v-model='psptAddress' placeholder="请输入证件地址"></div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <!-- 意向类型 -->
                <div class="content_items" v-if="displayFlag21">
                    <div class="item1">
                        意向类型
                    </div>
                    <div class="item2">
                        <div><input type="text" readonly onfocus="this.blur()" :value='intention.name' @click="onSelect()" placeholder="请选择意向单类型"></div>
                        <van-action-sheet v-model="secFlag" title="意向单类型" >
                            <div class="content_addr">
                                <div class="addr_cont">
                                    <div class="addr_cont_item">
                                        <div class="province" v-for="(item, index) in intentionList" :class="{active : active2 == item.value}" :key="index" @click="onSelectClick(item)">{{item.name}} </div>
                                    </div>
                                </div>
                                <div class="confirm">
                                    <div class="confirmOn" @click="secConfirm">
                                        确定
                                    </div>
                                </div>
                            </div>
                        </van-action-sheet>
                    </div>
                </div>
                <!-- 预约日期 -->
                <div class="content_items" v-if="displayFlag14">
                    <div class="item1">
                        预约日期
                    </div>
                    <div class="item2">
                        <van-cell
                        :value="appointmentTime"
                        @click="showPopup" />
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
                
                <!-- 城市 -->
                <div class="content_items" v-if="displayFlag17">
                    <div class="item1">
                        所在城市
                    </div>
                    <div class="item2">
                        <address-comm-2 @getAddress='getAddress'/>
                        
                    </div>
                </div>
                <!-- 详细地址 -->
                <div class="content_items" v-if="displayFlag13">
                    <div class="item1">
                        详细地址
                    </div>
                    <div class="item2">
                        <div><input type="text" v-model='address' placeholder="请输入详细地址"></div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <!-- 备注 -->
                <div class="content_items" v-if="displayFlag18">
                    <div class="item1">
                        备注信息
                    </div>
                    <div class="item2">
                        <div><input type="text" v-model='remark' placeholder="备注信息"></div>
                        <!-- <div class="queryPhone" v-if="phoneShow">请输入正确的手机号</div> -->
                    </div>
                </div>
                <div class="button">
                    <div class="btn" @click="commit">
                        立即预约
                    </div>
                </div>
            </div>
        </div>
        <!-- 下图 -->
        <div class="bottomImg" style="width:100%" v-if="displayFlag20">
            <img :src="item" style="width:100%" v-for="(item, index) in bottomImg" :key="index" alt="">
        </div>
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Api from '../../../api/apiIntention'
import Api2 from '../../../api/api'
import Api3 from '../../../api/apiHome'
import Loading from '../../common/loading'
import addressComm from '../../common/addressComm2'
import AddressComm2 from '../../common/addressComm2.vue'
export default {
    components:{
        AddressComm2,
        Loading
    },
    computed:{
        menuId(){
            if(sessionStorage.getItem('menuId')){
                return sessionStorage.getItem('menuId')
            }else{
                return ''
            }
        },
        token(){
            if(sessionStorage.getItem('tokenId')){
                return sessionStorage.getItem('tokenId')
            }else{
                return ''
            }
        },
    },
    watch:{
        serialNumber(val){
            if(val == '' || !(/^1[3456789]\d{9}$/.test(val)) || val.length != 11){
                this.phoneShow = true
            }else{
                this.phoneShow = false
            }
        }
    },
    data(){
        return {
            showZzc:false,
            cityDis:'disabled',
            tokenAddr:true,
            phoneShow: false,
            orderTitle: '',     // 23  标题
            serialNumber: '',    //   15  "联系电话"
            intention: '',    //  21  意向选择
            province:'',       //  22  省份
            city:'',          //   16  "装机地市"
            county:'',        //    17  "装机区县"
            bottomPicture:'',  //  20   下图
            topPicture:'',   //   19   上轮播图
            remark:'',        //  18   "备注信息"
            appointmentTime:'请选择时间', //  14  "预约时间"
            address:'',       //  13  "详细地址"
            psptAddress:'',  //  12   "证件地址"
            psptId:'',       // 11   "身份证号"
            custName:'',     //  10  "用户姓名"
            productInfo:'',  // 26  产品信息
            offerName:'',  // 26  产品信息
            
            // 地址  
            active:'',
            secFlag:false, // 意向选择
            active2:'',
            addrData:'',
 
            //  配置  项
            displayFlag10:false,
            displayFlag11:false,
            displayFlag12:false,
            displayFlag13:false,
            displayFlag14:false,
            displayFlag15:false,
            displayFlag16:false,
            displayFlag17:false,
            displayFlag18:false,
            displayFlag19:false,
            displayFlag20:false,
            displayFlag21:false,
            displayFlag22:false,
            displayFlag23:false,
            displayFlag25:false,
            displayFlag26:false,
            
            //  预约时间
            showDate: false,
            maxDate: new Date(2020, 12, 31),
            currentDate:new Date(),  // 时间选择框默认值
            isLoadingShow: true,  // 时间选择  开关
            
            intentionList:[],  // 意向选择项
            swiperList:[],
            bottomImg:[],
            productInfoId:'',
            productInfoData:'',
            downData:{}

        }
    },
    mounted(){
        this.init()
    },
    methods:{
        getAddress(json){
            this.addrData = JSON.parse(JSON.stringify(json))
        },
        clearSess(){
            if(sessionStorage.getItem('staffId')){
                this.$dialog.alert({
                    message:'是否重新选择受理城市？',
                    showCancelButton: true
                }).then(() => {
                    sessionStorage.removeItem('staffId')
                    this.$router.push('/getStaff2')
                }).catch(() => {

                })
            }
        },
        getSatff(){
            if(this.token){
                this.tokenAddr = false
                let api = new Api3()
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
                        this.getCanshu()
                    }else{
                        alert(res.data.errmsg)
                        return
                    }
                })
            }else{
                this.classId = sessionStorage.getItem('classId')
                this.staffId = sessionStorage.getItem('staffId')
                this.tokenAddr = true
                this.getCanshu()
            }
        },
        // 初始化
        getCanshu(){
            let data = {
                menuId:this.menuId,
                classId:this.classId
            }
            
            let api = new Api()
            api.queryPageElements(data).then(res => {
                this.showZzc = false
                if(res.data.msgFlag == '0'){
                    let dataAll = res.data.resultJson
                    dataAll.map(item => {
                        switch (item.columnName) {
                            case 'custName':
                                if(item.displayType != 0){
                                    this.displayFlag10 = true
                                }else{
                                    this.displayFlag10 = false
                                }
                                break;
                            case 'psptId':
                                if(item.displayType != 0){
                                    this.displayFlag11 = true
                                }else{
                                    this.displayFlag11 = false
                                }
                                break;
                            case 'psptAddress':
                                if(item.displayType != 0){
                                    this.displayFlag12 = true
                                }else{
                                    this.displayFlag12 = false
                                }
                                break;
                            case 'address':
                                if(item.displayType != 0){
                                    this.displayFlag13 = true
                                }else{
                                    this.displayFlag13 = false
                                }
                                break;
                            case 'appointmentTime':
                                if(item.displayType != 0){
                                    this.displayFlag14 = true
                                }else{
                                    this.displayFlag14 = false
                                }
                                break;
                            case 'serialNumber':
                                if(item.displayType != 0){
                                    this.displayFlag15 = true
                                }else{
                                    this.displayFlag15 = false
                                }
                                break;
                            case 'city':
                                if(item.displayType != 0){
                                    this.displayFlag16 = true
                                }else{
                                    this.displayFlag16 = false
                                }
                                break;
                            case 'addr':
                                if(item.displayType != 0){
                                    this.displayFlag17 = true
                                }else{
                                    this.displayFlag17 = false
                                }
                                break;
                            case 'remark':
                                if(item.displayType != 0){
                                    this.displayFlag18 = true
                                }else{
                                    this.displayFlag18 = false
                                }
                                break;
                            case 'topPicture':
                                if(item.displayType != 0){
                                    this.displayFlag19 = true
                                    this.swiperList = item.columnValue.split(',')
                                }else{
                                    this.displayFlag19 = false
                                }
                                break;
                            case 'bottomPicture':
                                if(item.displayType != 0){
                                    this.displayFlag20 = true
                                    this.bottomImg = item.columnValue.split(',')
                                }else{
                                    this.displayFlag20 = false
                                }
                                break;
                            case 'intention':
                                if(item.displayType != 0){
                                    this.displayFlag21 = true
                                    let str = item.columnValue.split(',')
                                    let arr = []
                                    if(str.length > 0){
                                        str.map(it => {
                                            let strItem = it.split('_')
                                            let obj = {
                                                name:strItem[1],
                                                value:strItem[0]
                                            }
                                            arr.push(obj)
                                        })
                                        this.intentionList = arr
                                    }
                                }else{
                                    this.displayFlag21 = false
                                }
                                break;
                            case 'province':
                                if(item.displayType != 0){
                                    this.displayFlag22 = true
                                }else{
                                    this.displayFlag22 = false
                                }
                                break;
                            case 'order_title':
                                if(item.displayType != 0){
                                    this.displayFlag23 = true
                                    this.orderTitle = item.columnValue
                                }else{
                                    this.displayFlag23 = false
                                }
                                break;
                            case 'offerId':
                                this.$set(this.downData, 'offerId', item.columnValue)
                                break;
                            case 'offerName':
                                if(item.displayType != 0){
                                    this.displayFlag25 = true
                                    this.offerName = item.columnValue
                                    this.$set(this.downData, 'offerName', item.columnValue)
                                }else{
                                    this.displayFlag25 = false
                                }
                                break;
                            case 'productInfo':
                                if(item.displayType != 0){
                                    this.displayFlag26 = true
                                    this.productInfo = item.columnValue.split('_')[1]
                                    this.productInfoId = item.columnValue.split('_')[0]
                                    let data = {
                                        commId:this.productInfoId,
                                        staffId:this.staffId
                                    }
                                    api.getInfo(data).then(res => {
                                        if(res.data.msgFlag == '0'){
                                            this.productInfoData = res.data.resultJson
                                            this.$set(this.downData, 'product', JSON.stringify(this.productInfoData))
                                            this.$set(this.downData, 'pid', this.productInfoId)
                                            this.$set(this.downData, 'pathName', this.productInfo)
                                            let qryCoCustInfoRsp = this.productInfoData.qryCoCustInfoRsp;
                                            let childCoInfo = qryCoCustInfoRsp.childCoInfo;
                                            let price = 0;
                                            for(let i = 0;i<childCoInfo.length;i++){
                                                let child = childCoInfo[i];
                                                let commPrice = parseInt(child.commPrice);
                                                price+=commPrice;
                                            }
                                            this.$set(this.downData, 'totalFee', price)
                                        }else{
                                            alert(res.data.errmsg)
                                        }
                                    })
                                }else{
                                    this.displayFlag26 = false
                                }
                                break;
                            default:
                                break;
                        }
                    })
                }else{
                    alert(res.data.errmsg)
                }
            }).catch(error => {
                this.$dialog.alert({
                    message:error
                }).then(() => {

                })
            })
            let data2 = {
                staffId:this.staffId
            }
            let data3 = {
                classId : this.classId,
                menuId : this.menuId
            }
            let list = [api.login(data2),api.queryPurposeConfig(data3)]
            this.$axios.all(list).then(
                this.$axios.spread((res2,res3) => {
                    if(res2.data.msgFlag != '0'){
                        alert(res2.data.errmsg)
                        return
                    }
                    if(res3.data.msgFlag == '0'){
                        this.$set(this.downData, 'inModeCode', res3.data.resultJson.inModeCode)
                        console.log("22222222222", res3)
                        this.$set(this.downData, 'sceneType', res3.data.resultJson.sceneType)
                        if(res3.data.resultJson.spare1){
                            this.$set(this.downData, 'spare1', res3.data.resultJson.spare1)
                        }
                        if(res3.data.resultJson.spare2){
                            this.$set(this.downData, 'spare2', res3.data.resultJson.spare2)
                        }
                        if(res3.data.resultJson.spare3){
                            this.$set(this.downData, 'spare3', res3.data.resultJson.spare3)
                        }
                        if(res3.data.resultJson.spare4){
                            this.$set(this.downData, 'spare4', res3.data.resultJson.spare4)
                        }
                    }else{
                        alert('请刷新重试')
                        return
                    }
                })
            ).catch(error => {
                this.$dialog.alert({
                    message:error
                }).then(() => {

                })
            })
        },
        init(){
            this.showZzc = true
            this.getSatff()
        },
        
        // 意向类型
        onSelectClick(val){
            this.intention = val
            console.log("2222222222",val)
            this.active2 = val.value
        },
        onSelect(val){
            this.secFlag = true
        },
        secConfirm(){
            this.secFlag = false
        },
        // 获取时间
        showPopup () {
            this.showDate = true
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
            this.appointmentTime = `${year}-${month}-${day} ${hour}:${minute}`
            this.showDate = false
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
        // 下单
        commit(){
            if(this.displayFlag10){
                if(this.custName != ''){
                    this.$set(this.downData, 'custName', this.custName)
                }else{
                    this.$toast('请输入姓名！')
                    return
                }
            }
            if(this.displayFlag15){
                if(this.serialNumber != '' && !this.phoneShow){
                    this.$set(this.downData, 'phone', this.serialNumber)
                }else{
                    this.$toast('请输入正确的联系电话！')
                    return
                }
            }
            if(this.displayFlag11){
                if(this.psptId != ''){
                    this.$set(this.downData, 'psptId', this.psptId)
                }else{
                    this.$toast('请输入身份证号！')
                    return
                }
            }
            if(this.displayFlag12){
                if(this.psptAddress != ''){
                    this.$set(this.downData, 'pspaddress', this.psptAddress)
                }else{
                    this.$toast('请输入证件地址！')
                    return
                }
            }
            if(this.displayFlag21){
                if(this.intention == ''){
                    this.$toast('请选择意向类型！')
                    return
                }else{
                    this.$set(this.downData, 'intention', this.intention.value)
                }
            }
            if(this.displayFlag14){
                if(this.appointmentTime == '请选择时间!'){
                    this.$toast('请选择预约日期!')
                    return
                }else{
                    this.$set(this.downData, 'appointmentTime', this.appointmentTime)
                }
            }
            if(this.displayFlag17){
                if(this.addrData == ''){
                    this.$toast('请选择区县!')
                    return
                }else{
                    this.$set(this.downData, 'postDistrictCode', this.addrData.areaid)
                    this.$set(this.downData, 'postDistrictName', this.addrData.areaName)
                }
            }
            if(this.displayFlag13){
                if(this.address == ''){
                    this.$toast('请输入详细地址!')
                    return
                }else{
                    let str = this.addrData.provinceName+this.addrData.cityName+this.addrData.areaName+this.address
                    this.$set(this.downData, 'postAddress', str)
                }
            }
            this.$set(this.downData, 'postCityCode', this.addrData.cityCode)
            this.$set(this.downData, 'postCityName', this.addrData.cityName)
            this.$set(this.downData, 'provinceCode', '76')
            this.$set(this.downData, 'provinceName', '河南')
            this.$set(this.downData, 'source', this.classId)
            this.$set(this.downData, 'tradeSource', this.classId)
            this.$set(this.downData, 'remark', this.remark)
            if(this.displayFlag11){
                let data = {
                    name:this.custName,
                    cardNo:this.psptId,
                    netTypeCode:50
                }
                this.showZzc = true
                let api = new Api()
                
                api.identityVerify(data).then(res => {
                    console.log("111111111111",res)
                    if(res.data.msgFlag != '0'){
                        alert("身份信息校验失败，请检查姓名与身份证号是否对应！" + res.data.reason);
                        this.showZzc = false
                        return;
                    }else{
                        api.down(this.downData).then(res2 => {
                            this.showZzc = false
                            if(res2.data.msgFlag == '0'){
                                // this.$dialog.alert({
                                //     message: '您的订单已确认,订单号为: '+ res2.data.resultJson.orderId + ",稍后将由客服人员跟您联系接洽。请您及时使用联系电话登录【沃钱包APP】查收相关优惠券。",
                                // }).then(() => {
                                    let orderData = {
                                        orderId: res2.data.resultJson.orderId,
                                        productInfo: this.productInfo,
                                        successFlag: '1'
                                    }
                                    this.$store.commit('updataOrderData', orderData)
                                    this.$router.push('/orderSuccess')
                                    // this.$router.push({path:'/orderSuccess',query:{order:JSON.stringify(orderData)}})
                                // });
                            }else{
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
                    }
                }).catch(error => {
                    this.$dialog.alert({
                        message:error
                    }).then(() => {

                    })
                })
            }else{
                this.showZzc = true
                let api = new Api()
                api.down(this.downData).then(res => {
                    this.showZzc = false
                    if(res.data.msgFlag == '0'){
                        // this.$dialog.alert({
                        //     message: '您的订单已确认,订单号为: '+ res.data.resultJson.orderId + ",稍后将由客服人员跟您联系接洽。请您及时使用联系电话登录【沃钱包APP】查收相关优惠券。",
                        // }).then(() => {
                            // this.$router.go(0)
                            let orderData = {
                                orderId: res.data.resultJson.orderId,
                                productInfo: this.productInfo,
                                successFlag: '1'
                            }
                            this.$store.commit('updataOrderData', orderData)
                            this.$router.push('/orderSuccess')
                        // });
                    }else{
                        let orderData = {
                            successFlag: '0'
                        }
                        this.$store.commit('updataOrderData', orderData)
                        this.$router.push('/orderSuccess')
                        // this.$router.push({path:'/orderSuccess',query:{order:JSON.stringify(orderData)}})
                    }
                }).catch(error => {
                    // this.$dialog.alert({
                    //     message:error
                    // }).then(() => {
                        
                    // })
                    // let orderData = {
                    //     successFlag: '0'
                    // }
                    // this.$router.push({path:'/orderSuccess',query:{order:JSON.stringify(orderData)}})
                    let orderData = {
                        successFlag: '0'
                    }
                    this.$store.commit('updataOrderData', orderData)
                    this.$router.push('/orderSuccess')

                })
            }
            
            
        }
    }
}
</script>
<style lang="scss" scoped>
.intention{
    .content{
        padding: 6% 8%;
        box-sizing: border-box;
        background-color: #F9E0B2;
        .cont{
            padding: 3% 4%;
            background-color: #fff;
            border-radius: 10px;
        }
        .content_title{
            box-sizing: border-box;
            text-align: center;
            height: 1.2rem;
            margin-bottom: 10px;
            position: relative;
            .title_staff{
                position: absolute;
                top: 0;
                right:0;
                text-align: right;
                font-size: 12px;
                color: #777;
                text-decoration:underline;
            }
        }
        .content_items{
            padding: 2%;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            background-color: #e6e6e6;
            border-radius: 10px;
            margin-bottom: 4%;
            .active {
                background: #ccc;
                color: #fff;
            }
            .content_addr{
                padding: 5px 16px;
                height: 100%;
                box-sizing: border-box;
                .addr_title{
                    display: flex;
                    height: 2rem;
                    border-bottom: 1px solid #ccc;
                    align-items: center;
                    .addr_title_item{
                        flex:1;
                        text-align: center;
                    }
                }
                .addr_cont_title{
                    display: flex;
                    margin-top: 10px;
                    justify-content: space-around;
                }
                .addr_cont{
                    display: flex;
                    margin-top: 10px;
                    height: 80%;

                    .addr_cont_item{
                        flex:1;
                        overflow: scroll;
                        text-align: center;
                        .province{
                            height: 2rem;
                            width: 90%;
                            line-height: 2rem;
                            margin: auto;
                            border-radius: 8px;
                        }
                    }
                }
                .confirm{
                    margin-top: 5px;
                    text-align: center;
                    .confirmOn{
                        width: 90%;
                        line-height: 2.5rem;
                        margin: auto;
                        border-radius: 8px;
                        background:linear-gradient(to right,#ff9924,#ff6025);
                        color: white;
                    }
                }
            }
            .van-action-sheet{
                position: fixed;
                height: 55%;
                bottom:0;
                background-color: #f2f2f2;
                left: 50%;
                transform: translateX(-50%);
                .van-action-sheet__content{
                    height: 85%;
                }
            }
            .item1{
                flex:2;
                padding: 1%;
            }
            .item2{
                flex:5;
                
                .item_select{
                    font-size: 14px;
                    width: 60%;
                    height: 100%;
                    border: 1px solid #e2e2e2;
                    border-radius: 3px;
                    padding: 1%;
                    position: relative;
                    .select_item{
                        position: absolute;
                        background-color: #fff;
                        width: 100%;
                        padding: 0 2%;
                        box-sizing: border-box;
                        top: 100%;
                        left: 0;
                        border: 1px solid #e2e2e2;
                        border-top: none;
                        .item{
                            padding: 3%;
                        }
                    }
                }
                input{
                    height: 100%;
                    width: 100%;
                }
                .queryPhone{
                    margin-top: 5px;
                    color: red;
                    font-size: 14px;
                }
                .van-cell{
                    padding: 0 0;
                    background-color: #e6e6e6;
                }
            }
        }
        .button {
            .btn{
                width: 50%;
                margin: 0 auto;
            }
        }
    }
}
</style>