module.exports = {
    exec: async (io, socket, utils, payload) => {
        const user = await utils.findUserIdBySocket(socket.id);
        console.log(`User ${user} left group ${payload}`);
        socket.leave(payload);
    }
}