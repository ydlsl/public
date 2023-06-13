/*
 * @Author: yangda
 * @Date: 2022-11-16 22:11:47
 * @LastEditTime: 2022-12-15 19:59:46
 * @Descripttion: 
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css' // use
// element plus 中文环境


const app = createApp(App)

app.use(router)
    .use(store)
    .use(ElementPlus)
    .mount('#app')