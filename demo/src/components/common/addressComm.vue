<template>
    <div id="addressComm">
        <div class="address">
            <div class="item1">所在区域：</div>
            <div class="item2">
                <input type="text" readonly onfocus="this.blur()" :value='addressList' @click="onInput" placeholder="河南省—郑州市—二七区" >
            </div>
        </div>
        <van-action-sheet v-model="show"  title="选择地址">
            <div class="content">
                <div class="addr_title">
                    <div class="addr_title_item" @click="onProvince">{{provinceTitle.areaname}}</div>
                    <div class="addr_title_item" @click="onCity">{{cityTitle.areaname}}</div>
                    <div class="addr_title_item" @click="onCounty">{{countyTitle.areaname}}</div>
                </div>
                <div class="addr_cont">
                    <div class="addr_cont_item">
                        <div class="province" v-for="(item, index) in areaList" :key="index" @click="onClick(item)">{{item.areaname}} </div>
                    </div>
                </div>
                <div class="confirm">
                    <div class="confirmOn" @click="confirm">
                        确定
                    </div>
                </div>
            </div>
        </van-action-sheet>
    </div>
</template>
<script>
import Api from '../../api/api'
export default {
    name: 'addressComm',
    data(){
        return {
            show: false,
            addressList:'',
            provinceTitle: {
                areaname: '请选择省'
            },
            cityTitle: {
                areaname: '请选择市'
            },
            countyTitle: {
                areaname: '请选择区'
            },
            areaList: [],
            value:'',
            dataCan: {}
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.areaList = []
            let api = new Api()
            let dataApi = {
                pAreaId:"0"
            }
            api.onlineByaddress(dataApi).then(res => {
                if(res.data.msgFlag == '0'){
                    let data = res.data.datum.addressInfo.addressInfo
                    data.map(item => {
                        if(item.areaid == '76'){
                            this.provinceTitle = item
                        }
                    })
                    let can = {
                        'pAreaId':this.provinceTitle.areaid,
                        'provinceCode':this.provinceTitle.provincecode
                    }
                    this.dataCan = {
                        'pAreaId':this.provinceTitle.areaid,
                        'provinceCode':this.provinceTitle.provincecode
                    }
                    this.initAddress(can)
                }else{
                    this.$toast(res.data.respMsg)
                }
            }).catch(error => {
                this.$toast(error)
            })
        },
        initAddress(data){
            this.areaList = []
            let api = new Api()
            let dataApi = {
                pAreaId:data.pAreaId,
                provinceCode:data.provinceCode
            }
            api.onlineByaddress(dataApi).then(res => {
                if(res.data.msgFlag == '0'){
                    let dataList = res.data.datum.addressInfo.addressInfo
                    this.areaList = dataList
                    
                }else{
                    this.$toast(res.data.respMsg)
                }
            }).catch(error => {
                this.$toast(error)
            })
        },
        onClick(item){
            console.log("111111111",item)
            if(item.provincecode == item.areaid){// 选中省
                this.provinceTitle = item
                let data = {
                    'pAreaId':item.areaid,
                    'provinceCode':item.provincecode
                }
                this.dataCan = {
                    'pAreaId':item.areaid,
                    'provinceCode':item.provincecode
                }
                this.cityTitle.areaname = '请选择市'
                this.countyTitle.areaname = '请选择区'
                this.initAddress(data)
            }else 
            if(item.provincecode == item.pareaid){ // 选中市
                this.cityTitle = item
                let data = {
                    'pAreaId':item.areaid,
                    'provinceCode':item.provincecode
                }
                this.dataCan = {
                    'pAreaId':item.areaid,
                    'provinceCode':item.provincecode
                }
                this.countyTitle.areaname = '请选择区'
                this.initAddress(data)
            }else{
                this.countyTitle = item
            }
        },
        onProvince(){
            // this.provinceTitle.areaname = '请选择省'
            // this.cityTitle.areaname = '请选择市'
            // this.countyTitle.areaname = '请选择区'
            // this.initAddress()

        },
        onCity(){
            this.cityTitle.areaname = '请选择市'
            this.countyTitle.areaname = '请选择区'
            if(this.provinceTitle.areaname == '请选择省'){
                this.$toast("请按顺序选择城市！")
                return
            }
            let data= {
                'provinceCode': this.dataCan.provinceCode
            }
            this.initAddress(data)

        },
        onCounty(){
            this.countyTitle.areaname = '请选择区'
            if(this.cityTitle.areaname == '请选择市'){
                this.$toast("请按顺序选择城市！")
                return
            }
            this.initAddress(this.dataCan)

        },
        onInput(){
            this.show = true
        },
        // 点击确认按钮
        confirm(){
            if(this.countyTitle.areaname == '请选择区') {
                this.$toast('请正确选择城市！')
                return
            }
            this.show = false

            let obj = {
                provinceTitle: this.provinceTitle,
                cityTitle: this.cityTitle,
                countyTitle: this.countyTitle
            }
            let str = this.provinceTitle.areaname +'-'+ this.cityTitle.areaname + '-' + this.countyTitle.areaname
            this.$set(obj, 'inputValue', str)
            this.addressList = str
            this.$emit('addressList',obj)
        },
    }
}
</script>
<style lang="scss" scoped>
    #addressComm{
        width: 100%;
        .address{
            padding: 1%;
            display: flex;
            .item1{
                flex: 2;
                margin: 0;
            }
            
            .item2{
                flex: 5;
                input{
                    height: 100%;
                    width: 100%;
                }
            }
        }
        .content {
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
            .addr_cont{
                display: flex;
                margin-top: 10px;
                height: 70%;

                .addr_cont_item{
                    flex:1;
                    overflow: scroll;
                    text-align: center;
                    .province{
                        height: 2rem;
                        line-height: 2rem;
                    }
                }
            }
            .confirm{
                margin-top: 5px;
                text-align: center;
                .confirmOn{
                    width: 90%;
                    line-height: 2.5rem;
                    border: 1px solid #ccc;
                    margin: auto;
                    border-radius: 8px;
                    background-color:#3F80F7;
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
    }

</style>