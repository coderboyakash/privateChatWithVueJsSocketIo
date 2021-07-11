<template>
    <div class="row chat-room">

    </div>
    <div class="row">
        <div class="col-10 p-0">
            <input type='text' v-on:keyup='handleInputKeyUp' class='form-control' />
        </div>
        <div class="col-2 p-0">
            <input type="submit" @click='handleSendMessage' value="Submit" class="btn btn-dark submit-btn" />
        </div>
    </div>
</template>

<script>
    import store from './../store'
    import {io} from 'socket.io-client'
    const socket = io.connect("http://localhost:3000");
    export default {
        props: ['user'],
        data(){
            return {
                message:null,
                userData:null,
                socket_id:null
            }
        },
        mounted(){
            this.userData = store.getters.getUserData
            socket.emit('addUser', socket.id, this.userData.id)
            store.commit('setSocketId',socket.id)
        },
        methods:{
            handleSendMessage(){
                
            },
            handleInputKeyUp(e){
                if(e.keyCode == 13){
                    this.handleSendMessage()
                }
            }
        }
    }
</script>
<style scoped>
    .chat-room{
        height:500px;
        background-color: powderblue;
    }
    .submit-btn{
        width:90%;
    }
    .form-control{
        padding: 1rem .75rem;
    }
    .btn{
        padding: 1rem .75rem;
    }
</style>