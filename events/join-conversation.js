module.exports = {
    exec: async (io, socket, utils, payload) => {

        const decodedPayload = await utils.decodeToken(payload.token);
        const groups = payload.groups

        for (const group of groups) {
            const allowed = await utils.checkUserGroup(payload.token, group);

            if(allowed) {
                console.log(`User ${decodedPayload.id} joined conversation ${group}`);
                socket.join(`conversation#${group}`)
            }
        }

    }
}