const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.post('/api/messages', {group: payload.group, ...payload.message}, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response.status) {
            io.to(`group#${payload?.group}`).emit("new-message", response.datas);
            io.to(`conversation#${payload?.group}`).emit("conversation-to-top", { group: payload.group, message: response.datas });
        }
    }
}