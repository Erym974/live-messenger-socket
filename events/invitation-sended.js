module.exports = {
    exec: async (io, socket, utils, payload) => {

        io.to(`invitation#${payload?.receiver?.friendCode}`).emit('invitation-received', payload);

    }
}