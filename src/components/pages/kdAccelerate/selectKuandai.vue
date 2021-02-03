<template>
    <div class="selectKuandai">
        <div class="title">
            <div class="title-s">
                <div class="secah">
                    <van-search v-model="searchData" @search="userBroadQry" shape="round" background="#fff" placeholder="请输入证件号或手机号" />
                </div>
                <div class="xiaoyanBtn" @click="userBroadQry">
                    <div class="search-btn">
                        查询
                    </div>
                </div>
            </div>
        </div>
        <div >
            <div class="userMsg" style="font-size:16px;text-align:left;" v-if="kuandaiDataFlag">
                <div style="line-height: 40px;font-weight:600;position: relative;">
                    <div>宽带信息</div>
                    <div @click="xuanz1 = !xuanz1" :class="xuanz1?'xuanzShun':''" style="position: absolute;top:40%;right:0;border-color: #000 #fff #fff #fff;border-style: solid;border-width: 8px 8px 0 8px;height: 0;width: 0;"></div>

                </div>
                <div style="height:25vh; overflow: scroll " >
                    <div class="content "  :class="colorFlag? 'cor':''" style="margin-bottom:10px;"  @click="firm">
                        <div class="content-item">
                            <span class="item-name">客户名称：</span>
                            <span class="item-content">
                            {{kuandaiData.certName}}
                            </span>
                        </div>
                        <div class="content-item">
                            <span class="item-name">宽带套餐：</span>
                            <span class="item-content">
                                {{kuandaiData.productName}}
                            </span>
                        </div>
                        <div class="content-item">
                            <span class="item-name">宽带号码：</span>
                            <span class="item-content">
                            {{kuandaiData.accountNet}}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <footer style="background: white;">
            <div class="btn" @click="confirm" style="font-size:16px;">确认</div>
        </footer>
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Loading from '../../common/loading'
import Api from '../../../api/apiIPTV'
export default {
    name:'selectKuandai',
    components: {
        Loading
    },
    data(){
        return {
            searchData:'',
            showZzc: false,
            confirmKuandai:'',
            xuanz1:true,
            show:false,
            kuandaiData:{},
            colorFlag:false,
            kuandaiDataFlag: false
        }
    },
    mounted(){
        // this.kuandaiData = []
        // this.xuanz1 = false
    },
    methods:{
        userBroadQry(){
            console.log("searchData",this.searchData)
            if(this.searchData == ''){
                this.$toast('请输入证件号或手机号！')
                return
            }
            this.kuandaiData = {}
            this.xuanz1 = true
            this.showZzc = true
            let api = new Api()
            api.userBroadQry(this.searchData).then(res => {
                console.log("111111111",res)
                this.showZzc = false
                if(res.data.resultJson['RSP_CODE'] == '8888'){
                    this.$toast(res.data.resultJson['RSP_DESC'])
                }else{
                    this.$toast('查询成功')
                    this.kuandaiData = res.data.resultJson['DATA'][0]['broadeInfo'][0]
                    this.kuandaiDataFlag = true
                }
            })
        },
        firm(){
            this.colorFlag = true
            this.confirmKuandai = this.kuandaiData
            
        },
        confirm(){
            if(this.confirmKuandai != ''){
                this.$emit('getKuandai',this.confirmKuandai)
            }else{
                this.$toast('请选择宽带号码！')
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.selectKuandai{
    width: 100%;
    height: 50vh;
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
            .xiaoyanBtn{
                margin-left: 10px;
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
        }
    }
    .xuanzShun{
        transform: rotate(180deg);
    }
    .userMsg{
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        margin: 10px;
        border-radius: 5px;
        .cor{
            background-color: #FAF3D9 !important;
        }

        .content{
            padding: 10px;
            box-sizing: border-box;
            background-color: #f2f2f2;
            .content-item{
                display: flex;
                // align-items: center;
                // margin-bottom: 10px;
                // font-size: 12px;
                .item-name{
                    flex:3;
                }
                .item-content{
                    flex:8;
                    .van-cell{
                        padding: 0;
                    }
                }
            }
        }
    }
    footer{position: fixed;bottom: 0;width:100%; padding: 0 20px; box-sizing: border-box; }
    footer .btn{margin: 5px 0px;}
    .btn{background:#3f80f7;color: white;font-weight: bold;padding: 14px;text-align: center;border-radius: 4px;}
    
}
</style>