import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'
class apiContract{
    constructor() {
        this.url = apiConfig;//api请求的路径
    }
    init(staffId){
        // touch-qrcode/business/wizard/init?token=02g0R0d472H6wg54931978
        // let wsmethod = "/business/wizard/init?token=02g0R0d472H6wg54931978";
        let wsmethod = "/mobile/login/login.json";
        let data = {
            staffId:staffId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
            
    }
    // 查询宽带号
    userBroadQry(phone){
        let wsmethod = "/mobile/getInfo/userBroadQry.json";
        let data = {
            keyCode:phone
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
            commType:'233'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 根据宽带号码  获取手机号
    qryMainNumber(serialNumber){
        let wsmethod = "/mobile/getInfo/qryMainNumber.json";
        let data = {
            serialNumber:serialNumber,
            broadbandAddIptvTag:'1',
            iPTVServerTag:'1',
            commType:'233'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
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
    // 验证码验证
    getRandomNum(randomNum,phoneNumber){
        let wsmethod = "/mobile/mobileToBroadbandController/getRandomNum.json";
        let data = {
            phoneNumber:phoneNumber,
            randomNum:randomNum
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 宽带+iptv  下单
    broadbandAddIptv(data){
        let wsmethod = "/mobile/iptv/broadbandAddIptv.json";
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 宽带+iptv  0元下单
    zeroOrderinfoSubTg(data){
        let wsmethod = "/mobile/payfee/zeroOrderinfoSubTg.json";
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 获取地址
    qryQRCodeAddress(){
        let wsmethod = "/mobile/online/qryQRCodeAddress.json";
        return axios.post(this.url+wsmethod)
    }
    // 获取工号
    getStaffIdAndBelong(code){
        let wsmethod = "/mobile/cityToStaffId/getStaffIdAndBelong.json";
        let data = {
            code: code,
            source: '100001'
        }
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
}
export default apiContract