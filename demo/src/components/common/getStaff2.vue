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
                <img style="width:100%;display:block;" src="../../assets/icon/img/banner.png" alt="">
            </div>
            <div class="content">
                <h1>选择城市，匹配商品</h1>
                <div class="content_con">
                    请选择您所在的城市，为您匹配可以办理的业务
                </div>
            </div>
        </div>
        <div class="address">
            <div class="address_con">
                <div class="address_item" v-for="(item, index) in areaList" :key="index" :class="{action:item.areaid==isactive}" @click="actionItem(item,index)">{{item.areaname}}</div>
            </div>
        </div>
        <div class="btnBottom" >
            <div class="btn" @click="query">确认</div>
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
        routerId(){
            if(sessionStorage.getItem('routerId')){
                return sessionStorage.getItem('routerId')
            }else{
                return ''
            }
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
            showZzc: false, // loading 开关
            areaFlag: true,// 城市接口  开关
            isactive: '0371',
            actionData: '',
            routeName: '',
            routePath: ''
        }
    },
    mounted(){
        this.addr()
    },
    methods:{
        addr(){
            if(this.areaFlag){
                this.isactive='0371';
                this.areaFlag = false;
                this.areaList = []
                this.showZzc = true
                let api = new Api()
                let dataApi = {
                    pAreaId:'76',
                    provinceCode:'76'
                }
                api.onlineByaddress(dataApi).then(res => {
                    if(res.data.msgFlag == '0'){
                        this.showZzc = false
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
                            if(item.areaid == '0371'){
                                this.actionData = item
                            }
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
            }
        },
        actionItem(item,index){
            this.actionData = item
            this.isactive=item.areaid;
        },
        query(){
            if(this.actionData){
                console.log("111111111",this.actionData)
                let data = {
                    'classId': this.classId,
                    'menuId': this.menuId,
                    'provinceCode': this.actionData.provincecode,
                    'cityCode': this.actionData.areaid
                }
                this.showZzc = true
                let api = new Api()
                api.qrcodeSelectMs(data).then(res => {
                    this.showZzc = false
                    if(res.data.msgFlag == '0'){
                        this.$store.commit('updataClassId', res.data.resultJson[0].classId)
                        this.$store.commit('updataStaffId', res.data.resultJson[0].ms)
                        this.$store.commit('updataAddress', this.actionData)
                        sessionStorage.setItem('address',JSON.stringify(this.actionData))
                        sessionStorage.setItem('classId', res.data.resultJson[0].classId)
                        sessionStorage.setItem('staffId',res.data.resultJson[0].ms)
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
                    message:'请选择城市'
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
                background-color: #FFD9B3;
                color: #666;
                border: 1px solid #FFD9B3;
            }
        }

    }
    .btnBottom{
        width: 100%;
        margin: 4vh 0;
        .btn{
            width: 40%;
            margin: 0 auto;
            text-align: center;
            padding: 2vh;
            border-radius: 4px;
            font-size: 2.8vh;
        }
    }
}
</style>