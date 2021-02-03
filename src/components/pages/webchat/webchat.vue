<template>
  <div></div>
</template>

<script>
import Api from '../../../api/apiGuide.js'

export default {
  name: "webchat",
  computed: {
    token() {
      return this.$route.query.token
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      let api = new Api()
      api.getBussinessCard({token:this.token}).then(result => {
        if (result.data.msgFlag == "0") {
          window.location.href=result.data.resultJson.QR_CODE
        } else {
          console.log(result.data.errmsg);
          alert("获取企业微信名片失败")
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
