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
        meta: {
            requiresAuth: true,
        },
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
        path: "/events/:eventId",
        name: "Event Details",
        component: () => import("../views/EventDetails.vue"),
        props: ({ params }) => ({ eventId: Number.parseInt(params.eventId, 10) || 0 }),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/events/:eventId",
        name: "Event Details Register",
        component: () => import("../views/EventDetailsRegister.vue"),
        props: ({ params }) => ({ eventId: Number.parseInt(params.eventId, 10) || 0 }),
    },
    {
        path: "/events",
        name: "Events List",
        component: () => import("../views/EventsList.vue"),
        props: (route) => ({ search: route.query.search || null }),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/profile",
        name: "User Profile",
        component: () => import("../views/Profile.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/groups",
        name: "Groups",
        component: () => import("../views/Groups.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/groups/createGroup",
        name: "Create Group",
        component: () => import("../views/CreateGroup.vue"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/groups/:groupId",
        name: "Group Details",
        component: () => import("../views/GroupDetails.vue"),
        props: ({ params }) => ({ groupId: Number.parseInt(params.groupId, 10) || 0 }),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/groups/:groupId/createEvent",
        name: "Create Event",
        component: () => import("../views/CreateEvent.vue"),
        props: ({ params }) => ({ groupId: Number.parseInt(params.groupId, 10) || 0 }),
        meta: {
            requiresAuth: true,
        },
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
