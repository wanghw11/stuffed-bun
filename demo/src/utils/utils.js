import Vue from 'vue'
import CryptoJS from 'crypto-js'
import CryptoJS2 from 'crypto'
import { Toast } from 'vant';
const AES_KEY = 'indieKey20020607';
const IV = '9080706050403006';
export default {
  /**
   * 加密
   * params   需要加密的字符串
   */
  encrypt(params) {
    var md5 = CryptoJS2.createHash("md5");
    md5.update(params);
    var password = md5.digest('hex');
    return password;
  },
  /**
   * 解密
   * word   解密的字符串
   */
  docrypt(word) {
    let key = CryptoJS.enc.Utf8.parse(AES_KEY)
    let iv = CryptoJS.enc.Utf8.parse(IV)
    let decrypt = CryptoJS.AES.decrypt(word, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },


  encode(str) {
    // 对编码的字符串转化base64
    var base64 = btoa(str);
    return base64;
  },

  // base64转字符串
  decode(base64) {
    // 对base64转编码
    var str = atob(base64);
    return str;
  },

  //证件加密
  cardEncrypt(content, type) {
    if (!content) {
      return "无";
    }
    let reurnContent = "";
    if (type == 'custName') {
      //用户姓名脱密
      if (1 < content.length && content.length < 4) {
        reurnContent = content.substring(0, 1);
        for (let i = 0; i < content.length - 1; i++) {
          reurnContent = reurnContent + "*";
        }
      } else if (content.length > 3) {
        reurnContent = content.substring(0, 2);
        for (let i = 0; i < content.length - 2; i++) {
          reurnContent = reurnContent + "*";
        }
      }
    } else if (type == 'certCode') {
      //用户身份证脱密
      reurnContent = content.substring(0, content.length - 12) + "************";
    } else if (type == 'phone') {
      //用户号码脱密
      reurnContent = content.substring(0, content.length - 4);
      for (let i = 0; i < 4; i++) {
        reurnContent = reurnContent + "*";
      }
    } else if (type == 'address') {
      //用户住址脱密
    } else if (type == 'imei') {
      //IMEI脱密
    } else if (type == 'position') {
      //位置信息脱密
    }
    return reurnContent;
  },
  //截取生日
  birth(idCard) {
    let birthday = "";
    if (idCard != null && idCard != "") {
      if (idCard.length == 15) {
        birthday = "19" + idCard.substr(6, 6);
      } else if (idCard.length == 18) {
        birthday = idCard.substr(6, 8);
      }
      birthday = birthday.replace(/(.{4})(.{2})/, "$1$2");
    }
    return birthday;
  },
  //性别
  Getsex(psidno) {
    let sexno = "";
    let sex = "";
    if (psidno.length == 18) {
      sexno = psidno.substring(16, 17)
    } else if (psidno.length == 15) {
      sexno = psidno.substring(14, 15)
    } else {
      this.dialogUp("错误的身份证号码，请核对！")
      return false
    }
    let tempid = sexno % 2;
    if (tempid == 0) {
      sex = '女'
    } else {
      sex = '男'
    }
    return sex
  },


  // loading  方法
  loadingStart(tips) {
    Toast.loading({
        message: tips,
        forbidClick: true,
        duration: 0,
        overlay: true,
    })
  },
  loadingStop() {
    Toast.clear()
  },

}
