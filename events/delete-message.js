const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.patch('/message', {id: payload.id, status: payload.status}, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(response.status) {
            const message = response?.datas
            const group = message?.conversation?.id
            io.to(`group#${group}`).emit(`message-updated#${group}`, message);
        }

    }
}