const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin : '*'}
});

let users = [];

const addUser = (socket_id, user_id) => {
    if(socket_id != null){
        users.some(user => user.user_id === user_id) ? 
            ( 
                index = users.findIndex((obj => obj.user_id == user_id)),
                console.log('index - ', index),
                users[index].socket_id = socket_id
            )
            : 
            users.push({user_id, socket_id})
    }
}

const getUser = (user_id) => {
    index = users.findIndex((obj => obj.user_id == user_id))
    console.log('index - ', index)
    if(index >= 0){
        return {
            return:true,
            socket_id:users[index].socket_id
        };
    }else{
        return {
            return:false,
        };
    }
}
const removeUser = (socket_id) => {
    index = users.findIndex((obj => obj.socket_id == socket_id))
    delete users[index];
}

io.on('connection', (socket) => {
    console.log('connected')
    console.log(users)

    socket.on('addUser',(socket_id, user_id) => {
        addUser(socket_id, user_id)
        console.log(users)
    })

    socket.on('sendMessage', (sender_id, receiver_id, text) => {
        const receiver = getUser(receiver_id)
        if(receiver.return){
            io.to(receiver.socket_id).emit('getMessage', {
                sender_id,
                text
            })
        }else{
            console.log('user offline');
        }
    })

    socket.on('disconnect', (socket) => {
        console.log('disconnected')
        console.log(socket.id)
        removeUser(socket.id)
        console.log(users)

    })
})

server.listen(3000, () => {
    console.log('Running Server!!!');

})