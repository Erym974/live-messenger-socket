const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.patch(`/groups/${payload.id}`, payload.group, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response?.status) {
            const group = response.datas
            const roomName = `group#${payload.id}`
            io.to(roomName).emit(`group-updated#${payload.id}`, group)
            io.to(`conversation#${payload?.id}`).emit("update-conversation", { group: response.datas });
        }

    }
}