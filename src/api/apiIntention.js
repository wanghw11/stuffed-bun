import axios from 'axios';
import qs from 'qs'
import apiConfig from './apiconfig'
class apiIntention{
    constructor() {
        this.url = apiConfig;//api请求的路径
    }
    // 意向单配置项
    queryPageElements(data){
        let wsmethod = "/mobile/qrocde/queryPageElements.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 查询下单需要的2个参数
    queryPurposeConfig(data){
        let wsmethod = "/mobile/qrocde/queryPurposeConfig.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 登录
    login(data){
        let wsmethod = "/mobile/login/login.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 产品信息查询
    getInfo(data){
        let wsmethod = "/mobile/product/getInfo.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 身份认证
    identityVerify(data){
        let wsmethod = "/mobile/addservice/identityVerify.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
    // 下单
    down(data){
        let wsmethod = "/mobile/booking/down.json";
        return axios.post(this.url+wsmethod, qs.stringify(data))
    }
}
export default apiIntention