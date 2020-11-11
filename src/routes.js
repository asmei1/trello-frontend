import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserLogin from './views/UserLogin.vue'
import UserHome from './views/UserHome.vue'
import UserBoard from './views/UserBoard.vue'
import store from './store/index'

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
            path: '/userBoard/:titleBoard',
            component: UserBoard
        }
    ],

})
router.beforeEach((to, from, next) => {
    if (store.getters.isUserLogIn) {
        if(to.name === "UserLogin") next('/userHome');
        else next();
    }
    else{
        if(to.name === "UserLogin" || to.name === "Home") next();
        else next("/");
    }
});

export default router;