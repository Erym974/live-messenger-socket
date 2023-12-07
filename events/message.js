const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {
        const message = payload;
        utils.isAuthenticated(socket)
        const inGroup = utils.checkUserGroup(socket, message.group)
        const user = utils.getUserBySocket(socket.id);
        if(inGroup) {
            const response = await axios.post('/api/messages', message, { headers: { Authorization: `Bearer ${user.token}` } })
            if(response.status) {
                io.to(message.group).emit("message", response.datas);
            }
        }
    }
}