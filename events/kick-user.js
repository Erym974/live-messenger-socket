const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.post(`/api/members/${payload.id}`, { action: "kick", member: payload.user }, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response.status) {

            const roomName = `group#${payload.id}`
            const group = response.datas

            const userSocket = utils.users.get(payload.user)
            if(userSocket) {
                userSocket.leave(roomName)
                userSocket.emit('kicked', group)
            }

            io.to(roomName).emit('group-updated', group)

        }

    }
}