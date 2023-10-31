import Index from "../pages/Home.vue";
import Self from "../pages/Self.vue";
import Settings from "../pages/Settings.vue";

const routes = [
    {path: '/', name: "home", component: Index},
    {path: '/self', name: "self", component: Self},
    {path: '/settings',name:'settings', component: Settings}
]
export default routes;