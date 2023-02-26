import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const routes = [
  {
    path: '/',
    redirect :'/',
    name: 'index',
  },
  {
    path: '/qrcodeReader',
    redirect :'src/page/qrcodeReader',
    name: '扫码',
  }
];

export default new Router({
  mode: 'history',
  // 去掉url中的#
  scrollBehavior: () => ({
    y: 0
  }),
  routes,
});
