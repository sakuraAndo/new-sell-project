import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/index.vue';
import ratings from '../components/ratings/index.vue';
import seller from '../components/seller/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/goods',
  },
  {
    path: '/goods',
    name: 'goods',
    component: goods,
  },
  {
    path: '/ratings',
    name: 'ratings',
    component: ratings,
  },
  {
    path: '/seller',
    name: 'seller',
    component: seller,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
