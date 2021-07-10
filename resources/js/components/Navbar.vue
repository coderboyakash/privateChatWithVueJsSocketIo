<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="loggedIn">
        <li class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/">Register</router-link>
        </li>
      </ul>
      <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
        <li class="nav-item">
            <router-link class="nav-link" to="/dashboard">Welcome {{name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
  import axios from 'axios'
  import { GET_USER } from './../apis'
  import store from './../store'
  import router from './../router'
  export default {
    props: ['name'],
    setup(){
      let token = localStorage.getItem('token')
      let headers = {
        'Authorization' : token,
        'Accept' : 'application/json'
      }
      axios.get(GET_USER, {headers})
      .then(({data}) => {
          localStorage.setItem('token', 'Bearer ' + data.token)
          store.commit('setLoggedIn', data.success)
          store.commit('setToken', 'Bearer ' + data.token)
          store.commit('setUserData', data.result)
          if(store.getters.getLoggedIn){
            router.push({name:'Dashboard'})
          }
      })
    }
  }
</script>