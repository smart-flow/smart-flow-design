import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'design',
    },
    {
      path: '/design',
      name: 'design',
      component: () => import('../views/design.vue'),
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('../views/setting.vue'),
    },
  ],
});
