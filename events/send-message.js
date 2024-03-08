const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        
        let message = payload.message;
        let files = [];

        if (message.hasOwnProperty('files')) {
            files = message.files
            delete message.files
            files = files.map(file => file.path)
        }

        // Envoi du message text
        let responseMessage = null;
        if(message.message != "") {
            responseMessage = await axios.post(`/messages/${payload.group}`, message, { headers: { Authorization: `Bearer ${payload.token}` } })
        }

        // Préparation pour les images
        let responseImages = null;
        if(files.length > 0) {
            responseImages = await axios.post(`/messages/${payload.group}`, { files }, { headers: { Authorization: `Bearer ${payload.token}` } })
        }

        // Réponse du message text
        if(responseMessage) {
            if(responseMessage?.status) {
                io.to(`group#${payload?.group}`).emit(`new-message#${payload.group}`, responseMessage.datas);
                io.to(`conversation#${payload?.group}`).emit("conversation-to-top", { group: payload.group, message: responseMessage.datas });
            }
        }

        // Réponse du message avec les images
        if(responseImages) {
            if(responseImages?.status) {
                io.to(`group#${payload?.group}`).emit(`new-message#${payload.group}`, responseImages.datas);
                io.to(`conversation#${payload?.group}`).emit("conversation-to-top", { group: payload.group, message: responseImages.datas });
            }
        }

    }

}