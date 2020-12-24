import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'
import utils from '../utils/utils'
class apiGuide{
    constructor() {
        this.url = apiConfig;//api请求的路径
    }
    // 测试
    demoTestEncryp(){
        let date = Date.now()
        let pwd = 'accessKey=test&id=20&name=zhangsan&nonce=a'+date+'&secretKey=test&timestamp='+date
        let sign = utils.encrypt(pwd); // md5 加密
        let data = {
            name:'zhangsan',
            id:'20',
            timestamp:date,
            accessKey:'test',
            nonce:'a'+date,
            sign:sign
        }
        let wsmethod = "/api/api/demoTestEncryp";
        return axios.post(wsmethod, data,{
            'Content-Type':'application/x-www-form-urlencoded',
            'charset':'UTF-8'
        })
    }
    // 登录
    login(data){
        let wsmethod = "/mobile/login/login.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 获取验证码
    sendMsg(phoneNumber){
        let wsmethod = "/mobile/mobileToBroadbandController/sendMsg.json";
        let data = {
            phoneNumber:phoneNumber,
            tradeType:'015-app-kuandai'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 发送短信
    sendMsg2(phoneNumber,orderId){
        let wsmethod = "/mobile/mobileToBroadbandController/sendMsg.json";
        let data = {
            phoneNumber:phoneNumber,
            tradeType:'127-wit-prefecture-order',
            orderId: orderId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 验证码验证
    getRandomNum(phoneNumber){
        let wsmethod = "/mobile/mobileToBroadbandController/getRandomNum.json";
        let data = {
            phoneNumber:phoneNumber,
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 三户校验
    
    checkMobileBroadbandNum(phone){
        let wsmethod = "/mobile/mobileToBroadbandController/checkMobileBroadbandNum.json";
        let data = {
            serialNumber: phone
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }

    userBroadQry(data){
        let wsmethod = "/mobile/getInfo/userBroadQry.json";
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }

}
export default apiGuide