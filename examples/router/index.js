import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: 'cretate',
    },
    {
      path: '/cretate',
      name: 'cretate',
      component: () => import('../views/index.vue'),
    },
    {
      path: '/flowInfo',
      name: 'basic',
      component: () => import('../views/basic.vue'),
    },
    {
      path: '/flowDesign',
      name: 'flow',
      component: () => import('../views/flow.vue'),
    },
    {
      path: '/flowSetting',
      name: 'setting',
      component: () => import('../views/setting.vue'),
    },
  ],
});
