const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io')
const cors = require('cors');
const axios = require('./axios');
const fs = require('fs');

app.use(cors());

app.get('/', (req, res) => {
    res.json({ status: true, datas: { "SOCKET": "Connected" } })
});

const server = http.createServer(app);



const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:3000',
            'http://swiftchat.local:3000',
            'http://swiftchat.fr',
            'https://swiftchat.fr',
            'http://www.swiftchat.fr',
            'https://www.swiftchat.fr',
        ],
        methods: ['GET', 'POST']
    }
});

server.listen(3001, () => {
    console.clear();
    console.log('listening on *:3001');
})

const events = fs.readdirSync(__dirname + '/events').map((file) => file.replace('.js', ''));

const utils = {
    users: new Map(),
    onlines: new Map(),
    checkUserGroup: async function(token, group) {
        const response = await axios.get(`/groups/${group}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response?.status ?? false
    },
    decodeToken: (jwt) => {
        if(!jwt) return ""
        const base64Url = jwt.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    },
    findUserBySocket: (socket) => {
        for (let [id, s] of utils.users) {
            if(s.id === socket) return utils.users.get(id);
        }
        return null;
    },
    findUserIdBySocket: (socket) => {
        for (let [id, s] of utils.users) {
            if(s.id === socket) return id;
        }
        return null;
    },
    findSocketById: (id) => {
        return utils.users.get(id);
    }
}

io.on('connection', socket => {

    console.log("New connection");

    events.forEach(eventName => {
        let event = require(__dirname + `/events/${eventName}.js`);
        socket.on(eventName, (payload) => {
            event.exec(io, socket, utils, payload)
        })
    })

})