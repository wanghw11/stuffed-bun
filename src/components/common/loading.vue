<template>
    <div>
        <van-overlay :show="showZzc" @click="showZzc = false">
            <div class="wrapper" @click.stop>
                <!-- <div class="block" /> -->
                <van-loading size="40px" color="#1989fa" vertical>加载中...</van-loading>
            </div>
        </van-overlay>
    </div>
</template>
<script>
export default {
    name:'loading',
    props:['showZzc'],
}
</script>
<style lang="scss" scoped>
.wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}
</style>