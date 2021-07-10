import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import store from './store'

const routes = [
    { 
        path: '/', 
        component: Home,
        name: "Home"
    },
    { 
        path: '/login', 
        component: Login ,
        name: "Login",
    },
    { 
        path: '/dashboard', 
        component: Dashboard,
        name: "Dashboard",
        meta: { loggedIn:true }
    },
  ]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.loggedIn){
        if(!store.getters.getLoggedIn){
            next({
                name: 'Login'
            })
        }else{
            next()
        }
    }else{
        next()
    }
})

export default router