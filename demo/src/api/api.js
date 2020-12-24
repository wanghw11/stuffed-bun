import axios from 'axios';
import qs from 'qs'
import apiConfig from './apiconfig'
class apiContract{
    constructor() {
        this.url = apiConfig;//api请求的路径

    }
    // 获取地址
    qryQRCodeAddress(){
        let wsmethod = "/mobile/online/qryQRCodeAddress.json";
        return axios.post(this.url+wsmethod)
    }
    onlineByaddress(data){
        let wsmethod = "/mobile/online/onlineByaddress.json";
        return axios.post(this.url+wsmethod,qs.stringify(data))
    }
    // 获取工号
    qrcodeSelectMs(data){
        let wsmethod = "/mobile/qrocde/qrcodeSelectMs.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 根据工号获取地市
    aotoLogin(data){
        let wsmethod = "/mobile/tgInfo/aotoLogin.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 埋点
    doUserVisitLog(data){
        let wsmethod = "/smartstore_server/userVisit/doUserVisitLog";
        return axios.post(wsmethod, qs.stringify(data))
    }
}
export default apiContract