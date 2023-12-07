module.exports = {
    exec: async (io, socket, utils, payload) => {

        console.log("User disconnected");

        for (const [key, value] of utils.users.entries()) {
            if(value.socket === socket.id) {
                utils.users.delete(key)
            }
        }

    }
}