const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.post(`/messages/${payload.group}`, payload.message, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response?.status) {
            io.to(`group#${payload?.group}`).emit(`new-message#${payload.group}`, response.datas);
            io.to(`conversation#${payload?.group}`).emit("conversation-to-top", { group: payload.group, message: response.datas });
        }
    }
}