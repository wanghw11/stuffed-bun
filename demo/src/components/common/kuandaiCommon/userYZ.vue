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
                            {{htmlData.custName? htmlData.custName:'未校验'}}
                        </div>
                        <div v-if="addrFlag">
                            <div class="wangji" @click="goAddress">
                                {{address}}
                            </div>
                        </div>
                    </div>
                    <div style="display:flex;justify-content: space-between;flex:1;">
                        <div>
                            {{htmlData.phone? htmlData.phone:'此业务需输入宽带号进行校验'}}
                        </div>
                        <div v-if="!loginFlag" class="wangji">
                            <div @click="selKuandai">
                                忘记宽带号码
                            </div>
                            <van-action-sheet v-model="checked" @cancel='cancel' title="宽带查询">
                                <SelectKuandai @getKuandai="getKuandai"/>
                            </van-action-sheet>
                        </div>
                        <!-- <div v-if="loginFlag" class="wangji">
                            <img src="../../../assets/icon/退出登录.png" alt="">
                        </div> -->
                    </div>
                </div>
            </div>
            <div style="margin:5px;font-size:14px;">
                证件号码：{{htmlData.certCode? htmlData.certCode:'暂无'}}
            </div>
        </div>
        <div class="rz_msg">
            {{htmlData.productName? htmlData.productName:''}}
        </div>
        <van-dialog v-model="rzShow" title="宽带校验" :show-confirm-button='false' :close-on-click-overlay='true'>
        
            <div class="title">
                <div class="title-s">
                    <div class="secah">
                        <van-search v-model="searchData" shape="round" background="#fff" placeholder="请输入宽带号码" />
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
                    <van-field v-model="dialogData" placeholder="请输入您的身份证后6位" />
                </div>
                <div style="padding:0px 0px 10px 10px ;">
                    <van-field v-model="phone" placeholder="请输入手机号" />
                </div>
                <div  class="yanzhengm" style="display:flex;padding:0px 0px 10px 10px ;">
                    <van-field v-model="phoneYanzheng" placeholder="请输入验证码" />
                    <div class="xiaoyanBtn">
                        <div class="search-btn" v-if="onSecFlag" @click="onSec">
                            <span >获取验证码</span>
                        </div>
                        <div class="search-btn" v-if="!onSecFlag">
                            <span >{{onSecDate}}秒后重新获取</span>
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
    components:{
        SelectKuandai,
        Loading
    },
    computed:{
        token() {
            if (sessionStorage.getItem('tokenId')) {
                return sessionStorage.getItem('tokenId')
            } else {
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
            addrFlag:false
        }
    },
    mounted(){
        // this.$bus.on('getCity',res=>{
        //     console.log("aaaaaaaaaaaaaaaaa",res)
        // })
        this.getQrcode()
    },
    methods:{
        // 重新获取城市工号
        goAddress(){
            this.$router.push('/getStaff2')
        },
        // 忘记宽带号  
        selKuandai(){
            this.checked = true  // 忘记宽带  弹窗
        },
        getQrcode(){
            if(this.token != ''){
                this.addrFlag = false
            }else{
                this.addrFlag = true
            }
        },
        getKuandai(data){
            this.checked = false   // 忘记宽带  弹窗
            this.rzShow = true  // 宽带  查询   弹窗
            this.searchData = data.accountNet
            this.phone = data.linkPhone.split('|')[1]
        },
        cancel(){
            this.checked = false
            this.searchData = ''
        },
        //身份认证弹窗
        dialog(){  
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
            this.loadingStart("加载中。。。")
            let api = new Api()
            this.$set(this.datas, 'isHaveKey', 0)
            let list = [api.checkBroadNum(this.searchData), api.qryMainNumber(this.searchData)]
            this.$axios.all(list).then(
                this.$axios.spread((res2, res3) => {
                    this.loadingStop()
                    if(res2.data.msgFlag == '0'){
                        if(res2.data.userThreePartInfo == null || res2.data.userThreePartInfo == undefined || res2.data.userThreePartInfo == ''){
                            alert("主号码校验失败,请重试!");
                            return;
                        }
                        if( res3.data.msgFlag == '0'){
                            var mainNumber = res3.data.mainNumber
                            if ("" != mainNumber && mainNumber != undefined) {
                                this.phone = mainNumber
                            }
                        }
                        let datas = {
                            phoneNum: this.searchData,
                            result: res2.data,
                            mainNumber: this.searchData,
                            certCode: res2.data.userThreePartInfo.custInfo.certCode,
                            certAddr: res2.data.userThreePartInfo.custInfo.certAddr,
                            custType: res2.data.userThreePartInfo.custInfo.custType,
                            certTypeCode: res2.data.userThreePartInfo.custInfo.certTypeCode,
                            certEndDate: res2.data.userThreePartInfo.custInfo.certEndDate,
                            custName: res2.data.userThreePartInfo.custInfo.custName,
                            custId: res2.data.userThreePartInfo.custInfo.custId,
                            mainUserId: res2.data.userThreePartInfo.userInfo.userId,
                            userType: '1',
                            oldCustInfo: res2.data.userThreePartInfo.custInfo
                        }
                        
                        this.datas = datas
                        this.rzShow = false  // 宽带  查询   弹窗
                        this.dialogShow = true   // 认证信息     弹窗
                    }
                })
            )
            
        },
        // 获取验证码
        onSec(){
            this.onSecFlag = false  // 60秒   开关
            let setTime=setInterval(() => {
                this.onSecDate --
                if(this.onSecDate == 0){
                    this.onSecFlag = true
                    this.onSecDate = 59
                    clearInterval(setTime)
                }
            }, 1000);
            this.loadingStart("加载中。。。")
            let api = new Api()
            api.sendMsg(this.phone).then(res => {
                this.loadingStop()
                if(res.data.msgFlag == '0'){
                    this.$toast('验证码发送成功')
                }else{
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
        onPhone(){
            if(this.dialogData == ''){
                this.$toast('请输入身份证后6位！')
                return
            }
            if(this.phone == ''){
                this.$toast('请输入手机号！')
                return
            }
            if(this.phoneYanzheng == ''){
                this.$toast('请输入正确的验证码！')
                return
            }
            this.loadingStart("加载中。。。")
            let api = new Api()
            // let list = [api.getRandomNum(this.phoneYanzheng, this.phone),api.checkBroadNum(this.searchData),api.qryMainNumber(this.searchData)]
            api.getRandomNum(this.phoneYanzheng, this.phone).then(res3=>{
                this.loadingStop()
                    if(res3.data.msgFlag == '0' ){
                        if(this.phoneYanzheng != res3.data.randomNum){
                            alert('请输入正确的验证码！')
                            return;
                        }
                        let cs = this.datas.certCode;
                        let ss = cs.substring(cs.length-6);
                        if(this.dialogData != ss){
                            alert("请输入本人正确的证件号后6位！");
                            return;
                        }
                        this.$toast('验证成功！')
                        this.$set(this.datas, 'isHaveKey', "1") //
                        let comInfo = this.datas.result.comInfo; //产品信息
                        // let comInfo = this.iptvList; //产品信息
                        let rows = comInfo.rows;
                        //判断是否有产品信息
                        // this.$set(datas, "iPTV","0");
                        // this.dialogShow = false
                        if( 0 < rows.length ){
                            //iPTV,0代表可以加装IPTV，1-没有IPTV产品，不让办理
                            this.dialogShow = false
                            this.$set(this.datas, "iPTV","0");
                            this.htmlData = {
                                productName: this.datas.result.userThreePartInfo.userInfo.productName? this.datas.result.userThreePartInfo.userInfo.productName:'',
                                phone:this.phone,
                                custName: this.datas.result.userThreePartInfo.custInfo.custName? this.datas.result.userThreePartInfo.custInfo.custName:'无',
                                certCode: this.datas.result.userThreePartInfo.custInfo.certCode? this.datas.result.userThreePartInfo.custInfo.certCode:'无'
                            }
                            this.putHtmlData()
                        }else{
                            this.$toast("该宽带无对应的IPTV产品")
                            this.loginFlag = true
                            this.htmlData = {
                                productName: this.datas.result.userThreePartInfo.userInfo.productName? this.datas.result.userThreePartInfo.userInfo.productName:'',
                                phone:this.phone,
                                custName: this.datas.result.userThreePartInfo.custInfo.custName? this.datas.result.userThreePartInfo.custInfo.custName:'无',
                                certCode: this.datas.result.userThreePartInfo.custInfo.certCode? this.datas.result.userThreePartInfo.custInfo.certCode:'无'
                            }
                            this.dialogShow = false
                            this.$set(this.datas, "iPTV","1");
                            return
                        }
                        
                        
                    }else{
                        alert(res2.data.errmsg)
                        this.dialogShow = false
                    }
            })
            // this.$axios.all(list).then(
            //     this.$axios.spread((res1,res2,res3) =>{
            .catch(error => {
                alert(error)
            })
        },
        // 渲染页面数据
        putHtmlData(){
            let result = this.datas.result
            let comInfo = result.comInfo;//产品信息
            // let comInfo = this.iptvList;//产品信息
            this.loginFlag = true // 登录
            let rows = comInfo.rows;
            let comm = rows[0];
            
            let data = {
                productName: result.userThreePartInfo.userInfo.productName? result.userThreePartInfo.userInfo.productName:'',
                phone:this.phone,
                custName: result.userThreePartInfo.custInfo.custName? this.encrypt(result.userThreePartInfo.custInfo.custName, 'custName'):'无',
                certCode: result.userThreePartInfo.custInfo.certCode? this.encrypt(result.userThreePartInfo.custInfo.certCode, 'certCode'):'无'
            }
            this.xuanz = true
            this.isMessage1 = true
            //3.展示对应的IPTV产品
            this.$set(data, 'IPTVDesc', comm.policyName) // 套餐名称
            //4.展示费用 ，判断是单宽还是融合，最外层isFusion 1-融合，0-非融合,mixMode 1-融合，0-单卡
            let isFusion = result.isFusion;
            let childCoInfo=comm.qryCoCustInfoRsp.childCoInfo;
            this.totalPriceStr = 0
            let fee = 0;
            if("1"==isFusion){
                //融合业务逻辑
                this.$set(data, 'IPTVDesc1', '融合业务+IPTV') // 
                this.$set(data, 'IPTVDesc2', '无') // 
                this.$set(data, 'IPTVDesc3', '无') // 
                for(var j=0;j<childCoInfo.length;j++){
                    var childPro = childCoInfo[j];
                    // if("1"==childPro.get("mixMode")&&("4"==childPro.get("roleId")||"5"==childPro.get("roleId"))){
                    if("4"==childPro.roleId||"5"==childPro.roleId){
                        fee+=parseInt(childPro.commPrice);
                        if("5"==childPro.roleId){
                            this.$set(data, 'IPTVDesc2', childPro.policyName) // 
                        }
                        if("4"==childPro.roleId){
                            this.$set(data, 'IPTVDesc3', childPro.policyName) // 
                        }
                        this.$set(this.datas, 'iPTVChild', "1") // 
                    }
                }
            }else{
                // 非融合业务逻辑
                this.$set(data, 'IPTVDesc1', '单宽+IPTV') // 
                this.$set(data, 'IPTVDesc2', '无') // 
                this.$set(data, 'IPTVDesc3', '无') // 
                for(var j=0;j<childCoInfo.length;j++){
                    var childPro = childCoInfo[j];
                    // if("0"==childPro.get("mixMode")&&("4"==childPro.get("roleId")||"5"==childPro.get("roleId"))){
                    if("4"==childPro.roleId||"5"==childPro.roleId){
                        fee+=parseInt(childPro.commPrice);
                        if("5"==childPro.roleId){
                            this.$set(data, 'IPTVDesc2', childPro.policyName) // 
                        }
                        if("4"==childPro.roleId){
                            this.$set(data, 'IPTVDesc3', childPro.policyName) // 
                        }
                        this.$set(this.datas, 'iPTVChild', "1") //
                    }
                }
            }
            this.$set(this.datas, 'tradeFee', (fee/100))
            this.$set(this.datas, 'phone', this.phone)
            this.htmlData = data
            this.xuanz1 = true
            this.isMessage2 = true
            this.totalPriceStr = Number(fee/100)
            this.$emit('getHtmlData',JSON.parse(JSON.stringify(this.htmlData)))
            this.$emit('getDatas',JSON.parse(JSON.stringify(this.datas)))
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
    .renzheng{
        background-color: #588EF1;
        margin-bottom: 10px;
        padding: 10px;
        box-sizing: border-box;
        position: relative;
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
        .rz_contont{
            background-color: #fff;
            border-radius: 8px;
            padding: 10px;
            height: 20vh;
            box-sizing: border-box;
            .contont_top{
                display: flex;
                .top_touxiang{
                    height: 8vh;
                    width: 8vh;
                    border-radius: 50%;
                    img{
                        width: 100%;
                    }
                }
                .top_msg{
                    margin-left: 10px;
                    font-size:12px;
                    line-height: 18px;
                    flex:1;
                    .wangji{
                        padding: 10px;
                        padding-top: 0;
                        text-align: right;
                        font-size: 12px;
                        color: #777;
                        text-decoration:underline;
                        img{
                            height: 100%;
                        }
                    }
                }
            }
        }
        .rz_msg{
            position: absolute;
            bottom:0;
            left:50%;
            transform: translateX(-50%);
            height: 6vh;
            width: 80%;
            z-index: 100;
            background-color: #588EF1;
            border-radius: 8px;
            padding: 10px;
            box-sizing: border-box;
            color: #fff;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            opacity: 0.4;
        }

    }
    .yanzhengm{
        .van-cell{
            padding: 5px 8px;
            background-color: #f7f8fa;
            width: 55%;
        }
    }
    .renzheng:after { position:absolute; left:0; right:0; bottom:0px; content:""; z-index:1; height:5vh; width:100%; border-radius: 50% 50% 0 0; background:#fff;}
</style>