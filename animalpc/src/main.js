// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import settings from "./settings";

Vue.config.productionTip = false;
Vue.prototype.$settings = settings;

import axios from "axios";
import Qs from "qs"
let requestd = axios.create({
  baseURL:'http://localhost:8080/api'
})
axios.defaults.withCredentials = false;//阻止Ajax附带cookie
Vue.prototype.$axios = axios

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
