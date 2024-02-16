module.exports = {
    exec: async (io, socket, utils, payload) => {

        io.to(`group#${payload.id}`).emit('easter-received', payload.easter);

    }
}