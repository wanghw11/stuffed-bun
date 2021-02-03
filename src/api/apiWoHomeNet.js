import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'
class apiContract{
  constructor() {
    this.url = apiConfig;//api请求的路径
  }
  // 获取商品
  qryProductInfo(staffId){
    let wsmethod = "/mobile/addservice/getInfo.json";
    let data = {
      staffId:staffId
    };
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  // 登录
  login(data){
    let wsmethod = "/mobile/login/login.json";
    return axios.post(this.url+wsmethod, qs.stringify(data))
  }

  // 三户校验
  checkNum(phone){
    let wsmethod = "/mobile/mobileToBroadbandController/checkMobileBroadbandNum.json";
    let data = {
      serialNumber: phone
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  // 查询地址
  qryAddress(params){
    let wsmethod = "/mobile/AcceptActionInfo/userDataCheckByUser.json";
    return axios.post(this.url + wsmethod, qs.stringify(params))
  }

  // 校验优惠券
  checkCoupon(params){
    let wsmethod = "/mobile/coupon/chkCoupon.json";
    return axios.post(this.url + wsmethod, qs.stringify(params))
  }

  // 校验
  identityVerify(params){
    let wsmethod = "/mobile/addservice/identityVerify.json";
    return axios.post(this.url + wsmethod, qs.stringify(params))
  }

  // 下单
  downOrder(params){
    let wsmethod = "/mobile/addservice/kdOrderCenter.json";
    return axios.post(this.url + wsmethod, qs.stringify(params))
  }

  // 下单
  downOrder2(params){
    let wsmethod = "/mobile/addservice/kdOrderCenter2.json";
    return axios.post(this.url + wsmethod, qs.stringify(params))
  }

  // 2. qrcodeSelectTokenId.json通过tokenId查询token信息【参数token_id】
  qrcodeSelectTokenId(tokenId){
    let wsmethod = "/mobile/qrocde/qrcodeSelectTokenId.json";
    let data = {
      token_id: tokenId
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }


}
export default apiContract
