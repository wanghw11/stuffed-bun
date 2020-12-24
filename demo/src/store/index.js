import Vue from 'vue'
import Vuex from 'vuex'
import Api from '../api/api'
//挂载Vuex
Vue.use(Vuex)

//创建VueX对象

    const state = {
        //存放的键值对就是所要管理的状态
        classId: '', 
        token: '',
        staffId: '',
        tokenJson: {},
        menuId: '',
        address:{},
        routerId:'',
        orderData:'',
        routerName:'',
        routerUrl:'',
        asyncMethods:[],
        startTime:new Date().getTime()
    }
    // getters
    const getters={
        subMitParam(){
            let param={};
            param.put('routerName',state.routerName);
            param.put('routerUrl',state.routerUrl);
            param.put('asyncMethods',state.asyncMethods);
            return param;
        }
    }
    const actions = {
        //通知后台
        notifyBackend (store,newRouter) {
            let param = getters.subMitParam
            //获取登录人信息
            // param.put('checkerNumber',rootState.userData.checkerNumber);
            // param.put('custName',rootState.userData.custName);
            // param.put('psptId',rootState.userData.psptId);
            param.put('time',new Date().getTime()-state.startTime)
            let api = new Api()
            console.log("11111111",param)
            // api.doUserVisitLog(param).then(res => {

            // })
            commit('reset',newRouter);
        }
    }

    const mutations = {
        updataRouter(state, data){
            state.routerId = data
        },
        updataTokenJson(state, data){
            state.tokenJson = data
        },
        updataClassId(state, data){
            state.classId = data
        },
        updataToken(state, data){
            state.token = data
        },
        updataStaffId(state, data){
            state.staffId = data
        },
        updataMenuId(state, data){
            state.menuId = data
        },
        updataAddress(state, data){
            state.address = data
        },
        updataOrderData(state, data){
            state.orderData = data
        },

        addAsyncMethods (state, method={}) {
            state.asyncMethods.push(method);
        },
        reset(state,newRouter){
            state.routerName=newRouter.routerName;
            state.routerUrl=newRouter.routerUrl;
            state.asyncMethods=[];
            state.startTime=new Date().getTime()
        }
    }
    const store = new Vuex.Store({
        state,
        getters,
        actions,
        mutations
    })
export default store