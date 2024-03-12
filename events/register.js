const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const authenticated = await utils.authenticateToken(payload.token)

        if(!authenticated) return socket.emit('token-error') 

        const token = utils.decodeToken(payload.token)

        if(token) {
            utils.users.set(token.id, socket)
            utils.onlines.set(token.id, true)
            socket.join(`user#${token.id}`)

            
            console.log(`User ${token.id} registered`);
            io.to(`is-online#${token.id}`).emit('is-online', { status: true, id: token.id })
        }

    }
}