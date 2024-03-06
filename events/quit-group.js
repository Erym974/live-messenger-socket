const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.post(`/members/${payload.id}`, { action: "leave" }, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response.status) {

            const roomName = `group#${payload.id}`
            const group = response.datas

            socket.leave(roomName)
            socket.emit('leaved', group)

            io.to(roomName).emit(`group-updated#${payload.id}`, group)

        }

    }
}