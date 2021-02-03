import Vue from 'vue'
import Router from 'vue-router'
// import login from '../components/home/login'


Vue.use(Router)
// 解决重复路由跳转   路由重定向
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}
// const _import = require('./import-' + process.env.NODE_ENV)
export default new Router({
  // mode: 'history',
  // base: '/wizard/',
  routes: [
    // { path: "/", redirect: "/getStaff2" },
    { // 不带省份
      path: "/getStaff2",
      name: "getStaff2",
      component: resolve =>
        require(["../components/common/getStaff2"], resolve),
      meta: { title: "获取地市" }
    },
    {
      path: "/getStaff",
      name: "getStaff",
      component: resolve => require(["../components/common/getStaff"], resolve),
      meta: { title: "获取地市" }
    },
    {
      path: "/broadIptv",
      name: "broadIptv",
      component: resolve =>
        require(["../components/pages/iptv/broadIptv"], resolve),
      meta: { title: "宽带+iptv" }
    },
    {
      path: "/intentionPage",
      name: "intentionPage",
      component: resolve =>
        require(["../components/pages/intention/intentionPage"], resolve),
      meta: { title: "" }
    },
    {
      path: "/kdAccelerate",
      name: "kdAccelerate",
      component: resolve =>
        require(["../components/pages/kdAccelerate/kdAccelerate"], resolve),
      meta: { title: "宽带提速正式单" }
    },
    {
      path: "/iphoneCard",
      name: "iphoneCard",
      component: resolve =>
        require(["../components/pages/iphoneCardProduct/iphoneCard"], resolve),
      meta: { title: "" }
    },
    {
      path: "/product",
      name: "product",
      component: resolve =>
        require(["../components/pages/iphoneCardProduct/product"], resolve),
      meta: { title: "热销商品智慧家庭" }
    },

    {
      path: "/orderSuccess",
      name: "orderSuccess",
      component: resolve =>
        require(["../components/common/orderSuccess"], resolve),
      meta: { title: "订单" }
    },
    {
      path: "/intentionbroadPage",
      name: "intentionbroadPage",
      component: resolve => require(["../components/pages/propaganda/intentionbroadPage"], resolve),
      meta: { title: "宽带提速意向单" }
    },
    {
      path: "/speedUpPage",
      name: "speedUpPage",
      component: resolve =>
        require(["../components/pages/propaganda/speedUpPage"], resolve),
      meta: { title: "宽带提速" }
    },
    {
      path: "/broadPage",
      name: "broadPage",
      component: resolve =>
        require(["../components/pages/propaganda/broadPage"], resolve),
      meta: { title: "宽带加装" }
    },
    {
      path: "/woHomeNet",
      name: "woHomeNet",
      component: resolve =>
        require(["../components/pages/woHomeNet/woHomeNet"], resolve),
      meta: { title: "沃家组网-新" }
    },

    {
      path: "/broadPublic",
      name: "broadPublic",
      component: resolve =>
        require(["../components/pages/broadbandAdd/broadPublic"], resolve),
      meta: {title: "移固网终端"}
    },
    {
      path: "/flowPacket",
      name: "flowPacket",
      component: resolve =>
        require(["../components/pages/flowPacket/flowPacket"], resolve),
      meta: {title: "流量包订购"}
    },
    {
      path: "/flowDetail",
      name: "flowDetail",
      component: resolve =>
        require(["../components/pages/flowPacket/flowDetail"], resolve),
      meta: {title: "流量包订购"}
    },
    {
      path: "/EpWechatFlow",
      name: "EpWechatFlow",
      component: resolve =>
        require(["../components/pages/flowPacket/EpWechatFlow"], resolve),
      meta: {title: "流量包订购"}
    },
    {
      path: "/webchat",
      name: "webchat",
      component: resolve =>
        require(["../components/pages/webchat/webchat"], resolve),
      meta: { title: "webchat" }
    },
    {
      path: "/broadFocusing",
      name: "broadFocusing",
      component: resolve =>
        require(["../components/pages/broadFocusing/broadFocusing"], resolve),
      meta: { title: "broadFocusing" }
    },
    {
      path: "/newYygg",
      name: "newYygg",
      component: resolve =>
        require(["../components/pages/newYygg/newYygg"], resolve),
      meta: { title: "新移移巩固" }
    },
    {
      path: "/faq",
      name: "faq",
      component: resolve =>
        require(["../components/pages/faq/faq"], resolve),
      meta: { title: "FAQ" }
    },
    {
      path: "/faqDetail",
      name: "faqDetail",
      component: resolve =>
        require(["../components/pages/faq/faqDetail"], resolve),
      meta: { title: "FAQ详情" }
    },
    {
      path: "/divineEye",
      name: "divineEye",
      component: resolve =>
        require(["../components/pages/divineEye/divineEye"], resolve),
      meta: { title: "沃家神眼" }
    },


    {
      path: "/otherBetween",
      name: "otherBetween",
      component: resolve =>
        require(["../components/pages/otherBetween/otherBetween"], resolve),
      meta: { title: "otherBetween" }
    },
    {
      path: "/between",
      name: "between",
      component: resolve =>
        require(["../components/common/between"], resolve),
      meta: { title: "" }
    },
    {
      path: "/404",
      name: "404",
      component: resolve => require(["../components/common/404"], resolve),
      meta: { title: "404" }
    },
    {
      path: "/401",
      name: "401",
      component: resolve => require(["../components/common/401"], resolve),
      meta: { title: "登录失效" }
    },
    {
      path: "/500",
      name: "500",
      component: resolve => require(["../components/common/500"], resolve),
      meta: { title: "500" }
    },
    {
      path: "/demo",
      name: "demo",
      component: resolve => require(["../components/pages/propaganda/demo"], resolve),
      meta: { title: "接口测试" }
    },

  ]
});
