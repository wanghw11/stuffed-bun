<template>
    <div class="getStaff">
        <div class="top">
            <!-- <div class="topImage" @click="comback">
                <img src="../../assets/icon/comback.png" alt="">
            </div> -->
            <div class="topTitle">
                {{title}}
            </div>
        </div>
        <div class="title">
            <div>
                <img style="width:100%;display:block;" src="../../assets/icon/banner.png" alt="">
            </div>
            <div class="content">
                <h1>选择城市，匹配商品</h1>
                <div class="content_con">
                    请选择您所在的城市，为您匹配可以办理的业务
                </div>
            </div>
        </div>
        <div class="address">
            <div class="addImage" @click="combackAdd" v-if="addFlag">
                返回
            </div>
            <div class="address_con">
                <div class="address_item" v-for="(item, index) in areaList" :key="index" :class="{action:index==isactive}" @click="addr(item,index)">{{item.areaname}}</div>
            </div>
        </div>
        <div class="btnBottom" v-if="addFlag">
            <div class="query" @click="query">确认</div>
        </div>
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Api from '../../api/api'
import Loading from '../common/loading'
export default {
    computed:{
        title(){
            return this.$route.meta.title
        },
        routerId(){
            return this.$store.state.routerId
        }
    },
    components:{
        Loading
    },
    data(){
        return {
            areaList: [],
            allList: [],
            allItemList: [],
            addFlag: false,
            showZzc: false, // loading 开关
            areaFlag: true,// 城市接口  开关
            isactive: 0,
            pAction: 0,
            actionData: '',
            routeName: '',
            routePath: ''
        }
    },
    beforeRouteEnter (to, from, next){
        next(vm => {
            vm.routePath = from.path
            vm.routeName = from.name
        })
    },
    mounted(){
        this.initAddress()
    },
    methods:{
        // comback(){
        //     this.$router.push({name:this.routeName,params:{address: this.actionData}})
        //     // this.$router.go(-1)
        // },
        initAddress(){
            this.areaList = []
            this.showZzc = true
            let api = new Api()
            let dataApi = {
                pAreaId:"0"
            }
            api.onlineByaddress(dataApi).then(res => {
                console.log("1111111111",res)
                if(res.data.msgFlag == '0'){
                    this.showZzc = false
                    let datas = res.data.datum.addressInfo
                    let addrArr;
                    if(datas.addressInfo != undefined){
                        addrArr = datas.addressInfo
                    }else{
                        addrArr = datas
                    }
                    addrArr.map(item => {
                            item.action = false
                            this.areaList.push(item)
                    })
                    this.allList = JSON.parse(JSON.stringify(this.areaList))
                }else{
                    this.$dialog.alert({
                        message:res.data.errmsg
                    })
                }
            })
        },
        addr(item, index){
            if(this.areaFlag){
                this.isactive=index;
                this.pAction = index
                this.areaFlag = false
                this.areaList = []
                this.showZzc = true
                let api = new Api()
                let dataApi = {
                    pAreaId:item.areaid,
                    provinceCode:item.provincecode
                }
                api.onlineByaddress(dataApi).then(res => {
                    console.log("1111111111",res)
                    if(res.data.msgFlag == '0'){
                        this.showZzc = false
                        this.addFlag = true
                        let datas = res.data.datum.addressInfo
                        let addrArr;
                        if(datas.addressInfo != undefined){
                            addrArr = datas.addressInfo
                        }else{
                            addrArr = datas
                        }
                        addrArr.sort((a,b)=>{
                            return a.areaid - b.areaid
                        })
                        addrArr.map(item => {
                            item.action = false
                            this.areaList.push(item)
                        })
                        this.allItemList = JSON.parse(JSON.stringify(this.areaList))
                    }else{
                        this.$dialog.alert({
                            message:res.data.errmsg
                        })
                    }
                }).catch(error => {
                    this.$dialog.alert({
                        message:error
                    }).then(() => {

                    })
                })
            }else{
                this.isactive=index;
                this.addFlag = true
                this.actionData = item
            }
        },
        // 重置省份
        combackAdd(){
            this.addFlag = false
            this.areaFlag = true
            this.isactive = this.pAction
            this.areaList = JSON.parse(JSON.stringify(this.allList))
        },
        query(){
            if(this.actionData){
                console.log("111111111",this.actionData)
                let menuId = this.$store.state.menuId
                let classID = this.$store.state.classId
                let data = {
                    'classId': classID,
                    'menuId': menuId,
                    'provinceCode': this.actionData.provincecode,
                    'cityCode': this.actionData.areaid
                }
                console.log("11111111111",data)
                this.showZzc = true
                let api = new Api()
                api.qrcodeSelectMs(data).then(res => {
                    this.showZzc = false
                    if(res.data.msgFlag == '0'){
                        this.$store.commit('updataClassId', res.data.resultJson[0].classId)
                        this.$store.commit('updataStaffId', res.data.resultJson[0].ms)
                        sessionStorage.setItem('staffId',res.data.resultJson[0].ms)
                        this.$store.commit('updataAddress', this.actionData)
                        this.$router.push(this.routerId)
                    }else{
                        this.$dialog.alert({
                            message:res.data.errmsg
                        }).then(() => {

                        })
                    }
                }).catch(error => {
                    this.$dialog.alert({
                        message:error
                    }).then(() => {

                    })
                })
                // this.$router.push({name:this.routePath,params:{address: this.actionData}})
                // this.$bus.emit("getCity",this.actionData)
            }else{
                this.$dialog.alert({
                    message:'请选择省市'
                }).then(() => {

                })            
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.getStaff{
    padding-top: 40px;
    .top{
        height: 6vh;
        width: 100%;
        position: fixed;
        top: 0;
        background-color: #fff;
        z-index: 12;
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
    .title{
        width: 100%;
        position: relative;
        background-size: 100% auto;
        .content{
            position: absolute;
            top: 40%;
            left: 2vh;
            transform: translateY(-50%);
            color: #fff;
            .content_con{
                margin-top: 2vh;
            }
        }
    }
    .address{
        margin: 2vh;
        .addImage{
            height: 3vh;
            margin-bottom: 1vh;
            
        }
        .address_con{
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            .address_item{
                width: 32%;
                background-color: #f7f7f7;
                color: #666;
                border: 1px solid #e3e3e3;
                border-radius: 4px;
                padding: 2vh;
                box-sizing: border-box;
                text-align: center;
                margin-bottom: 1vh;
            }
            .action{
                background-color: #E0EAFC;
                color: #3F80F7;
                border: 1px solid #5A91F6;
            }
        }

    }
    .btnBottom{
        width: 100%;
        margin: 4vh 0;
        .query{
            width: 40%;
            margin: 0 auto;
            text-align: center;
            padding: 2vh;
            background-color: #3F80F7;
            color: #fff;
            border-radius: 4px;
            font-size: 2.8vh;
        }
    }
}
</style>