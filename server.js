const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin : '*'}
});

let users = [];

io.on('connection', (socket) => {
    console.log('connected')

    socket.on('addUser',(user_id, socket_id) => {
        console.log(user_id, socket_id)
    })

    socket.on('disconnect', (socket) => {
        console.log('disconnected')
    })
})

server.listen(3000, () => {
    console.log('Running Server!!!');
})