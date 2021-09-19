import Vue from "vue";
import VueRouter from "vue-router";
// import Dashboard from "../views/Dashboard.vue";
import Team from "../views/Team.vue";
// import Tasks from "../views/Tasks.vue";
import Login from "../views/Login.vue";
import Profile from "../views/Profile.vue";
import Signup from "../views/Signup.vue";
import Users from "../views/Users.vue";
import User from "../views/User.vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    // component: Dashboard,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Dashboard.vue"),
    meta: {
      title: "Dashboard",
      requiresAuth: true,
    },
  },
  {
    path: "/tasks",
    name: "tasks",
    // component: Tasks,
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Tasks.vue"),
    meta: {
      title: "Tasks",
      requiresAuth: true,
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/team",
    name: "team",
    component: Team,
    meta: {
      title: "Team",
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
      requiresAuth: false,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: {
      title: "Signup",
      requiresAuth: false,
    },
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      title: "Profile",
      requiresAuth: true,
    },
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    meta: {
      title: "User",
      requiresAuth: true,
    },
  },
  {
    path: "/user/:id",
    name: "user",
    component: User,
    meta: {
      title: "User",
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  console.log("isauthenticated", isAuthenticated);
  if (requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
