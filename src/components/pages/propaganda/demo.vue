<template>
    <div class="demo">
        <button class="btn" @click="on">333333333333</button>
    </div>
</template>
<script>
import Api from '../../../api/Apipropaganda'
const api = new Api()
import utils from '../../../utils/utils'
export default {
    data(){
        return {

        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            api.demoTestEncryp().then(res => {
                let str = res.data
                let data = utils.docrypt(str)   // AES  解密
                console.log("2222222222222",JSON.parse(data))
            })
        },
        on(){
            this.init()
        }
    }
}
</script>
<style lang="scss" scoped>
.demo{

}
</style>