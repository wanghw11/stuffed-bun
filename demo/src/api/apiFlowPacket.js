import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'

class apiContract {
  constructor() {
    this.url = apiConfig;//api请求的路径
  }

  //登录
  login(staffId) {
    let wsmethod = "/mobile/tgInfo/aotoLogin.json";
    let data = {
      ms: staffId
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  init(staffId) {
    // touch-qrcode/business/wizard/init?token=02g0R0d472H6wg54931978
    // let wsmethod = "/business/wizard/init?token=02g0R0d472H6wg54931978";
    let wsmethod = "/mobile/login/login.json";
    let data = {
      staffId: staffId
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))

  }

  //获取流量专区列表
  qryCbssPromByProductIdLimitAll(data) {
    let wsmethod = "/mobile/AcceptActionInfo/qryCbssPromByProductIdLimit.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  // 2. qrcodeSelectTokenId.json通过tokenId查询token信息【参数token_id】
  qrcodeSelectTokenId(tokenId) {
    let wsmethod = "/mobile/qrocde/qrcodeSelectTokenId.json";
    let data = {
      token_id: tokenId
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  qrcodeUpdataToken(classId, staffId, extraParams, router) {
    let wsmethod = "/mobile/qrocde/qrcodeUpdataToken.json";
    // token_id=&token_route=/cc&invalid_time=2020-09-09&valid_time=2020-09-09&valid_time_type=99&extra_params=&expire_mode=2&
    // create_time=2020-09-09%20&update_time=2020-09-09&staff_id=v-liming&class_id=3027&remark=mingming
    let data = {
      token_id: '',
      token_route: router,
      invalid_time: '2020-09-09',
      valid_time: '2020-09-09',
      valid_time_type: '99',
      extra_params: extraParams,
      expire_mode: '2',
      create_time: '2020-09-09',
      update_time: '2020-09-09',
      staff_id: staffId,
      class_id: classId,
      remark: 'mingming'
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  qryCbssPromByProductIdLimit(busiType, jfproductid) {
    let wsmethod = "/mobile/JfSysAcceptActionInfo/qryCbssPromByProductIdLimit.json";
    let data = {
      busiType: busiType,
      jfproductid: jfproductid
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  userDataCheck(serialNumber) {
    let wsmethod = "/mobile/AcceptActionInfo/userDataCheck.json";
    let data = {
      serialNumber: serialNumber
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  orderCommit(data) {
    let wsmethod = "/mobile/JfSysAcceptActionInfo/orderCommit.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  sendMsg(phoneNumber) {
    let wsmethod = "/mobile/AcceptActionInfo/sendMsg.json";
    let data = {
      phoneNumber: phoneNumber,
      tradeType: '056-sms-data-package'
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  zeroOrderinfoSubTg(data) {
    let wsmethod = "/mobile/payfee/zeroOrderinfoSubTg.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  getProcessData(orderId) {
    let wsmethod = "/mobile/process/getProcessData.json";
    let data = {
      orderId: orderId
    }
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }
}

export default apiContract
