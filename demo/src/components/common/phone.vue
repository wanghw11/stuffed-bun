<template>
    <div>
        <div class="inpPhone">
            <input type="text" style="width:100%" v-model='phoneValue' placeholder="请输入手机号" >
        </div>
        <div class="queryPhone" v-if="show">请输入正确的手机号</div>
    </div>
</template>
<script>
export default {
    name: 'phone',
    data(){
        return {
            phoneValue: '',
            show: false
        }
    },
    watch:{
        phoneValue(val){
            if(val == '' || !(/^1[3456789]\d{9}$/.test(val)) || val.length != 11){
                this.show = true
            }else{
                this.show = false
                this.$emit('getPhone', val)
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.inpPhone{
    .phone{
        padding: 0 !important;
        width: auto !important;
    }
}
.queryPhone{
    margin-top: 5px;
    color: red;
    font-size: 14px;
}

</style>