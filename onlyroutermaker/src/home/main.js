import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from '@/home/assets/element' // 导入element-plus


const app = createApp(App)

installElementPlus(app)
app.use(router)
    .use(store)
    .mount('#app')