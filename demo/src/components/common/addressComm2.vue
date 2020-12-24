<template>
    <div class="item2">
        <div><input type="text" readonly onfocus="this.blur()" :value='addrStr' @click="onInput(2)" placeholder="请选择区县"></div>
        <van-action-sheet v-model="show3" :title="addrTitle">
            <div class="content_addr">
                <div class="addr_cont_title">
                    <div class="addr_cont_item">
                        河南省
                    </div>
                    <div class="addr_cont_item">
                        {{city.areaname}}
                    </div>
                    <div class="addr_cont_item">
                        {{active}}
                    </div>
                </div>
                <div class="addr_cont">
                    <div class="addr_cont_item">
                        <div class="province" v-for="(item, index) in areaList" :class="{active : active == item.areaname}" :key="index" @click="onClick(item)">{{item.areaname}} </div>
                    </div>
                </div>
                <div class="confirm">
                    <div class="confirmOn" @click="addrConfirm">
                        确定
                    </div>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>
<script>
import Api2 from '../../api/api'
export default {
    name:'addressComm2',
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
        classId(){
            if(sessionStorage.getItem('classId')){
                return sessionStorage.getItem('classId')
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
        }
    },
    data(){
        return {
            city:'',
            province:'',
            show3:false,
            addrTitle:'',
            addrCode:'',
            provinceCode:'',
            areaList:'',
            active:'',
            dataCan:'',
            secFlag:false, // 意向选择
            active2:'',
            addrStr:''
        }
    },
    mounted(){
        
    },
    methods:{
        onInput(num){
            this.$toast('正在加载区县。。。')
            this.show3 = true
            if(!this.token){
                this.city = JSON.parse(sessionStorage.getItem('address'))
                this.province = {
                    areaname: '河南',
                    provinceCode: '76'
                }
                this.addrTitle = '选择区县'
                this.addrCode = this.city ? this.city.areaid : ''
                this.provinceCode = this.city ? this.city.provincecode : ''
                this.addrInit()
            }else{
                // 工号  获取  地市   接口
                let api = new Api2()
                let data = {
                    ms:this.staffId
                }
                api.aotoLogin(data).then(res =>{
                    if(res.data.msgFlag == '0'){
                        this.province = {
                            areaname: res.data.datum.provinceName,
                            provinceCode: res.data.datum.provinceCode
                        }
                        this.city = {
                            areaname: res.data.datum.cityName,
                            provinceCode: res.data.datum.areaCode,
                            areaid: res.data.datum.areaCode
                        }
                        this.addrTitle = '选择区县'
                        this.addrCode = this.city ? this.city.provinceCode : ''
                        this.provinceCode = '76'
                        this.addrInit()
                    }else{
                        alert(res.data.errmsg)
                    }
                })
            }
        },
        addrInit(){
            this.areaList = []
            let api = new Api2()
            let dataApi = {
                pAreaId:this.addrCode,
                provinceCode: this.provinceCode
            }
            api.onlineByaddress(dataApi).then(res => {
                this.$toast.clear()
                if(res.data.msgFlag == '0'){
                    let datas = res.data.datum.addressInfo
                    let addrArr;
                    if(datas.addressInfo != undefined){
                        addrArr = datas.addressInfo
                    }else{
                        addrArr = datas
                    }
                    this.areaList = addrArr
                }else{
                    this.$toast(res.data.errmsg)
                }
            }).catch(error => {
                this.$dialog.alert({
                    message:error
                }).then(() => {

                })
            })
        },
        onClick(item){
            this.active = item.areaname
            this.dataCan = item
            this.addrStr = '河南省-' + this.city.areaname + '-' + item.areaname
        },
        addrConfirm(){
            this.county = this.dataCan
            this.show3 = false
            let data = {
                provinceName: '河南',
                provinceCode: '76',
                cityName: this.city.areaname,
                cityCode: this.city.areaid,
                areaid: this.dataCan.areaid,
                areaName: this.dataCan.areaname
            }
            this.$emit('getAddress', data)
        },
    }
}
</script>
<style lang="scss" scoped>
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
</style>