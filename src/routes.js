
import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserLogin from './views/UserLogin.vue'



Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
    {   name: 'UserLogin',
        path: '/login',
        component: UserLogin
    },
    {   name: 'Home',
        path: '/',
        component: Home
    }
]
})