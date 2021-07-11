<template>
    <div class="row chat-room">

    </div>
    <div class="row">
        <div class="col-10 p-0">
            <input type='text' v-model="message" v-on:keyup='handleInputKeyUp' class='form-control' />
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
        props: ['currentUser'],
        data(){
            return {
                message:null,
                userData:null,
                socket_id:null
            }
        },
        mounted(){
            this.userData = store.getters.getUserData
            socket.on('connect', () => {
                console.log('from connect', socket.id)
                socket.emit('addUser', socket.id, this.userData.id)
            })
            socket.on("reconnect", () => {
                console.log('reconnect')
            })
            socket.emit('addUser', socket.id, this.userData.id)
            store.commit('setSocketId',socket.id)
            console.log(socket.id)
            // console.log(this.currentUser)
            socket.on('getMessage', (sender_id, text ) => {
                console.log(text, sender_id)
            })
        },
        methods:{
            handleSendMessage(){
                let senderId = this.userData.id
                let message = this.message
                socket.emit('sendMessage',senderId, this.currentUser.id, message)
                this.message = null
                // socket.to(socketId).emit('Hello World!');
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