const routes = [
    {path: '/', name: "home", component: () => import('@/pages/Home.vue')},
    {path: '/tree-hole', name: 'tree-hole', component: () => import('@/pages/TreeHole.vue')},
    {path: '/self', name: "self", component: () => import('@/pages/Self.vue')},
    {path: '/settings', name: 'settings', component: () => import('@/pages/Settings.vue')},
]
export default routes;