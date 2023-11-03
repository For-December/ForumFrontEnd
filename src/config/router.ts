const routes = [
    {path: '/', name: "home", component: () => import('@/pages/Home.vue')},
    {path: '/self', name: "self", component: () => import('@/pages/Self.vue')},
    {path: '/settings', name: 'settings', component: () => import('@/pages/Settings.vue')},
]
export default routes;