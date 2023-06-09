import { createRouter, createWebHashHistory } from 'vue-router';
// 预处理，no use

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/page/index.vue'),
    title: '侧位片管理',
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
