import axios from 'axios';
import qs from 'qs'
class apiPay{
    constructor() {
        this.url = "/touch-qrcode";//api请求的路径
        // this.url = "https://bdbg.bdstcowlw.cn";//api请求的路径
        // http://192.168.0.113:9001/touch-qrcode/business/wizard/init?token=02g0R0d472H6wg54931978
        // http://192.168.0.143:8081/#/index
    }

    // 调取支付列表
    queryPayways(data){
        let wsmethod = "/onlinePay/queryPayways";
        data.source = '01'
        return axios.post(this.url + wsmethod,data)
    }
    // 选中支付   调取二维码
    getPayInfo(data){
        let wsmethod = "/onlinePay/getPayInfo";
        data.source = '01'
        data.checkLastTrade = false
        return axios.post(this.url + wsmethod,data)
    }
    // 订单状态查询
    depositOrderState(orderId){
        let wsmethod = "/business/deposit/depositOrderState";
        let data = {
            orderId:orderId,
            step:'00'
        }
        return axios.post(this.url + wsmethod,data)
    }
    // 等待支付  支付完成
    getOrderResult(data){
        let wsmethod = "/onlinePay/getOrderResult";
        data.checkLastTrade = false
        return axios.post(this.url + wsmethod,data)
    }

    // 获取支付方式   新二维码
    GetPayfeeAuthentication(payWaySource, origTotalFee){
        let wsmethod = "/mobile/payfee/GetPayfeeAuthentication.json";
        let data = {
            payWaySource:payWaySource,
            origTotalFee:origTotalFee
        }
        return axios.post(this.url + wsmethod,data)
    }

}
export default apiPay