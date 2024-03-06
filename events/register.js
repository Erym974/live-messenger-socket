const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        console.log(payload);

        const token = utils.decodeToken(payload.token)

        if(token) {
            utils.users.set(token.id, socket)
            socket.join(`user#${token.id}`)
            console.log(`User ${token.id} registered`);
        }

    }
}