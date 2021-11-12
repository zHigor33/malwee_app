import Axios from "axios";

const server = "http://192.168.0.100:3001";

export const get = async (url) => {
   // Configurar o axios
   return Axios.get(server + url);
};

export const post = (url, obj) => {
    return new Promise((resolve, reject) => {
        Axios.post(server + url, obj).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        })
    })
};

export const put = (url, obj) => {
    return Axios.put(server + url, obj);
}