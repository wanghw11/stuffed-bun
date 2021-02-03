<template>
    <div class="broadFocusing">

    </div>
</template>
<script>
export default {
    name:'broadFocusing',
    computed: {
        staffId() {
            if (sessionStorage.getItem('staffId')) {
                return sessionStorage.getItem('staffId')
            } else {
                return ''
            }
        },
        addressCity() {
            if (sessionStorage.getItem('address')) {
                let add = JSON.parse(sessionStorage.getItem('address'))
                return add.areaname
            } else {
                return '请选择城市'
            }
        },
    },
    data(){
        return {
            url:'https://wxxapp.chinaunicom.cn/newwofortg/mobile/app/paybroad/paybroad.html?ms='
        }
    },
    mounted(){
        if(this.staffId){
            window.location.href = this.url + this.staffId
        }
    }
}
</script>
<style lang="scss" scoped>
    .broadFocusing{

    }
</style>