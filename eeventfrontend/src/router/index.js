import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    },
    {
        path: "/events/:eventId",
        name: "Event Details",
        component: () => import("../views/EventDetails.vue"),
        props: ({ params }) => ({ eventId: Number.parseInt(params.eventId, 10) || 0 }),
    },
    {
        path: "/events",
        name: "Events List",
        component: () => import("../views/EventsList.vue"),
        props: (route) => ({ search: route.query.search || null }),
    },
    {
        path: "/profile/:userId",
        name: "User Profile",
        component: () => import("../views/Profile.vue"),
        props: ({ params }) => ({ userId: Number.parseInt(params.userId, 10) || 0 }),
    },
];

const router = new VueRouter({
    routes,
});

export default router;
