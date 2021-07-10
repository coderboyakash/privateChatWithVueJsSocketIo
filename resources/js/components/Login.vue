<template>
    <div class='container-fluid p-0' style="background:green; height:100vh;">
      <Navbar />
      <div class="row">
          <div class="offset-3 col-md-6 mt-5">
              <div class="card">
                  <div class="card-header">Login Box</div>
                  <div class="card-body">
                      <form @submit.prevent>
                          <div class="form-group">
                              <label for="email">Email</label>
                              <input type="email" v-model="email" name="email" id="email" class="form-control">
                          </div>
                          <div class="form-group">
                              <label for="password">Password</label>
                              <input type="password" v-model="password" name="password" id="password" class="form-control">
                          </div>
                          <div class="form-group">
                            <input type="submit" value="Submit" @click="handleLogin" class="form-control btn btn-dark mt-2">
                        </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
    </div>
</template>

<script>
    import Navbar from './Navbar.vue'
    import {LOGIN} from './../apis'    
    import axios from 'axios'
    import router from './../router'
    export default {
        data(){
            return{
                email:'',
                password: ''
            }
        },
        mounted(){
            console.log(LOGIN);
        },
        components:{
            Navbar
        },
        methods:{
            handleLogin(){
                const data = {
                    email:this.email,
                    password:this.password
                }
                axios.post(LOGIN, data)
                .then(({data}) => {
                    localStorage.setItem('token', 'Bearer ' + data.token)
                    this.$store.commit('setLoggedIn', data.success)
                    this.$store.commit('setToken', data.token)
                    router.push({ name : 'Dashboard' })
                })
            }
        }
    }
</script>

<style>

</style>