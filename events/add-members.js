const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.post(`/members/${payload.id}`, { action: "add", members: payload.members }, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response) {

            const roomName = `group#${payload.id}`
            const group = response.datas

            payload.members.forEach(member => {
                io.to(`user#${member}`).emit('new-group')
            })

            io.to(roomName).emit(`group-updated#${payload.id}`, group)
        }

    }
}