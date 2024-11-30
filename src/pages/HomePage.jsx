import { Box, Container, CssBaseline, Typography, Grid, Button, TextField, Card, CardContent, CardMedia } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HandymanIcon from '@mui/icons-material/Handyman';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Link from '@mui/material/Link';
import BuildIcon from '@mui/icons-material/Build';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
import Menu from '../components/Menu';

const Homepage = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/search');
    };

    const handleJoin = () => {
        navigate('/join');
    };

    return (
        <>
            <Menu />
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
                <CssBaseline />
                {/* Header */}
                <Box sx={{ backgroundColor: '#1976d2', color: 'white', py: 4 }}>
                    <Container>
                        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                            ¡Todo lo que necesitas, en un solo lugar!
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                            Encuentra herramientas para alquilar o contrata a profesionales cerca de ti.
                        </Typography>
                        <Box sx={{ display: 'flex', mt: 3 }}>
                            <TextField
                                fullWidth
                                placeholder="¿Qué necesitas? Ejemplo: Taladro, Plomero"
                                variant="outlined"
                                sx={{ backgroundColor: 'white', borderRadius: '4px', mr: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="secondary"
                                startIcon={<SearchIcon />}
                                onClick={handleSearch}
                            >
                                Buscar
                            </Button>
                        </Box>
                    </Container>
                </Box>

                {/* Iconos destacados */}
                <Container sx={{ mt: 6 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        ¡Explora!
                    </Typography>
                    <Grid container spacing={4}>
                        {/* Tarjeta para Herramientas */}
                        <Grid item xs={12} sm={4}>
                            <Link href="/herramientas" style={{ textDecoration: 'none' }}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <HandymanIcon color="primary" sx={{ fontSize: 60 }} />
                                        <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                                            Herramientas
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Encuentra taladros, sierras y más herramientas de alta calidad.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>

                        {/* Tarjeta para Reparaciones y Servicios */}
                        <Grid item xs={12} sm={4}>
                            <Link href="/servicios" style={{ textDecoration: 'none' }}>
                                <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <BuildIcon color="primary" sx={{ fontSize: 60 }} />
                                        <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                                            Reparaciones y Servicios
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Soluciona problemas en tu hogar con expertos en reparaciones.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    </Grid>
                </Container>

                {/* Destacados */}
                <Container sx={{ mt: 6 }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Servicios y Herramientas Populares
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://via.placeholder.com/300x140"
                                    alt="Taladro"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h3">
                                        Taladro Eléctrico
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Desde $10/día
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://via.placeholder.com/300x140" // Cambia por imágenes reales
                                    alt="Jardinería"
                                />
                                <CardContent>
                                    <Typography variant="h6" component="h3">
                                        Servicio de Jardinería
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Desde $15/hora
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>

                {/* Testimonios */}
                <Box sx={{ backgroundColor: '#eeeeee', py: 4, mt: 6 }}>
                    <Container>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Lo que nuestros usuarios dicen
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <StarIcon color="primary" sx={{ fontSize: 40 }} />
                                    <Typography variant="body1" sx={{ mt: 2 }}>
                                        &quot;La plataforma me ayudó a encontrar un plomero en minutos. ¡Recomendado!&quot;
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        - Ana G.
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Call to Action */}
                <Container sx={{ mt: 6, textAlign: 'center' }}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        ¿Tienes herramientas o habilidades? ¡Únete a nosotros!
                    </Typography>
                    <Button variant="contained" color="primary" size="large" onClick={handleJoin}>
                        Unirme Ahora
                    </Button>
                </Container>

                {/* Footer */}
                <Box sx={{ backgroundColor: '#333', color: 'white', py: 3, mt: 'auto' }}>
                    <Container>
                        <Typography variant="body2" align="center">
                            © 2024 Herramientas y Servicios. Todos los derechos reservados.
                        </Typography>
                    </Container>
                </Box>
            </Box>
        </>
    );
};

export default Homepage;
