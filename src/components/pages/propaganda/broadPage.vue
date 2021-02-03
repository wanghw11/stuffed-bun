<template>
    <div class="propagandaLogin">
        <div class="main">
            <div class="phone">
                <div class="inpPhone">
                    <div class="intitle">手机号：</div>
                    <div class="text">
                        <input type="text" style="width:100%" v-model='phoneValue' placeholder="请输入手机号" >
                    </div>
                </div>
                <div class="queryPhone" v-if="show">请输入正确的手机号</div>
            </div>
            <div class="phone" v-show="isLT">
                <div class="intitle">验证码：</div>
                <div class="build">
                    <div class="text">
                        <input type="text" class="inputYzm" v-model='yanzhengmaStr' placeholder="请输入验证码" >
                    </div>
                    <div class="xiaoyanBtn">
                        <div class="search-btn" v-if="onSecFlag" @click="onSec">
                            <span >获取验证码</span>
                        </div>
                        <div class="search-btn" v-if="!onSecFlag">
                            <span >{{onSecDate}}秒后重新获取</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="btn5" @click="onCommit()">
                <img src="../../../assets/icon/btn5.png" alt="">
            </div>
        </div>
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Api from '../../../api/Apipropaganda'
import Api3 from '../../../api/apiHome'
import Loading from '../../common/loading'
import Utils from '../../../utils/utils'
const api = new Api()
const api2 = new Api3()
export default {
    components:{
        Loading
    },
    computed:{

        token(){
            if(sessionStorage.getItem('tokenId')){
                return sessionStorage.getItem('tokenId')
            }else{
                return ''
            }
        }
    },
    data(){
        return {
            showZzc:false,
            show:false,
            isLT:false,
            phoneValue:'',
            yanzhengmaStr:'',
            onSecFlag:true,
            onSecDate:59,
        }
    },
    watch:{
        phoneValue(val){
            if(val.length != 11 || val == '' || !(/^1[3456789]\d{9}$/.test(val))){
                this.show = true
            }else{
                this.showZzc = true
                this.show = false
                // 输入手机号判断是否为联通号
                // 如果是联通号  打开获取验证码  并校验登录
                // this.isLT = true
                let comData = this.checkMobile(val)
                console.log("11111111111",comData)
                if(comData.status){
                    this.showZzc = false
                    if(comData.data.name == "ChinaUnion"){  // 联通
                        this.isLT = true
                    }else if(comData.data.name == "ChinaMobile"){ // 移动
                        this.isLT = false
                    }else if(comData.data.name == "ChinaTelcom"){ // 电信
                        this.isLT = false
                    }else{  // 其他
                        this.isLT = false
                    }
                }else{
                    this.$toast(comData.msg)
                }

            }
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            if(this.token){
                api2.qrcodeSelectTokenId(this.token).then(res => {
                    if(res.data.msgFlag == '0') {
                        this.classId = res.data.resultJson[0].classId
                        this.staffId = res.data.resultJson[0].staffId
                        this.$store.commit('updataTokenJson', res.data.resultJson[0])
                        this.$store.commit('updataStaffId',res.data.resultJson[0].staffId)
                        this.$store.commit('updataClassId',res.data.resultJson[0].classId)
                        sessionStorage.setItem('staffId',res.data.resultJson[0].staffId)
                        sessionStorage.setItem('classId',res.data.resultJson[0].classId)
                        sessionStorage.setItem('tokenJson',JSON.stringify(res.data.resultJson[0]))
                        let data = {
                            staffId:this.staffId
                        }
                        api.login(data).then(res => {
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
                let data = {
                    staffId:this.staffId
                }
                api.login(data).then(res => {
                    console.log("222222222222", res)
                })
            }
            
        },
        onSec(){
            if(this.phoneValue && !this.show){
                this.onSecFlag = false
                let setTime=setInterval(() => {
                    this.onSecDate --
                    if(this.onSecDate == 0){
                        this.onSecFlag = true
                        this.onSecDate = 59
                        clearInterval(setTime)
                    }
                }, 1000);
                api.sendMsg(this.phoneValue).then(res => {
                    if(res.data.msgFlag == '0'){
                        this.$toast('验证码发送成功')
                    }else{
                        this.$toast('验证码发送失败，请稍后重新发送')
                    }
                })
            }else{
                this.$toast('请输入手机号！')
            }
        },
        onCommit(){
            if(this.isLT){
                if(this.yanzhengmaStr && this.phoneValue && !this.show){ // 如果是联通号
                    this.showZzc = true
                    let list = [api.getRandomNum( this.phoneValue), api.checkMobileBroadbandNum(this.phoneValue)]
                    this.$axios.all(list).then(
                        this.$axios.spread((res1,res2) => {
                            this.showZzc = false
                            if(res1.data.msgFlag == '0'){
                                if(res1.data.randomNum != this.yanzhengmaStr){
                                    alert('验证码输入有误，请重新输入！')
                                    return
                                }
                            }else{
                                alert(res1.data.errmsg)
                                return
                            }
                            if(res2.data.msgFlag == '0'){
                                // 判断手机好是否有宽带  如果有宽带  classID = 10030  menuId = 70   没有   走  71
                                if(res2.data.canComp == '0'){
                                    this.$store.commit('updataMenuId', '72')
                                    sessionStorage.setItem('menuId', '72')
                                    this.$router.push("/intentionPage")
                                }else{
                                    let obj = {
                                        staffId: this.staffId,
                                        number: this.phoneValue,
                                        sourceId:this.classId
                                    }
                                    let str = JSON.stringify(obj)
                                    let base64 = Utils.encode(str)
                                    console.log("2222222222")
                                    window.location.href = 'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/mobileToBroadband/mobileToBroadbandNew.html?msg='+base64
                                }
                            }else{
                                alert(res2.data.errmsg)
                            }
                        })
                    )
                }else{
                    this.$toast('请输入手机号或验证码')
                    return
                }
            }else{
                if(this.phoneValue && !this.show){
                    this.$store.commit('updataMenuId', '72')
                    sessionStorage.setItem('menuId', '72')
                    this.$router.push("/intentionPage")
                }else{
                    this.$toast('请输入手机号')
                    return
                }
            }
            
        },
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
        }
    }
}
</script>
<style lang="scss" scoped>
.propagandaLogin{
    background-color: #f3ddba;
    width: 100vw;
    height: 100vh;
    .main{
        padding: 4vh 10vw;
        .phone{
            .intitle{
                margin: 10px 0;
            }
            .text{
                background-color: #fff;
                border-radius: 4px;
            }
            .build{
                display:flex;
                justify-content: space-between;
                background-color: #fff;
                align-items: center;
            }
            input{
                height: 5vh;
                padding: 0 4vw;
                box-sizing: border-box;

            }
            .inputYzm{
                display: flex;

            }
            .xiaoyanBtn{
                .search-btn{
                    color: rgb(255, 255, 255);
                    background: linear-gradient(to right, rgb(241, 162, 81), rgb(240, 135, 65));
                    font-weight: bold;
                    text-align: center;
                    border-radius: 4px;
                    margin-right: 5px;
                    padding: 5px;
                    line-height: 20px;
                    font-size: 14px;
                }

            }
            .queryPhone{
                margin-top: 5px;
                color: red;
                font-size: 14px;
            }
        }

        .btn5{
            margin: 20px auto;
            width: 40Vw;
            img{
                width: 100%;
            }
        }
    }

}
</style>
