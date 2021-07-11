<template>
    <div>
        <Navbar :user="user"/>
        <div class="container-fluid p-0 m-0">
            <div class="row">
                <div class="col-4">
                    <div class="users-list">
                        <div @click="setCurrentUser(user.id)" class="user" v-for="user in users" :key="user.id">{{ user.name }}</div>
                    </div>
                </div>
                <div class="col-8">
                    <div class="row">
                        <div class="user-details">
                            <h2>{{ currentUser ? currentUser.name : '' }}</h2>
                            <sapn class="online">Online</sapn>
                        </div>
                    </div>
                    <ChatRoom :currentUser="currentUser" :socket="socket"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Navbar from './Navbar.vue'
    import ChatRoom from './ChatRoom.vue'
    import { mapGetters } from 'vuex'
    import { GET_ALL_USERS, GET_USER_DATA } from './../apis'
    import axios from 'axios'
    import { io } from 'socket.io-client'
    const socket = io.connect("http://localhost:3000");
    export default {
        data(){
            return{
                user: null,
                users: [],
                currentUser: null
            }
        },
        components:{
            Navbar,ChatRoom
        },
        computed:{
            ...mapGetters([
                'getUserData',
            ])
        },
        mounted(){
            this.user = this.$store.getters.getUserData
            this.getAllUsers()
        },
        methods:{
            getAllUsers(){
                let token = this.$store.getters.getToken
                let headers = {
                    'Authorization': 'Bearer '+token
                }
                axios.get(GET_ALL_USERS, {headers:headers})
                .then((response) => {
                    this.users = response.data.result
                })
            },
            setCurrentUser(id){
                let token = this.$store.getters.getToken
                let headers = {
                    'Authorization': 'Bearer ' + token
                }
                let data = {
                    id:id
                }
                axios.post(GET_USER_DATA,data,{headers:headers})
                .then(({data}) => {
                    this.currentUser = data.result
                })
            }
        }
    }
</script>
<style scoped>
    .users-list{
        height:90vh;
        overflow:hidden;
        overflow-y:scroll;
    }
    .user{
        background-color:aqua;
        text-align: center;
        padding-top:0.8rem;
        padding-bottom:0.8rem;
        font-size:1.5rem;
        cursor:pointer;
        transition-duration: 0.6s;
        animation: ease;
        margin-bottom:0.8rem;
    }
    .user:hover{
        background-color: orange;
        font-size:1.8rem;
    }
    .user-details{
        height:100px;
        background-color:rgb(143, 121, 142);
        display:flex;
        justify-content: space-evenly;
        color:powderblue;
    }
    .user-details h2{
        line-height: 3.2;
    }
    .online{
        color:white;
        line-height: 6.2;
    }
</style>