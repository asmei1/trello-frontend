import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserLogin from './views/UserLogin.vue'
import UserHome from './views/UserHome.vue'
import UserBoard from './views/UserBoard.vue'
import UserRegistration from "@/views/UserRegistration";
import UserActivation from "@/views/UserActivation";
import store from './store/index'
import UserResetPassword from "@/views/UserResetPassword";

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            name: 'UserLogin',
            path: '/login',
            component: UserLogin,
        },
        {
            name: 'UserRegistration',
            path: '/registration',
            component: UserRegistration,
        },
        {
            name: 'Home',
            path: '/',
            component: Home
        },
        {
            name: 'UserHome',
            path: '/userHome',
            component: UserHome
        },
        {
            name: 'UserBoard',
            path: '/userBoard/:boardID/:boardTitle',
            component: UserBoard
        },
        {
            name: 'UserActivation',
            path: '/finalize/:token',
            component: UserActivation
        },
        {
            name: 'UserResetPassword',
            path: '/reset_password',
            component: UserResetPassword,
            props:{
                reset_token: ""
            }
        }
    ],

})
router.beforeEach((to, from, next) => {
    if (store.getters.isUserLogIn) {
        if(to.name === "UserLogin" || to.name === "UserActivation" || to.name === "UserResetPassword" || to.name === "UserRegistration" || to.name === "Home") next('/userHome');
        else next();
    }
    else{
        if(to.name === "UserLogin" || to.name === "UserActivation" || to.name === "UserResetPassword" || to.name === "UserRegistration" || to.name === "Home") next();
        else next("/");
    }
});

export default router;