import axios from 'axios';
export const getAlquileres = async (token) => {
    const response = await axios.get('https://toolscommerce.onrender.com/api/alquileres', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getServicios = async (token) => {
    const response = await axios.get('https://toolscommerce.onrender.com/api/servicios', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};
