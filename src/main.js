import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router/index';
import 'ant-design-vue/dist/antd.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import VueCookies from 'vue3-cookies';

library.add(fas, fab);
const app = createApp(App);
app.config.productionTip = false;
app.component('fa', FontAwesomeIcon);
app.use(Antd);
app.use(router);
app.use(VueCookies, {
    expireTimes: '30d',
    // path: '/',
    // domain: '',
    secure: true,
    // sameSite: 'None'
});
app.mount('#app');
