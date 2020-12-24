<template>
    <div>
        <div class="userMsg">
            <div style="line-height: 40px;font-weight:600;position: relative;">
                <span>商品信息</span>
                <div @click="xuanz = !xuanz;isMessage = !isMessage" :class="xuanz?'xuanzShun':''" style="position: absolute;top:25%;right:0;border-color: #000 #fff #fff #fff;border-style: solid;border-width: 8px 8px 0 8px;height: 0;width: 0;"></div>
            </div>
            <div v-if="isMessage">
                <div class="content cor"  v-for="(item, index) in msgData" :class="{active : active == item.commId}" :key="index" @click="onItem(item)">
                    <div class="content-item">
                        <span class="item-name">商品名称：</span>
                        <span class="item-content">
                            {{item.commName? item.commName:'无'}}
                        </span>
                    </div>
                    <div class="content-item">
                        <span class="item-name">商品信息：</span>
                        <span class="item-content">
                        {{item.detail? item.detail:'无'}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    computed:{
        title(){
            return this.$route.params.title
        }
    },
    props:['msgData'],
    data(){
        return {
            xuanz:false,
            isMessage:false,
            active:''
        }
    },
    methods:{
        onItem(item){
            this.active = item.commId
            this.$emit('onActive',item)
        }
    }
}
</script>
<style lang="scss" scoped>
    .userMsg{
        background-color: #fff;
        padding: 10px;
        box-sizing: border-box;
        margin: 10px;
        border-radius: 5px;
        .xuanzShun{
            transform: rotate(180deg);
        }
        .cor{
            background-color: #f7f8fa;
        }
        .active{
            background-color: #ccc !important;
        }
        .content{
            padding: 10px;
            box-sizing: border-box;
            .content-item{
                display: flex;
                // align-items: center;
                margin-bottom: 5px;
                // font-size: 12px;
                .item-name{
                    flex:3;
                }
                .item-content{
                    flex:8;
                    .van-cell{
                        padding: 0;
                        background-color: #fff;
                    }
                }
            }
        }
    }
</style>