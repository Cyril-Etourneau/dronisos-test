import DroneInfo from "@/components/DroneInfo.vue";
import HelloWorld from "@/components/HelloWorld.vue";
import Vue from "vue";
import VueRouter, {RouteConfig, Route} from "vue-router";
import { Position } from "vue-router/types/router";

Vue.use(VueRouter);

/**
 * Application route definitions.
 */
const routes: RouteConfig[] = [
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

/**
 * Scroll behavior:
 * - restore saved position on back/forward
 * - otherwise scroll to top-left
 */
function scrollBehavior(
  to: Route,
  from: Route,
  savedPosition: void | Position
): Position {
  return savedPosition ?? { x: 0, y: 0 };
}

/**
 * Vue Router configuration.
 */
const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
    scrollBehavior,
});

export default router;
