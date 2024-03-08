module.exports = {
    exec: async (io, socket, utils, payload) => {
        
        socket.leave(`is-online#${payload}`)

    }
}