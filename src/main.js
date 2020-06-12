import Vue from "vue";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import router from "./router";
import store from "./store";

//使用组件库element
Vue.use(ElementUI);

//权限拦截
import './pemmision';

//开发环境标识
Vue.config.productionTip = process.env.NODE_ENV === 'production';

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
