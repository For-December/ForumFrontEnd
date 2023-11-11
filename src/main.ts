import {createApp} from 'vue'
import App from './App.vue'
import {Button, NavBar, Popup} from "vant";

import 'element-plus/dist/index.css'
import router from "./config/router";




createApp(App)
    .use(Button)
    .use(NavBar)
    .use(Popup)
    .use(router)
    .mount('#app')
