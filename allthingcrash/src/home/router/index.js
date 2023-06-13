/*
 * @Author: yangda
 * @Date: 2022-11-16 22:11:47
 * @LastEditTime: 2022-12-21 11:24:20
 * @Descripttion: 
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import { chohoUtil } from '@chohotech/choho-fn'

// 参数只能是常量
const files = require.context('../views/page', false, /\.vue$/);
const routes = chohoUtil.getRouteFromFile(files, 'index')

// routes.push({
//   path: '/pdf',
//   name: 'pdf',
//   component: () => import('@lymonitor/views/component/explain_node/pdf_node'),
//   title: 'pdf测试，记得删除',
// })
console.log('router = ', routes)

const router =  createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router