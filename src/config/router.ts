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
        meta:{title: "树洞"},
        component: () => import('@/pages/TreeHole.vue')
    },
    {
        path: '/profile',
        name: "profile",
        meta:{title: "个人主页"},
        component: () => import('@/pages/Profile.vue')
    },
    {
        path: '/settings',
        name: 'settings',
        meta: {title:"设置"},
        component: () => import('@/pages/Settings.vue')
    },
    {
        path: '/post-detail',
        name: 'postDetail',
        meta: {title: "帖子详情"},
        component: () => import('@/pages/PostDetail.vue')
    },

]
export default routes;