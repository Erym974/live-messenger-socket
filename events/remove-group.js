const axios = require("../axios");

module.exports = {
    exec: async (io, socket, utils, payload) => {

        const groupResponse = await axios.get(`/groups/${payload.id}`, { headers: { Authorization: `Bearer ${payload.token}` } })

        if(groupResponse.status) {
            const response = await axios.post(`/members/${payload.id}`, { action: "delete" }, { headers: { Authorization: `Bearer ${payload.token}` } })
            const group = groupResponse.datas

            if(response.status) {
                const roomName = `group#${payload.id}`
    
                group.members.forEach(member => {
                    let userSocket = utils.users.get(member.id)
                    console.log(userSocket);

                    if(userSocket) {
                        userSocket.leave(roomName)
                        userSocket.emit('kicked', group)
                    }
                })
    
            }
        }




    }
}