import axios from 'axios';
export const createAlquiler = async (alquiler, token) => {
    try {
        const response = await axios.post('https://toolscommerce.onrender.com/api/alquileres', alquiler, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el alquiler:', error);
        throw error;
    }
}

export const createContrato = async (contrato, token) => {
    try {
        const response = await axios.post('https://toolscommerce.onrender.com/api/contratos', contrato, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el contrato:', error);
        throw error;
    }
}
