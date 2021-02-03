import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'

class apiContract {
    constructor() {
        this.url = apiConfig;//api请求的路径
    }

    //登录
    init(data) {
        // touch-qrcode/business/wizard/init?token=02g0R0d472H6wg54931978
        // let wsmethod = "/business/wizard/init?token=02g0R0d472H6wg54931978";
        let wsmethod = "/mobile/login/login.json";
        return axios.post(this.url + wsmethod, qs.stringify(data))

    }

    // 2. qrcodeSelectTokenId.json通过tokenId查询token信息【参数token_id】
    qrcodeSelectTokenId(tokenId){
        let wsmethod = "/mobile/qrocde/qrcodeSelectTokenId.json";
        let data = {
            token_id: tokenId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }

    // 宽带号码查询  IPTV
    checkBroadNum(serialNumber){
        let wsmethod = "/mobile/checkBroadNum/checkBroadNum.json";
        let data = {
            serialNumber:serialNumber,
            broadbandAddIptvTag:'1',
            iPTVServerTag:'1',
            commType:'36'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    
    // 获取验证码
    sendMsg(phoneNumber) {
        let wsmethod = "/mobile/mobileToBroadbandController/sendMsg.json";
        let data = {
        phoneNumber: phoneNumber,
            tradeType: '015-app-kuandai'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    getRandomNum(phoneNumber) {
        let wsmethod = "/mobile/mobileToBroadbandController/getRandomNum.json";
        let data = {
          phoneNumber: phoneNumber
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    queryEye(product){
        let wsmethod = "/mobile/addForEye/queryEye.json";
        let data = {
            productId: product,
            commType: '36'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    downEye(data){
        let wsmethod = "/mobile/addForEye/downEye.json";
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
}

export default apiContract
