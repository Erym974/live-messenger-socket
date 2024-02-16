module.exports = {
    exec: async (io, socket, utils, payload) => {

        // Join the invitation room
        socket.join(`invitation#${payload.code}`);

    }
}