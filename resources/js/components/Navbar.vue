<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!loggedIn">
        <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/">Register</router-link>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
        <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Welcome {{user.name}}</router-link>
        </li>
        <li class="nav-item">
            <a href="javascript:void(0);" @click="handleLogout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
  import store from './../store'
  import router from './../router'
  export default {
    data(){
      return{
        loggedIn:false
      }
    },
    props: ['user'],
    mounted(){
      this.loggedIn = store.getters.getLoggedIn
    },
    methods:{
      handleLogout(){
        store.commit('setLoggedIn', false)
        store.commit('setUserData', null)
        store.commit('setToken', null)
        localStorage.removeItem('token')
        router.push('/login')
      }
    }
  }
</script>