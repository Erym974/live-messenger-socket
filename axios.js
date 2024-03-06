const realAxios = require('axios');

const axios = realAxios.create({
    baseURL: 'http://api.swiftchat.local:8000/',
});

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log({ status: false, data: error});
});

module.exports = axios;