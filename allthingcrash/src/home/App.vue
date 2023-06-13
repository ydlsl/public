<template>
  <router-view />
</template>

<script>
// import { eventTraceCall } from '../request/eventrack/test'
export default {
  setup() {
    // window.eventTraceReq = eventTraceCall
    // window.onunload = () => {
    //   window.eventTraceReq({domainName: "quit"})
    // }
      // setTimeout(() => {
      //   )
      // }, 500); }
  }
}
</script>

<style>
#app {
  /* 抗锯齿 */
  -webkit-font-smoothing: antialiased; 
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: var(--ly-color-text);
  height: 100%;
}
</style>
