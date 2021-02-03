<template>
  <div id="payInfo">
    <van-action-sheet v-model="payShow" :title="payTitle" @cancel='cancel' @click-overlay='cancel'>
      <div v-if="show">
        <van-overlay :show="showZzc" @click="showZzc = false">
          <div class="wrapper" @click.stop>
            <!-- <div class="block" /> -->
            <van-loading size="40px" color="#1989fa" vertical>正在加载支付方式...</van-loading>
          </div>
        </van-overlay>
        <div class="pay">

          <div class="payRows" v-for="(item, index) in payList" :key="index" @click="payItem(item)">
            <div class="payIcon">
              <!-- <img :src="'./static/payfee/payType_'+ item.payWayCode +'.png'" alt=""> -->
              <img :src="'../../static/depositVue/payfee/payType_'+ item.payWayCode +'.png'" alt="">
              <div class="payIcon_font">
                {{item.payWayName}}
              </div>
            </div>
            <div class="payTrue">
              <div class="payTrue_big" :class="item.action ? 'payTrue_color':''">
                <div class="payTrue_little" v-if="item.action"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="queryPay">
          <div class="query_pay" @click="Pay">
            确 定 支 付
          </div>
        </div>
      </div>
      <div v-if="!show" class="qRCode">
        <div class="qrcode_box">
          <div id="qrcode"  ref="qrCodeUrl" >
            <!-- 二维码框 -->
          </div>
        </div>
        <div class="fot">
          {{wait}}
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>
<script>
  import Api from '../../api/apiPayHome'
  import QRCode from 'qrcodejs2'
  import {Dialog} from 'vant';

  export default {
    name: 'phone',
    props: {
      orderParameter: Object
    },
    data() {
      return {
        payTitle: '选择支付方式',
        payShow: true,
        payList: [],
        imgUrl: '10',
        actionItem: '',
        showZzc: true,
        show: true,
        setInterval: '',
        wait: '支付等待!'
      }
    },
    mounted() {
      this.queryPayways()
    },
    methods: {
      // 调取支付列表
      queryPayways() {
        this.showZzc = true
        this.$set(this.orderParameter, 'payWaySource', "02")
        let api = new Api()
        console.log(this.orderParameter);
        const formData = new FormData();
        Object.keys(this.orderParameter).forEach((key) => {
          formData.append(key, this.orderParameter[key]);
        });
        api.queryPayways(formData).then(res => {
          this.showZzc = false
          if (res.data.msgFlag == '0') {
            this.payList = res.data.resultJson.rightInfo;
            console.log(this.payList);
            let imgurl = '../../assets/images/payfee/payType_';
            this.payList.map(item => {
              this.$set(item, 'action', false)
            })
            console.log("111111111111", this.payList)
          } else {
            this.$toast(res.data.respMsg)
          }
        }).catch(error => {
          this.$toast(error)
        })
      },
      // 点击获取方式
      payItem(item) {
        this.payList.map(ite => {
          this.$set(ite, 'action', false)
        })
        this.$set(item, 'action', true)
        this.actionItem = item
        if (item.payWayName.indexOf('支付') < 0) {
          this.payTitle = item.payWayName + '支付'
        } else {
          this.payTitle = item.payWayName
        }
      },
      Pay() {
        this.showZzc = true
        if (this.actionItem) {
          let data = {
            businessTotalFee: this.orderParameter.businessTotalFee,
            orderId: this.orderParameter.orderId,
            ordersId: this.orderParameter.ordersId,
            origTotalFee: this.orderParameter.origTotalFee,
            totalFee: this.orderParameter.origTotalFee,
            payment: {
              payTypeCode: this.actionItem.payTypeCode,
              payTypeName: this.actionItem.payTypeName,
              payWayCode: this.actionItem.payWayCode,
              payWayName: this.actionItem.payWayName,
            }
          }
          let api = new Api()
          api.getPayInfo(data).then(res => {
            this.showZzc = false
            if (res.data.respCode == '0000') {
              this.show = false
              let codeHtml = this.$refs.qrCodeUrl;
              if(codeHtml){
                  codeHtml.innerHTML  = "";
              }
              this.$nextTick(() => {
                let qrcode = new QRCode('qrcode', {
                  width: 200,// 宽度
                  height: 200,  // 高度
                  text: res.data.respData.codeUrl, // 二维码内容
                })
              });

              this.setInterval = setInterval(() => {
                this.waitPay()
              }, 3000)
            } else {
              this.$toast('支付订单生成失败：' + res.data.respMsg)
            }
          }).catch(error => {
            this.$toast(error)
          })
        } else {
          this.$toast('请选择支付方式！')
        }

      },
      cancel() {
        this.$emit('checkFlag')
      },
      waitPay() {
        let data = {
          payWayCode: this.actionItem.payWayCode,
          tradeId: this.orderParameter.orderId,
        }
        let api = new Api()
        api.getOrderResult(data).then(res => {
          if (res.data.respCode == '0001') {
            this.wait = res.data.respMsg + '!'
          } else if (res.data.respCode == '0000') {
            this.wait = res.data.respData.respDesc
            clearInterval(this.setInterval)

            this.show = true
            Dialog.alert({
              message: '下单成功！您的订单号码: ' + this.orderParameter.orderId,
            }).then(() => {
              this.$emit('checkFlag')
              this.$router.push('/index')
            });
          } else {
            this.$toast(res.data.respMsg)
          }
        }).catch(error => {
          this.$toast(error)
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  #payInfo {
    position: fixed;
    bottom: 0;
    height: 80%;
    width: 100%;

    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .pay {
      padding: 1rem;

      .payRows {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        height: 3rem;
        border-bottom: 0.1rem solid #dedede;

        .payIcon {
          display: flex;
          align-items: center;

          img {
            width: 2.2rem;
            height: 2.2rem;
          }

          .payIcon_font {
            margin-left: 1rem;
            font-size: 1rem;
          }
        }

        .payTrue {
          position: relative;

          .payTrue_color {
            border: 1px solid rgb(255, 195, 1) !important;
          }

          .payTrue_big {
            width: 2.2rem;
            height: 2.2rem;
            border: 1px solid #b1b1b1;
            border-radius: 50%;
            background-color: #fff;
            position: relative;
            top: 50%;
            transform: translateY(-50%);

            .payTrue_little {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 1.7rem;
              height: 1.7rem;
              border-radius: 50%;
              background-color: #FFC301;
            }
          }

        }
      }
    }

    .queryPay {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      height: 3rem;

      .query_pay {
        width: 80%;
        margin: 0 auto;
        background-color: #ffc301;
        color: #333;
        border-radius: 8px;
        height: 90%;
        border-width: 2px;
        border-style: solid;
        border-color: -internal-light-dark(rgb(118, 118, 118), rgb(195, 195, 195));
        text-align: center;
        line-height: 2.7rem;
        font-size: 1rem;
      }
    }

    .qRCode {
      width: 100%;
      height: 22rem;
      position: relative;

      .qrcode_box {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80%;
        height: 70%;

        #qrcode {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .fot {
        position: absolute;
        bottom: 5%;
        width: 100%;
        text-align: center;
      }
    }
  }


</style>
