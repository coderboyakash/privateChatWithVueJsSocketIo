import { createRouter, createWebHistory } from 'vue-router'
import Home from './Home.vue'
import Login from './components/Login.vue'
import Dashboard from './components/Dashboard.vue'
import store from './store'
import {GET_USER} from './apis'
import axios from 'axios'

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
            next({name: 'Login'})
        }else{
            next()
        }
    }else{
        retriveUserData().then((response) => {
            if((to.name == 'Login') && store.getters.getLoggedIn){
                next({name: 'Dashboard'})
            }else{
                next()
            }
        })
    }
})


async function retriveUserData(){
    const headers = {
        'Authorization':localStorage.getItem('token')
    }
    const response = await axios.get(GET_USER, {headers:headers})
    localStorage.setItem('token', 'Bearer ' + response.data.token)
    store.commit('setToken', response.data.token)
    store.commit('setLoggedIn', response.data.success)
    store.commit('setUserData', response.data.result)
    return response
}


export default router