<template>
    <div class="intentionbroadPage">
        <div class="format">
            <!-- 姓名 nameData -->
            <div class="format_item">
                <div class="item_name">
                    姓名
                </div>
                <div class="item_content">
                    <input type="text" v-model="nameData" placeholder="请输入姓名">
                </div>
            </div>
            <!-- 手机号 phoneData -->
            <div class="format_item">
                <div class="item_name">
                    手机号
                </div>
                <div class="item_content">
                    <input type="text" disabled v-model="phoneData" placeholder="请输入手机号">
                </div>
            </div>
            <!-- 宽带选择 -->
            <div class="format_item">
                <div class="item_name">
                    选择要提速的宽带
                </div>
                <div class="select">
                    <div class="item_select" v-for="(item , index) in kuandaiList" :key="index">
                        <div style="margin: 0 5px;" @click.stop="select(item, index)" >
                            <img style="height:20px;" v-if="selectIndex == index" src="../../../assets/icon/select.png"  alt="" >
                            <img style="height:20px;" v-if="selectIndex != index" src="../../../assets/icon/noselect.png" alt="">
                        </div>
                        <div class="cont_par">
                            <div class="font_content">宽带号码：{{item.serialNumber}}</div>
                            <div class="font_content">{{item.installAddress}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 预约日期  currentDate-->
            <div class="format_item">
                <div class="item_name">
                    预约日期
                </div>
                <div class="item_content">
                    <input type="text" onfocus="this.blur()" @click="onInput(1)" :value="currentDate" placeholder="请选择日期">
                    <div> 
                        <van-popup v-model="showDate" position="bottom" :style="{ height: '50%' }">
                            <van-datetime-picker
                                v-model="date"
                                type="date"
                                title="选择年月日"
                                @confirm='confirm1'
                                @cancel='cancel1'
                                />
                        </van-popup>
                    </div>
                </div>
            </div>
            <!-- 预约时间  currentTime-->
            <div class="format_item">
                <div class="item_name">
                    预约时间
                </div>
                <div class="item_content">
                    <input type="text"  onfocus="this.blur()" @click="onInput(2)" :value="currentTime" placeholder="请选择时间">
                    <div> 
                        <van-popup v-model="showTime" position="bottom" :style="{ height: '50%' }">
                            <van-datetime-picker
                                v-model="time"
                                type="time"
                                title="选择时间"
                                @confirm='confirm2'
                                @cancel='cancel2'
                                />
                        </van-popup>
                    </div>
                </div>
            </div>
            <!-- 备注 remark -->
            <div class="format_item">
                <div class="item_name">
                    备注
                </div>
                <div class="item_content">
                    <input type="text" v-model="remark" placeholder="请输入其他需求">
                </div>
            </div>
            <!-- 下单 -->
            <div class="format_item">
                <div class="commit" @click="commit">
                    立即预约
                </div>
            </div>
        </div>
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Api from '../../../api/Apipropaganda'
import Api2 from '../../../api/apiIntention'
import Api3 from '../../../api/api'
import Loading from '../../common/loading'
const api = new Api()
const api2 = new Api2()
const api3 = new Api3()
export default {
    components:{
        Loading
    },
    data(){
        return {
            showZzc:false,

            currentDate: '',
            date: new Date(),
            currentTime: '',
            time: moment(new Date()).format("HH:mm"),
            showDate: false,
            showTime: false,

            selectIndex: 100000,
            kuandaiList:[],
            selectItem:'',
            nameData:'',
            remark:'',
            downData: {},
        }
    },
    computed:{
        classId(){
            if(sessionStorage.getItem('classId')){
                return sessionStorage.getItem('classId')
            }else{
                return ''
            }
        },
        menuId(){
            if(sessionStorage.getItem('menuId')){
                return sessionStorage.getItem('menuId')
            }else{
                return ''
            }
        },
        staffId(){
            if(sessionStorage.getItem('staffId')){
                return sessionStorage.getItem('staffId')
            }else{
                return ''
            }
        },
        phoneData(){
            return this.$route.query.phone
        },
        address(){
            if(sessionStorage.getItem('address')){
                return JSON.parse(sessionStorage.getItem('address'))
            }else{
                return {}
            }
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.showZzc = true
            let data = {
                keyCode: this.phoneData,
                cityCode: this.address.areaid ? this.address.areaid : ''
            }
            let data3 = {
                classId : this.classId,
                menuId : this.menuId
            }
            console.log("2222222222",data3)
            let list = [api.userBroadQry(data), api2.queryPurposeConfig(data3) ]
            this.$axios.all(list).then(
                this.$axios.spread((res1, res2) => {
                    this.showZzc = false
                    if(res1.data.msgFlag == '0'){
                        this.kuandaiList = res1.data.resultJson.DATA[0].broadeInfo
                    }else{
                        alert(res1.data.errmsg)
                        return
                    }
                    if(res2.data.msgFlag == '0'){
                        this.$set(this.downData, 'inModeCode', res2.data.resultJson.inModeCode)
                        this.$set(this.downData, 'sceneType', res2.data.resultJson.sceneType)
                        if(res2.data.resultJson.spare1){
                            this.$set(this.downData, 'spare1', res2.data.resultJson.spare1)
                        }
                        if(res2.data.resultJson.spare2){
                            this.$set(this.downData, 'spare2', res2.data.resultJson.spare2)
                        }
                        if(res2.data.resultJson.spare3){
                            this.$set(this.downData, 'spare3', res2.data.resultJson.spare3)
                        }
                        if(res2.data.resultJson.spare4){
                            this.$set(this.downData, 'spare4', res2.data.resultJson.spare4)
                        }
                    }else{
                        alert(res2.data.errmsg)
                        return
                    }
                })
            )
        },
        confirm1(val){  // 日期选择  确定
            this.showDate = false
            this.currentDate = moment(val).format("YYYY-MM-DD")
        },
        cancel1(){
            this.showDate = false
        },
        confirm2(val){  // 时间选择  确定
            this.showTime = false
            this.currentTime = val
        },
        cancel2(){
            this.showTime = false
        },
        onInput(val){
            if(val == 1){
                this.showDate = true
            }else{
                this.showTime = true
            }
        },
        select(item, index){
            this.selectItem = item
            this.selectIndex = index
        },
        commit(){
            if(this.nameData == ''){
                this.$toast('请输入姓名')
                return
            }else{
                this.$set(this.downData, 'custName', this.nameData)
            }
            if(this.currentDate == ''){
                this.$toast('请选择预约日期')
                return
            }
            if(this.currentTime == ''){
                this.$toast('请选择预约时间')
                return
            }
            if(this.selectItem == ''){
                this.$toast('请选择要提速的宽带')
                return
            }
            let code = this.selectItem.serialNumber.slice(0,4)
            let date = `${this.currentDate} ${this.currentTime}`
            this.$set(this.downData, 'phone', this.phoneData)
            this.$set(this.downData, 'appointmentTime', date)
            this.$set(this.downData, 'offerId', '100200')
            this.$set(this.downData, 'offerName', '宽带提速意向单')
            this.$set(this.downData, 'serialNumber', this.selectItem.serialNumber)
            this.$set(this.downData, 'postAddress', this.selectItem.installAddress)
            this.$set(this.downData, 'remark', this.remark)
            this.$set(this.downData, 'provinceCode', '76')
            this.$set(this.downData, 'postCityCode', code)
            this.$set(this.downData, 'postDistrictCode', this.selectItem.areaCode)
            this.$set(this.downData, 'menuId', this.menuId)
            
            if(window.location.href.indexOf('token') != -1 || window.location.href.indexOf('staffId') != -1){
                let data2 = {
                    staffId: this.staffId
                }
                this.showZzc = true
                api.login(data2).then(res2 => {
                    api2.down(this.downData).then(res3 => {
                        this.showZzc = false
                        if(res3.data.msgFlag == '0'){
                            let orderId = res3.data.resultJson.orderId
                            let orderData = {
                                orderId: orderId,
                                successFlag: '1'
                            }
                            api.sendMsg2(this.phoneData, orderId).then(res4 => {
                                if(res4.data.msgFlag == '0'){
                                    this.$store.commit('updataOrderData', orderData)
                                    this.$router.push('/orderSuccess')
                                }else{
                                    alert(res4.data.errmsg)
                                }
                            })
                        }else{
                            alert(res3.data.errmsg)
                        }
                    })
                })
            }else{
                let data = {
                    'classId': this.classId,
                    'menuId': this.menuId,
                    'provinceCode': '76',
                    'cityCode': code
                }
                this.showZzc = true
                api3.qrcodeSelectMs(data).then(res=>{
                    if(res.data.msgFlag == '0'){
                        this.$store.commit('updataStaffId', res.data.resultJson[0].ms)
                        sessionStorage.setItem('staffId',res.data.resultJson[0].ms)
                        let data2 = {
                            staffId: res.data.resultJson[0].ms
                        }
                        api.login(data2).then(res2 => {
                            api2.down(this.downData).then(res3 => {
                                this.showZzc = false
                                if(res3.data.msgFlag == '0'){
                                    let orderId = res3.data.resultJson.orderId
                                    let orderData = {
                                        orderId: orderId,
                                        successFlag: '1'
                                    }
                                    api.sendMsg2(this.phoneData, orderId).then(res4 => {
                                        if(res4.data.msgFlag == '0'){
                                            this.$store.commit('updataOrderData', orderData)
                                            this.$router.push('/orderSuccess')
                                        }else{
                                            alert(res4.data.errmsg)
                                        }
                                    })
                                }else{
                                    let orderData = {
                                        error:res3.data.resultJson.detail,
                                        successFlag: '0'
                                    }
                                    this.$store.commit('updataOrderData', orderData)
                                    this.$router.push('/orderSuccess')
                                    }
                            })
                        })
                    }else{
                        alert(res.data.errmsg)
                    }
                })
            }

        }
    }
}
</script>
<style lang="scss" scoped>
    .intentionbroadPage{
        width: 100vw;
        padding: 20px;
        box-sizing: border-box;
        background-color: #f2f2f2;
        .format{
            width: 100%;
            height: 100%;
            background-color: #fff;
            border-radius: 5px;
            .format_item{
                padding: 10px;
                box-sizing: border-box;
                .item_name{
                    padding-bottom: 10px;
                    box-sizing: border-box;
                }
                .item_content{
                    padding: 15px;
                    background-color: #f2f2f2;
                    box-sizing: border-box;
                    border-radius: 4px;
                }
                .select{
                    background-color: #f2f2f2;
                    padding: 5px 3px;
                    box-sizing: border-box;
                    .item_select{
                        display: flex;
                        align-items: center;
                        
                        .cont_par{
                            overflow: hidden;
                            .font_content{
                                font-size: 16px;
                                width: 100%;  
                                overflow: hidden;  
                                text-overflow: ellipsis; 
                                white-space:nowrap ;
                            }
                        }
                    }
                }
                .commit{
                    text-align: center;
                    background-color: #4083fc;
                    color: #fff;
                    margin: 20px auto;
                    padding: 12px 0;
                    box-sizing: border-box;
                    border-radius: 4px;
                    width: 40%;
                }
            }
        }
    }
</style>