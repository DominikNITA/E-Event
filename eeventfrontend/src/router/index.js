import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        // meta: {
        //     requiresAuth: true,
        // },
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("../views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("../views/Register.vue"),
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
        // meta: {
        //     requiresAuth: true,
        // },
    },
    {
        path: "/events",
        name: "Events List",
        component: () => import("../views/EventsList.vue"),
        props: (route) => ({ search: route.query.search || null }),
        // meta: {
        //     requiresAuth: true,
        // },
    },
    {
        path: "/profile/:userId",
        name: "User Profile",
        component: () => import("../views/Profile.vue"),
        props: ({ params }) => ({ userId: Number.parseInt(params.userId, 10) || 0 }),
        // meta: {
        //     requiresAuth: true,
        // },
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        console.log(store);
        if (store.state.authToken == null) {
            next({
                name: "Login",
                params: { nextUrl: to.fullPath },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
