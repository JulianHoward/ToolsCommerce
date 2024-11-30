import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategoriasServices } from '../../../services/ServiciosService';
import Menu from '../../../components/Menu';

const ServicesCategoriasPage = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            const fetchedCategories = await getCategoriasServices(token);
            setCategories(fetchedCategories);
            setLoading(false);
        };
        fetchCategories();
    }, [token]);

    const handleCategoryClick = (categoryId) => {
        navigate(`/servicios/${categoryId}`);
    };

    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' }}>
                <Typography variant="h6" color="primary">Cargando categorías...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Menu />
            <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: 'white' }}>
                <Container sx={{ py: 4 }}>
                    <Typography variant="h4" component="h2" gutterBottom color="primary">
                        Categorías de Servicios
                    </Typography>
                    <Grid container spacing={4}>
                        {categories.length === 0 ? (
                            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                                No hay categorías disponibles en este momento.
                            </Typography>
                        ) : (
                            categories.map((category) => (
                                <Grid item xs={12} sm={6} md={4} key={category.id}>
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
                                                {category.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                                {category.descripcion}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                sx={{ mt: 2 }}
                                                onClick={() => handleCategoryClick(category.id)}
                                            >
                                                Ver más
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

export default ServicesCategoriasPage;
