import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'
class apiPay{
  constructor() {
    this.url = apiConfig;//api请求的路径
  }

  // 调取支付列表
  queryPayways(data){
    let wsmethod = "/mobile/payfee/GetPayfeeAuthentication.json";
    return axios.post(this.url + wsmethod,data)
  }
  // 选中支付   调取二维码
  getPayInfo(data){
    let wsmethod = "/mobile/onlinePay/getPayInfo";
    data.source = '01'
    data.checkLastTrade = false
    return axios.post(this.url + wsmethod,data)
  }
  // 订单状态查询
  depositOrderState(orderId){
    let wsmethod = "/mobile/business/deposit/depositOrderState";
    let data = {
      orderId:orderId,
      step:'00'
    }
    return axios.post(this.url + wsmethod,data)
  }
  // 等待支付  支付完成
  getOrderResult(data){
    let wsmethod = "/mobile/onlinePay/getOrderResult";
    data.checkLastTrade = false
    return axios.post(this.url + wsmethod,data)
  }

}
export default apiPay
