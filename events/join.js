module.exports = {
    exec: async (io, socket, utils, payload) => {

        utils.isAuthenticated(socket)
        utils.checkUserGroup(socket, payload)
        const user = utils.getUserBySocket(socket.id)
        console.log("Room joined : " + payload + " by " + user?.fullname);
        socket.join(payload)

    }
}