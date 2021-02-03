import axios from 'axios';
import apiConfig from './apiconfig'
import qs from 'qs'

class apiGuide {
  constructor() {
    this.url = apiConfig;//api请求的路径
  }

  // 获取地址
  qryGuidByClassIdMenuId(data) {
    let wsmethod = "/mobile/qrocde/qryGuidByClassIdMenuId.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }

  getBussinessCard(data) {
    let wsmethod = "/mobile/webchat/getBussinessCard.json";
    return axios.post(this.url + wsmethod, qs.stringify(data))
  }
}

export default apiGuide
