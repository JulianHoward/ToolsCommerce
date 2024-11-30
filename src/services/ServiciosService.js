import axios from 'axios';

export const getCategoriasServices = async (token) => {
    try {
        const response = await axios.get('http://localhost:3000/api/categorias-servicios', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorías de servicios', error);
        return [];
    }
};

const API_BASE_URL = 'http://localhost:3000/api/servicios';

// Obtener todos los servicios
export const getServicios = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los servicios', error);
        throw error;
    }
};

// Obtener un servicio por su ID
export const getServicioById = async (id, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el servicio', error);
        throw error;
    }
};

// Obtener servicios por categoría
export const getServiciosByCategoria = async (categoriaId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categoria/${categoriaId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener servicios por categoría', error);
        throw error;
    }
};

// Obtener servicios por proveedor
export const getServiciosByProveedor = async (proveedorId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/proveedor/${proveedorId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener servicios por proveedor', error);
        throw error;
    }
};

// Crear un nuevo servicio
export const createServicio = async (servicioData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, servicioData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el servicio', error);
        throw error;
    }
};

// Actualizar un servicio (PUT)
export const updateServicio = async (id, servicioData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, servicioData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el servicio', error);
        throw error;
    }
};

// Eliminar un servicio
export const deleteServicio = async (id, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el servicio', error);
        throw error;
    }
};

// Subir imagen para un servicio
export const uploadServicioImage = async (id, imageFile, token) => {
    const formData = new FormData();
    formData.append('imagen', imageFile);

    try {
        const response = await axios.post(`${API_BASE_URL}/${id}/image`, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al subir la imagen del servicio', error);
        throw error;
    }
};
