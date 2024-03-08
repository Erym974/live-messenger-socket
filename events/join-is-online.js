module.exports = {
    exec: async (io, socket, utils, payload) => {
        
        socket.join(`is-online#${payload}`)

        socket.emit('is-online', { status: utils.onlines.has(payload), id: payload })

    }
}