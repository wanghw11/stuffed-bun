import axios from 'axios';
import qs from 'qs'
import apiConfig from './apiconfig'
class apiContract{
    constructor() {
        this.url = apiConfig;//api请求的路径
    }
    // 1. qrcodeByClass.json 获取来源信息【参数classId】
    qrcodeByClass(classId){
        let wsmethod = "/mobile/qrocde/qrcodeByClass.json";
        let data = {
            classId: classId
        }
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
    // 3. qrcodeUpdataToken.json tokenId生成【详细单独描述】
    qrcodeUpdataToken(classId, staffId, extraParams, router){
        let wsmethod = "/mobile/qrocde/qrcodeUpdataToken.json";
        // token_id=&token_route=/cc&invalid_time=2020-09-09&valid_time=2020-09-09&valid_time_type=99&extra_params=&expire_mode=2&
        // create_time=2020-09-09%20&update_time=2020-09-09&staff_id=v-liming&class_id=3027&remark=mingming
        let data = {
            token_id: '',
            token_route: router,
            invalid_time: '2020-09-09',
            valid_time:'2020-09-09',
            valid_time_type:'99',
            extra_params: extraParams,
            expire_mode:'2',
            create_time:'2020-09-09',
            update_time:'2020-09-09',
            staff_id: staffId,
            class_id: classId,
            remark:'mingming'
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 4. qrcodeClassStyle.json 通过classId查询来源样式【参数classId】
    qrcodeClassStyle(classId){
        let wsmethod = "/mobile/qrocde/qrcodeClassStyle.json";
        let data = {
            classId: classId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 5. qrcodeClassColumnMenu.json查询来源栏目菜单 【参数classId 和  columnId】
    qrcodeClassColumnMenu(classId,columnId){
        let wsmethod = "/mobile/qrocde/qrcodeClassColumnMenu.json";
        let data = {
            classId: classId,
            columnId: columnId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 6. qrcodeRotation.json查询轮播图 【参数classId】
    qrcodeRotation(classId){
        let wsmethod = "/mobile/qrocde/qrcodeRotation.json";
        let data = {
            classId: classId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
    }
    // 7. qrcodeClassColumn.json  查询来源栏目 【参数classId】
    qrcodeClassColumn(classId){
        let wsmethod = "/mobile/qrocde/qrcodeClassColumn.json";
        let data = {
            classId: classId
        }
        return axios.post(this.url + wsmethod, qs.stringify(data))
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
}
export default apiContract