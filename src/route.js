import Vue from 'vue';
import Router from 'vue-router';
import Hello from './components/hello';
import Home from './pages/home';
import ScrollPicker from './pages/scroll-picker';
import Popup from './pages/popup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/hello',
      name: 'hello',
      component: Hello
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
    }
  ]
});
