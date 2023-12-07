const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const response = await axios.get('api/users/me', {
            headers: {
                Authorization: `Bearer ${payload.token}`
            }
        })
        socket.emit('authenticateUser', { status: response.status })
        if(!response.status) return;
        utils.users.set(response.datas.user.id, { ...response.datas.user, socket: socket.id, token: payload.token })

    }
}