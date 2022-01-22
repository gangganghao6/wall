// import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import axios from "axios";
import VueAxios from "vue-axios";
// import TDesign from 'tdesign-vue-next';
// import 'tdesign-vue-next/es/style/index.css';

// console.log(TDesign)
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = "/api";
// axios.defaults.withCredentials = true;
// createApp(App).use(store).use(router).use(VueAxios, axios).use(TDesign).mount('#app')
Vue.createApp(App).use(store).use(router).use(VueAxios, axios).use(TDesign.default).mount('#app')
