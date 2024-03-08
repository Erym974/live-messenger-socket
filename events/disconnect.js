module.exports = {
    exec: async (io, socket, utils, payload) => {

        let user = utils.findUserIdBySocket(socket.id);

        console.log(`User ${user} disconnected`);

        io.to(`is-online#${user}`).emit('is-online', { status: false, id: user })
        utils.onlines.delete(user)

    }
}