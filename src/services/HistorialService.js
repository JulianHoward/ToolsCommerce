import axios from 'axios';
export const getAlquileres = async (token) => {
    const response = await axios.get('http://localhost:3000/api/alquileres', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getServicios = async (token) => {
    const response = await axios.get('http://localhost:3000/api/servicios', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return response.data;
};
