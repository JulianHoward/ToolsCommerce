import { Container, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import { useEffect, useState } from 'react';
import { getAlquileres, getServicios } from '../../services/HistorialService';

const HistorialPage = () => {
    const [alquileres, setAlquileres] = useState([]);
    const [servicios, setServicios] = useState([]);
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                const [alquileresResponse, serviciosResponse] = await Promise.all([
                    getAlquileres(token),
                    getServicios(token),
                ]);
                setAlquileres(alquileresResponse);
                setServicios(serviciosResponse);
            } catch (error) {
                console.error('Error fetching historial:', error);
            }
        };
        fetchHistorial();
    }, [userId]);

    return (
        <Container sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom>
                Historial
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Alquileres</Typography>
                <Grid container spacing={4}>
                    {alquileres.map((alquiler) => (
                        <Grid item xs={12} sm={6} md={4} key={alquiler.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{alquiler.producto}</Typography>
                                    <Typography variant="body2">
                                        Total: {alquiler.total}
                                    </Typography>
                                    <Typography variant="body2">
                                        Estado: {alquiler.estado}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h5">Servicios Ofrecidos</Typography>
                <Grid container spacing={4}>
                    {servicios.map((servicio) => (
                        <Grid item xs={12} sm={6} md={4} key={servicio.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{servicio.nombre}</Typography>
                                    <Typography variant="body2">
                                        Precio: {servicio.precio}
                                    </Typography>
                                    <Typography variant="body2">
                                        Estado: {servicio.estado}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default HistorialPage;
