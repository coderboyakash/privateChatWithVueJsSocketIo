<template>
    <div class="row chat-room">
        <div 
            class='message' 
            :class="chat.me" 
            v-for="chat in chats"
            :key="chat.id"
        >
            {{ chat.message }}
        </div>
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
                socket_id:null,
                chats:
                [
                    {
                        id:1,
                        me:'me',
                        message:'Hello World!!'
                    }
                ]
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
                
            })
        },
        methods:{
            handleSendMessage(){
                let senderId = this.userData.id
                let message = this.message
                socket.emit('sendMessage',senderId, this.currentUser.id, message)
                this.chats.push({
                    id:2,
                    me:'me',
                    message:this.message
                })
                this.message = null
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
        margin:20px;
        display:flex;
        flex-direction: row;
        overflow-y:scroll;
        justify-content: center;
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
    .message{
        color:black;
        height: 50px;
        margin:5px 10px;
        width:80%;
        padding:10px;
        background-color: paleturquoise;
    }
    .me{
        background-color: palegoldenrod !important;
    }
</style>