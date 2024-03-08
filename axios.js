const realAxios = require('axios');
const config = require('./config.js');

console.log(config);

const axios = realAxios.create({
    baseURL: config.BASE_URL_API,
});

axios.interceptors.response.use((response) => {
    return response.data;
}, (error) => {
    console.log({ status: false, data: error});
});

module.exports = axios;