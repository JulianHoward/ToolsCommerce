import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiciosByCategoria } from '../../../services/ServiciosService';
import Menu from '../../../components/Menu';

const ServiciosPorCategoriaPage = () => {
    const { categoriaId } = useParams(); // Obtener el id de la categoría desde la URL
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServicios = async () => {
            setLoading(true);
            try {
                const fetchedServicios = await getServiciosByCategoria(categoriaId, token); // Llama al servicio
                setServicios(fetchedServicios);
            } catch (error) {
                console.error('Error al cargar los servicios:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServicios();
    }, [categoriaId, token]);

    const handleServiceClick = (servicioId) => {
        // Redirige a una página de detalle de servicio
        navigate(`/servicios/detail/${servicioId}`);
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="primary">Cargando servicios...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Menu />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: 'white' }}>
                <Container sx={{ py: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="primary">
                        Servicios de la Categoría {categoriaId}
                    </Typography>
                    <Grid container spacing={4}>
                        {servicios.length === 0 ? (
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                                No hay servicios disponibles en esta categoría.
                            </Typography>
                        ) : (
                            servicios.map((servicio) => (
                                <Grid item xs={12} sm={6} md={4} key={servicio.id}>
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
                                                {servicio.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {servicio.descripcion}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                sx={{ mt: 2 }}
                                                onClick={() => handleServiceClick(servicio.id)}
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

export default ServiciosPorCategoriaPage;
