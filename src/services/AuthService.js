import axios from 'axios';

export const postLogin = async (credentials) => {
    console.log('Intentando hacer login con', credentials);
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/login', credentials)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('userId', res.data.id);
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
    });
}

export const postRegister = async (credentials) => {
    return new Promise((resolve, reject) => {
        axios.post('http://localhost:3000/api/register', credentials)
            .then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
    });
}

export const getUserDetails = async () => {
    return axios.get('http://localhost:3000/api/user').then((res) => res.data);
}