import axios from 'axios';

export const getCategoriasTools = async (token) => {
    try {
        const response = await axios.get('https://toolscommerce.onrender.com/api/categorias-herramientas', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener las categorías de herramientas', error);
        return [];
    }
};

export const getCategoriaHerramientaById = async (id, token) => {
    try {
        const response = await axios.get(`https://toolscommerce.onrender.com/api/categorias-herramientas/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener la categoría de herramientas', error);
        return null;
    }
};

const API_BASE_URL = 'https://toolscommerce.onrender.com/api/productos';

// Obtener todos los productos
export const getProductos = async (token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener los productos', error);
        throw error;
    }
};

// Obtener un producto por su ID
export const getProductoById = async (id, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener el producto', error);
        throw error;
    }
};

// Obtener productos por categoría
export const getProductosByCategoria = async (categoriaId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/categoria/${categoriaId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos por categoría', error);
        throw error;
    }
};

// Obtener productos por proveedor
export const getProductosByProveedor = async (proveedorId, token) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/proveedor/${proveedorId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener productos por proveedor', error);
        throw error;
    }
};

// Crear un nuevo producto
export const createProducto = async (productoData, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/`, productoData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el producto', error);
        throw error;
    }
};

// Actualizar un producto (PUT)
export const updateProducto = async (id, productoData, token) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, productoData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el producto', error);
        throw error;
    }
};

// Eliminar un producto
export const deleteProducto = async (id, token) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el producto', error);
        throw error;
    }
};

// Subir imagen para un producto
export const uploadProductoImage = async (id, imageFile, token) => {
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
        console.error('Error al subir la imagen del producto', error);
        throw error;
    }
};
