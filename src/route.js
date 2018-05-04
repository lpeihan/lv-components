import Vue from 'vue';
import Router from 'vue-router';
import Home from './pages/home';
import ScrollPicker from './pages/scroll-picker';
import Popup from './pages/popup';
import AddressPicker from './pages/address-picker';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/scroll-picker',
      name: 'scrollPicker',
      component: ScrollPicker
    },
    {
      path: '/popup',
      name: 'popup',
      component: Popup
    },
    {
      path: '/address-picker',
      name: 'addressPicker',
      component: AddressPicker
    }
  ]
});
