import store from './store'
import router from './router'
import Api from './api/apiHome'
let str;
if(process.env.NODE_ENV == 'development'){
  str = 'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/functionVue/index.html?sourceId=100001&routerId=intentionPage&menuId=74&commId=1585874280886469&busiType=5G&token=ax8KssRsuvrn8efOWOIvig'
  // str = 'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/functionVue/index.html?msg=broadPage&staffId=v-zhangys76-i' &token=ax8KssRsuvrn8efOWOIvig
  // str = 'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/functionVue/index.html?sourceId=100200&routerId=speedUpPage&menuId=68'

}else{
  str = window.location.href.split('#')[0]
}
let routerId = ''
let classId = ''
let staffId = ''
let menuId = ''
let token = ''
let classStr = str.split('?')[1] ? str.split('?')[1]:''
let arr;
if (classStr){
  arr = classStr.split('&')
}else{
  arr = []
}
if(classStr.indexOf('msg') != -1) {
  if(classStr.indexOf('speedUpPage') != -1){
    routerId = "/between"
    classId = "100200"
    menuId = "68"
    sessionStorage.setItem('menuId',menuId)
    store.commit('updataMenuId',menuId)
    sessionStorage.setItem('routerId','speedUpPage')
    store.commit('updataRouter', routerId)
    sessionStorage.setItem('classId',classId)
    store.commit('updataClassId', classId)
    arr.map(item => {
      if(item.indexOf('staffId') != -1){
        staffId = item.split('=')[1]
        sessionStorage.setItem('staffId', staffId)
        store.commit('updataStaffId', staffId)
      }
    })
  }else if(classStr.indexOf('broadPage') != -1){
    routerId = "/between"
    classId = "100200"
    menuId = "69"
    sessionStorage.setItem('menuId',menuId)
    store.commit('updataMenuId',menuId)
    sessionStorage.setItem('routerId','broadPage')
    store.commit('updataRouter', routerId)
    sessionStorage.setItem('classId',classId)
    store.commit('updataClassId', classId)
    arr.map(item => {
      if(item.indexOf('staffId') != -1){
        staffId = item.split('=')[1]
        sessionStorage.setItem('staffId', staffId)
        store.commit('updataStaffId', staffId)
      }
    })
  }
}else{
  console.log("222222222",arr)
  arr.map(item => {
    if(item.indexOf('token') != -1){
      token = item.split('=')[1]
      sessionStorage.setItem('tokenId',token)
      store.commit('updataToken', token)
    }else if(item.indexOf('sourceId') != -1 && (sessionStorage.getItem('classId') !== '100200')){
      classId = item.split('=')[1]
      sessionStorage.setItem('classId',classId)
      store.commit('updataClassId', classId)
    }else if(item.indexOf('routerId') != -1){
      routerId = '/' + item.split('=')[1]
      sessionStorage.setItem('routerId',routerId)
      store.commit('updataRouter', routerId)
    }else if(item.indexOf('menuId') != -1  && (sessionStorage.getItem('menuId') !== '70' && sessionStorage.getItem('menuId') !== '72' && sessionStorage.getItem('menuId') !== '73')){
      menuId = item.split('=')[1]
      sessionStorage.setItem('menuId',menuId)
      store.commit('updataMenuId',menuId)
    }else if(item.indexOf('staffId') != -1){
      staffId = item.split('=')[1]
      sessionStorage.setItem('staffId', staffId)
      store.commit('updataStaffId', staffId)
    }
  })
}

  router.beforeEach((to,from,next) => {
    document.title = to.meta.title
    console.log("222222", to)
      if(token){   // 判断是否是个人版
        let api = new Api()
        api.qrcodeSelectTokenId(token).then(res => {
          if(res.data.msgFlag == '0') {
            classId = res.data.resultJson[0].classId
            staffId = res.data.resultJson[0].staffId
            store.commit('updataTokenJson', res.data.resultJson[0])
            store.commit('updataStaffId',res.data.resultJson[0].staffId)
            store.commit('updataClassId',res.data.resultJson[0].classId)
            sessionStorage.setItem('staffId',res.data.resultJson[0].staffId)
            sessionStorage.setItem('classId',res.data.resultJson[0].classId)
            sessionStorage.setItem('tokenJson',JSON.stringify(res.data.resultJson[0]))
          }else{
              alert(res.data.errmsg)
              return
          }
        })
        if (to.path === routerId ||             // 不根据  routerId  跳转  比如  点击之后的
          to.path === '/orderSuccess' ||
          to.path === '/intentionbroadPage' ||
          to.path === '/intentionPage') {
          next();
        } else {
          next({path:routerId})
        }
      }else{
        if(sessionStorage.getItem('staffId')){
          if (to.path === routerId ||
            to.path === '/orderSuccess' ||
            to.path === '/getStaff2' ||
            to.path === '/intentionbroadPage' ||
            to.path === '/broadIptv' ||
            to.path === '/intentionPage') {
            next();
          } else {
            next({path:routerId})
          }
        }else {
          if(routerId == '/product' || routerId == '/iphoneCard' || routerId == '/between'){
            if(to.path == routerId){
              next()
            }else{
              next({path:routerId})
            }
          }else{
            if(to.path == '/getStaff2' || to.path=='/webchat'){
              next()
            }else{
              next({path:'/getStaff2'})
            }
          }
        }
      }
    // }
  })
// }



