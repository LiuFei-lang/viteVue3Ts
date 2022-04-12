import { createWebHistory, createRouter, createWebHashHistory } from 'vue-router'

// import Home from '../view/home/home';
/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
    {
        path: '/',
        name: 'Login',
        component: () => import('../view/Login/login'),
        meta: { requiresAuth: true }
    },
    {
        path: '/index',
        component: () => import('../view/index/index'),
        name: 'index',
        meta: { title: '首页', icon: 'dashboard', affix: true, requiresAuth: false }
    },
    {
        path:'/home',
        component:()=>import('../view/Home/home'),
        name:'home',
        meta:{ title: 'home', icon: 'dashboard', affix: true, requiresAuth: false }
    },
    {
        path:'/searchList',
        component:()=>import('../view/SearchList/SearchList'),
        name:'searchList',
        meta:{ title: 'searchList', icon: 'dashboard', affix: true, requiresAuth: false }
    } 
    

];

const router = createRouter({
    //这里打包的话要换成hash
    history: createWebHashHistory(),
    // history:createWebHistory("/"),
    routes: constantRoutes,
    
    scrollBehavior(to: any, from: any, savedPosition: any) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    },
});
// //vue-router全局前置守卫
// router.beforeEach((to: any, from: any, next: any) => {
//     console.log("全局前置守卫 当前页面路由信息:", to)
//     console.log("全局前置守卫 上一页路由信息:", from)
//     //进入路由页面
//     next()
// })
// //全局解析守卫
// router.beforeResolve((to: any, from: any, next: any) => {
//     console.log("全局解析守卫,当前页面路由信息:", to)
//     console.log("全局解析守卫,上一页路由信息:", from)
//     //进入路由页面
//     next()
// })
// //全局后置守卫
// router.afterEach((to, from, failure) => {
//     console.log("全局后置守卫,当前页面路由信息:", to)
//     console.log("全局后置守卫,上一页路由信息:", from)
// })

export default router;