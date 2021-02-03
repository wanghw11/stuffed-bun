<template>
    <div class="orderSuccess">
        <div class="top">
            <div class="bgimg">
                <img src="../../assets/icon/img/bg.png" alt="">
            </div>
            <div class="title">
                <div class="titleTop">
                    <span v-if="successFlag">下单成功</span>
                    <span v-if="!successFlag">下单失败</span>
                </div>
                <div class="titleBtm">
                    <span v-if="successFlag">您的订单已确认，稍后将由客服人员跟您联系接洽。</span>
                    <span v-if="!successFlag">您的订单提交预约时遇到问题，请重新填写预约。</span>
                </div>
            </div>
            <div class="successImg">
                <img src="../../assets/icon/img/成功.png" v-if="successFlag" alt="">
                <img src="../../assets/icon/img/失败.png" v-if="!successFlag" alt="">
            </div>
        </div>
        <div class="content" v-if="successFlag">
            <div class="content_item">
                <div>
                    订单编号
                </div>
                <div style="color:#FFA423;">
                    {{orderId.orderId}}
                </div>
            </div>
            <div class="content_item" v-if="orderId.productInfo">
                <div>
                    产品信息
                </div>
                <div style="color:#FFA423;">
                    {{orderId.productInfo}}
                </div>
            </div>
            <div class="content_item">
                <div>
                    提交时间
                </div>
                <div style="color:#FFA423;">
                    {{time}}
                </div>
            </div>
        </div>
        <div class="content" v-if="!successFlag">
            <div class="content_item">
                <div style="color:#FFA423;">
                    {{orderId.error? orderId.error:''}}
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="btm_success" v-if="successFlag">
                <div class="miao">
                    <span style="color:#FF5617;">{{miao}}S</span>后自动退出
                </div>
                <div class="btn" @click="onSuccess">
                    退出
                </div>
            </div>
            <div class="btm_success" v-if="!successFlag">
                <div class="btn" @click="onFail">
                    重新填写
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        orderId(){
            return this.$store.state.orderData
        },
        time(){
            return moment(new Date()).format("YYYY-MM-DD")
        }
    },
    mounted(){
        if(this.orderId.successFlag == '1'){
            this.successFlag = true
        }else{
            this.successFlag = false
        }
        let interval = setInterval(()=>{
            this.miao --
            if(this.miao == 0){
                clearInterval(interval)
                this.$router.go(-1)
            }
        },1000)
    },
    data(){
        return {
            successFlag: true,
            miao: 10,
        }
    },
    methods:{
        onSuccess(){
            this.$router.go(-1)
        },
        onFail(){
            this.$router.go(-1)
        }
    }

}
</script>
<style lang="scss" scoped>
.orderSuccess{
    background-color: #fff;
    height: 100vh;
    .top{
        position: relative;
        .bgimg{
            img{
                display: block;
                width: 100%;
            }
        }
        .title{
            width: 100vw;
            position: absolute;
            top: 12%;
            text-align: center;
            .titleTop{
                font-size: 30px;
                color: #fff;
                font-weight: 600;
                margin-bottom: 10px;
            }
            .titleBtm{
                color: #fff;
                margin-bottom: 10px;
            }
        }
        .successImg{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 65%
        }
    }
    .content{
        padding: 0 65px;
        box-sizing: border-box;
        width: 100vw;
        .content_item{
            padding: 20px 0;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
        }
    }
    .bottom{
        margin-top: 80px;
        .btm_success{
            width: 60%;
            margin: 0 auto;
            .miao{
                text-align: center;
                margin-bottom: 10px;
                color:#8d8d8d;
            }
            .btn{
                padding: 15px 0;
            }
        }
        .btm_fail{
            width: 60%;
            margin: 0 auto;
        }
    }
}
</style>