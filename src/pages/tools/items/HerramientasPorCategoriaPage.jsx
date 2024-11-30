import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductosByCategoria } from '../../../services/ToolsService';
import { getCategoriaHerramientaById } from '../../../services/ToolsService';
import Menu from '../../../components/Menu';

const HerramientasPorCategoriaPage = () => {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [categoriaNombre, setCategoriaNombre] = useState('');
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductosAndCategoria = async () => {
            setLoading(true);
            try {
                const fetchedProductos = await getProductosByCategoria(categoriaId, token);
                setProductos(fetchedProductos);

                const categoria = await getCategoriaHerramientaById(categoriaId, token);
                if (categoria) {
                    setCategoriaNombre(categoria.nombre);
                }
            } catch (error) {
                console.error('Error al cargar las herramientas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductosAndCategoria();
    }, [categoriaId, token]);

    const handleToolClick = (productoId) => {
        navigate(`/herramientas/detail/${productoId}`);
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="primary">Cargando herramientas...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Menu />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: 'white' }}>
                <Container sx={{ py: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="primary">
                        Herramientas de la Categoría {categoriaNombre}  {/* Aquí mostramos el nombre de la categoría */}
                    </Typography>
                    <Grid container spacing={4}>
                        {productos.length === 0 ? (
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                                No hay herramientas disponibles en esta categoría.
                            </Typography>
                        ) : (
                            productos.map((producto) => (
                                <Grid item xs={12} sm={6} md={4} key={producto.id}>
                                    <Card sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        backgroundColor: '#f5f5f5',
                                        borderRadius: '8px',
                                        boxShadow: 3,
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                            transition: '0.3s',
                                        }
                                    }}>
                                        <CardContent sx={{ textAlign: 'center' }}>
                                            <Typography variant="h6" component="h3" color="primary">
                                                {producto.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {producto.descripcion}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                sx={{ mt: 2 }}
                                                onClick={() => handleToolClick(producto.id)}
                                            >
                                                Ver Detalle
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))
                        )}
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

export default HerramientasPorCategoriaPage;
