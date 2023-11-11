import {createRouter, createWebHistory} from "vue-router";
import {authed} from "@/plugins/globalData.ts";
import {authAndLogin} from "@/plugins/globalFunc.ts";

const routes = [
    {
        path: '/home',
        name: "home",
        meta: {title: "闲聊广场"},
        component: () => import('@/pages/Home.vue')
    },
    {
        path: '/tree-hole',
        name: 'tree-hole',
        meta: {title: "树洞"},
        component: () => import('@/pages/TreeHole.vue')
    },
    {
        path: '/profile',
        name: "profile",
        meta: {title: "个人主页"},
        component: () => import('@/pages/Profile.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        meta: {title: "设置"},
        component: () => import('@/pages/Settings.vue')
    },
    {
        path: '/post-detail',
        name: 'postDetail',
        meta: {title: "帖子详情"},
        component: () => import('@/pages/PostDetail.vue')
    },

]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

router.beforeEach((to, from, next) => {

    console.log(from.path)
    console.log(to.path)

    if (
        from.path === '/' // 访问根目录
        && to.name !== 'home'
    ) {
        // 将用户重定向到登录页面
        next({name: 'home'})
        return
    }

    // 检查用户是否已登录
    if (
        !authed.value &&
        // ❗️ 避免无限重定向
        to.name !== 'home'
    ) {
        authAndLogin().then((isLogin) => {
            if (isLogin) {
                console.log('已登录')
                // 不重定向
                next()
                return
            }
            console.log(isLogin)
            console.log("未登录~")
            // 将用户重定向到登录页面
            next({name: 'home'})
        });


    } else {

        document.title = `${to.meta.title} | 测试`;
        next();
    }
});

export default router;