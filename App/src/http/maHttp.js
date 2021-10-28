import Axios from "axios";

const server = "http://10.0.0.167:3001";

/*
const defineHeaders = (public) => {
    const result = {};
    const token = '';

    if (!public){
        // Carrega o token do localstorange

        if (token != ''){
            result.headers = { 'Authorization': `Basic ${token}` }
        }
    }

    return result;
}

export const get = async (url, public) => {
   // Configurar o axios
   return Axios.get(server + url, defineHeaders(public));
};

export const post = (url, obj, public) => {
    return Axios.post(server + url, obj, defineHeaders(public));
};

export const put = (url, obj, public) => {
    return Axios.put(server + url, obj, defineHeaders(public));
}
*/

export const post = (url, obj) => {
    return new Promise((resolve, reject) => {
        Axios.post(server + url, obj).then(response => {
            resolve(response.data);
        }).catch(err => {
            reject(err);
        });
    });
};

export const get = (url) => {
    return Axios.get(server + url);
}
