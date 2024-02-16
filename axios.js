const realAxios = require('axios');

const axios = realAxios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log({ status: false, data: error});
});

module.exports = axios;