const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.post('/groups', payload.group, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(!response.status) return socket.emit('create-group-result', 'failed')
        socket.emit('create-group-result', 'created') 

        let group = response.datas;
        const members = group.members

        members.forEach(member => {
            io.to(`user#${member.id}`).emit('new-group', group)
        });

    }
}