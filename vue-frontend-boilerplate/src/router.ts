import DroneInfo from "@/components/DroneInfo.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        name: "drone-info",
        path: "/",
        component: DroneInfo,
    },
    {
        name: "hello-world",
        path: "/hello",
        component: HelloWorld,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition ? savedPosition : { x: 0, y: 0 }
    }
});

export default router;
