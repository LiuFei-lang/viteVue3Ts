
import { createApp } from 'vue'
import App from './App'
//路由
import router from './router'
//全局管理器vuex
import store from './vuex/index'
//这是Ant Design 框架
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css"
//这是em转px工具
import 'amfe-flexible/index.js'
//这是插件
// import Plugins from "./plugins"
import eventBus from "vue3-eventbus"


const app = createApp(App);
console.log("app=",app)
app.use(Antd)
app.use(router)
app.use(store)
// app.use(Plugins)
app.use(eventBus)
app.mount('#app')
