import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import { fetchUser } from '@/api';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    redirect: {
      path: '/diaries',
      replace: true,
    },
    children: [
      {
        path: 'diaries',
        name: 'DiaryList',
        component: () => import('../views/diary/DiaryList.vue'),
      },
      {
        path: 'meals',
        name: 'MealList',
        component: () => import('../views/meal/MealList.vue'),
      },
      {
        path: 'account',
        name: 'MyInfo',
        component: () => import('../views/account/MyInfo.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../views/SignUp.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/sign-up') {
    next();
    return;
  }

  if (store.getters['user/token']) {
    next();
    return;
  }

  const token: string | null = window.localStorage.getItem('token');
  if (!token) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
    return;
  }

  store.commit('user/setToken', token);
  fetchUser(token).then((res) => {
    const { data } = res.data;
    store.commit('user/setUser', data);
  }).catch((err: any) => {
    console.log(err);
  }).finally(() => {
    next();
  });
});

export default router;
