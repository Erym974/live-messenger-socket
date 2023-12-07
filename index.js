const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const axios = require('./axios');
const fs = require('fs');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

server.listen(3001, () => {
    console.log('listening on *:3001');
})

const events = fs.readdirSync(__dirname + '/events').map((file) => file.replace('.js', ''));

const utils = {
    users: new Map(),
    checkUserGroup: async function(socket, group) {
        const user = this.getUserBySocket(socket.id);
        if(!user) return false
        const response = await axios.get(`api/groups/${group}`, {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        })
        return response.status
    },
    isAuthenticated : async function(socket) {
        const user = this.getUserBySocket(socket.id);
        if(!user) return false
        return true
    },
    getUserBySocket: function(socket) {
        for (const [key, value] of this.users.entries()) {
            if(value.socket === socket) {
                return value;
            }
        }
    },
    getUserById: function(id) {
        return this.users.get(id)
    }
}

io.on('connection', socket => {

    console.log("New connection");

    events.forEach(eventName => {
        let event = require(__dirname + `/Events/${eventName}.js`);
        socket.on(eventName, (payload) => {
            event.exec(io, socket, utils, payload)
        })
    })

})