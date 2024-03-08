module.exports = {
    exec: async (io, socket, utils, payload) => {

        const allowed = await utils.checkUserGroup(payload.token, payload.id);
        
        if(allowed) {

            const decodedPayload = await utils.decodeToken(payload.token);
            utils.users.set(decodedPayload.id, socket)

            console.log(`User ${decodedPayload.id} joined group ${payload.id}`);

            socket.join(`group#${payload?.id}`)
            socket.emit("join-response", {result: true});
            
        } else {
            socket.emit("join-response", {result: false});
        }

    }
}