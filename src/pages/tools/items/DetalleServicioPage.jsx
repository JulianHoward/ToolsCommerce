import { Box, Container, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServicioById } from '../../../services/ServiciosService';
import Menu from '../../../components/Menu';

const DetalleServicioPage = () => {
    const { servicioId } = useParams();
    const [servicio, setServicio] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServicio = async () => {
            setLoading(true);
            try {
                const fetchedServicio = await getServicioById(servicioId, token);
                setServicio(fetchedServicio);
            } catch (error) {
                console.error('Error al cargar el servicio:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchServicio();
    }, [servicioId, token]);

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="primary">Cargando detalles del servicio...</Typography>
            </Box>
        );
    }

    if (!servicio) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="error">No se encontró el servicio.</Typography>
            </Box>
        );
    }

    return (
        <>
            <Menu />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: 'white' }}>
                <Container sx={{ py: 4 }}>
                    <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 3 }}>
                        {servicio.imagen && (
                            <CardMedia
                                component="img"
                                height="300"
                                image={`http://localhost:3000/${servicio.imagen}`}
                                alt={servicio.nombre}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h4" component="h1" gutterBottom color="primary">
                                {servicio.nombre}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                                {servicio.descripcion}
                            </Typography>
                            <Typography variant="h6" color="primary">
                                Precio: ${servicio.precio}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2 }}
                                onClick={() => navigate(-1)} // Volver a la página anterior
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

export default DetalleServicioPage;
