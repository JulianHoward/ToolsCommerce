import { Box, Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductoById } from '../../../services/ToolsService';
import { useCart } from '../../../components/CartContext';
import Menu from '../../../components/Menu';

const DetalleHerramientaPage = () => {
    const { productoId } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducto = async () => {
            setLoading(true);
            try {
                const fetchedProducto = await getProductoById(productoId, token);
                setProducto(fetchedProducto);
            } catch (error) {
                console.error('Error al cargar el producto:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducto();
    }, [productoId, token]);

    const handleAddToCart = () => {
        addToCart(producto);
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="primary">Cargando detalles de la herramienta...</Typography>
            </Box>
        );
    }

    if (!producto) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="error">No se encontró la herramienta.</Typography>
            </Box>
        );
    }

    return (
        <>
            <Menu />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: 'white' }}>
                <Container sx={{ py: 4 }}>
                    <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 3 }}>
                        {producto.imagen && (
                            <CardMedia
                                component="img"
                                height="300"
                                image={producto.imagen}
                                alt={producto.nombre}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h4" component="h1" gutterBottom color="primary">
                                {producto.nombre}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {producto.descripcion}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Precio por hora: Bs. {producto.precio}
                            </Typography>
                            <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
                                Stock disponible: {producto.stock}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2, mr: 2 }}
                                onClick={handleAddToCart}
                            >
                                Agregar al Carrito
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2 }}
                                onClick={() => navigate(-1)}
                            >
                                Volver
                            </Button>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
        </>
    );
};

export default DetalleHerramientaPage;
