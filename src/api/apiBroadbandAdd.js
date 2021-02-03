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

  //校验号码
  checkMobileBroadbandNum(phone) {
    let wsmethod = "/mobile/mobileToBroadbandController/checkMobileBroadbandNum.json";
    let data = {
      serialNumber: phone
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  //获取触点开关
  qryAllSwitch() {
    let wsmethod = "/mobile/tcfBean/qryAllSwitch.json";
    let data = {
      switchParams: [{"funName": "tcfSwitch"}, {"funName": "mobilaSwitch"}, {"funName": "mainCardSwitch"}]
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

  // 验证码验证
  getRandomNum(phoneNumber) {
    let wsmethod = "/mobile/mobileToBroadbandController/getRandomNum.json";
    let data = {
      phoneNumber: phoneNumber
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  // 获取全部地址
  qryQRCodeAddress() {
    let wsmethod = "/mobile/online/qryQRCodeAddress.json";
    return axios.post(this.url + wsmethod)
  }

  // 获取调测地址
  mofficeId(data) {
    let wsmethod = "/mobile/appMobileToBroadband/mofficeId.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  // 下单
  submitFuseInto(datas) {
    let data={
      data:datas
    }
    let wsmethod = "/mobile/openAccountFaceBeanController/submitFuseInto.json";
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
  // 身份认证
  identityVerify(data){
    let wsmethod = "/mobile/addservice/identityVerify.json";
    return axios.post(this.url+wsmethod, qs.stringify(data))
  }
  coupon(data){
    let wsmethod = "/mobile/coupon/chkCoupon.json";
    return axios.post(this.url+wsmethod, qs.stringify(data))
  }
  submitFuseInto0kuandai(datas){
    let data={
      data:datas
    }
    let wsmethod = "/mobile/openAccountFaceBeanController/submitFuseInto0kuandai.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }
}

export default apiContract
