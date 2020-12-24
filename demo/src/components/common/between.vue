<template>
    <div class="between">
        <Loading :showZzc="showZzc"/>
    </div>
</template>
<script>
import Api from '../../api/apiHome'
import Loading from './loading'
import Utils from '../../utils/utils'
let api = new Api()
export default {
    components:{
        Loading
    },
    computed:{
        classId(){
            if(sessionStorage.getItem('classId')){
                return sessionStorage.getItem('classId')
            }else{
                return ''
            }
        },
        menuId(){
            if(sessionStorage.getItem('menuId')){
                return sessionStorage.getItem('menuId')
            }else{
                return ''
            }
        },
        staffId(){
            if(sessionStorage.getItem('staffId')){
                return sessionStorage.getItem('staffId')
            }else{
                return ''
            }
        },
        routerId(){
            if(sessionStorage.getItem('routerId')){
                return sessionStorage.getItem('routerId')
            }else{
                return ''
            }
        }
    },
    data(){
        return {
            showZzc:false,
            token:''
        }
    },
    mounted (){
        this.init()
    },
    methods:{
        init(){
            this.showZzc = true
            let date = moment(new Date()).format("YYYY-MM-DD")
            api.qrcodeUpdataToken(this.classId, this.staffId, date).then(res => {
                console.log("22222222222",res)
                this.showZzc = false
                this.token = res.data.resultJson[0].tokenId
                sessionStorage.setItem('tokenId',this.token)
                // console.log("2222222222",this.routerId)
                // this.$router.push('/'+this.routerId)
                window.location.href = 'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/functionVue/index.html?sourceId='+this.classId+'&routerId='+ this.routerId +'&menuId='+this.menuId+'&token='+ this.token
            })
        }
    }
}
</script>
<style lang="scss" scoped>
    .between{

    }
</style>