import axios from 'axios';

export const postLogin = async (credentials) => {
    console.log('Intentando hacer login con', credentials);
    return new Promise((resolve, reject) => {
        axios.post('https://toolscommerce.onrender.com/api/login', credentials)
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
        axios.post('https://toolscommerce.onrender.com/api/register', credentials)
            .then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
    });
}

export const getUserDetails = async (token) => {
    try {
        const response = await axios.get('https://toolscommerce.onrender.com/api/users', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los detalles del usuario:', error);
        throw error;
    }
};
