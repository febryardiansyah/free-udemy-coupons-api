const axios = require('axios').default;

axios.defaults.baseURL = 'https://insidelearn.com/'

const AxiosService = (url) => {
    return new Promise(async(resolve, reject) => {
        try {
            const res = await axios.get(url);
            return resolve(res.data);
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = AxiosService;