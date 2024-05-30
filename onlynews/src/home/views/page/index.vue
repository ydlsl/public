<!--
 * @Author: yangda
 * @Date: 2024-05-31 03:22:17
 * @LastEditTime: 2024-05-31 03:28:52
 * @Descripttion: 
-->
<template>
  <div @click="sendMessage">
    {{ title }}
  </div>
</template>

<script>
export default  {
  data() {
    return {
      title: 'welcome to web '
    }
  },
  mounted(){
    window.addEventListener('message', this.messageHandler)
  },
  methods: {
    messageHandler(e){
      this.title = e.data
    },
    sendMessage(){
      window.parent.postMessage("data from web", '*')
    }
  }
}
</script>

<style lang='scss' scoped>

</style>