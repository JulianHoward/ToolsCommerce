import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel, } from '@mui/material';
import HandymanIcon from '@mui/icons-material/Handyman';
import BuildIcon from '@mui/icons-material/Build';
import { useNavigate } from 'react-router-dom';
import { createProducto, uploadProductoImage, getCategoriasTools } from '../../services/ToolsService';
import { getUserDetails } from '../../services/AuthService';
import { getCategoriasServices } from '../../services/ServiciosService';
import { createServicio } from '../../services/ServiciosService';

const OfferPage = () => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
    const [userId, setUserId] = useState('');
    const [openToolModal, setOpenToolModal] = useState(false);
    const [openServiceModal, setOpenServiceModal] = useState(false);
    const [categorias, setCategorias] = useState([]);
    const [categoriasServices, setCategoriasServices] = useState([]);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        categoriaHerramientaFK: '',
        precio: '',
        stock: '',
        proveedorFK: '',
    });
    const [formDataService, setFormDataService] = useState({
        nombre: '',
        descripcion: '',
        categoriaServicioFK: '',
        precio: '',
        proveedorFK: '',
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImageService, setSelectedImageService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails(token);
                const userDetailsOne = userDetails.find(user => user.correo === username);

                if (userDetailsOne) {
                    setUserId(userDetailsOne.id);
                    localStorage.setItem('userId', userDetailsOne.id);
                    console.log('Detalles del usuario:', userDetailsOne.id);
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        proveedorFK: userDetailsOne.id,
                    }));

                    setFormDataService((prevFormDataService) => ({
                        ...prevFormDataService,
                        proveedorFK: userDetailsOne.id,
                    }));
                }  else {
                    console.error('El correo no coincide con el usuario en sesión.');
                }
            } catch (error) {
                console.error('Error obteniendo detalles del usuario:', error);
            }
        };

        if (!userId) {
            fetchUserDetails();
        }
    }, [username, userId, token]);

    useEffect(() => {
        const loadCategorias = async () => {
            setLoading(true);
            try {
                const fetchedCategories = await getCategoriasTools(token);
                setCategorias(fetchedCategories);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
            setLoading(false);
        };
        loadCategorias();
    }, [token]);

    useEffect(() => {
        const loadCategoriasServices = async () => {
            setLoading(true);
            try {
                const fetchedCategoriesServices = await getCategoriasServices(token);
                setCategoriasServices(fetchedCategoriesServices);
            } catch (error) {
                console.error('Error al cargar categorías:', error);
            }
            setLoading(false);
        };
        loadCategoriasServices();
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleChangeService = (e) => {
        const { name, value } = e.target;
        setFormDataService({ ...formDataService, [name]: value });
    };

    const handleImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const handleImageChangeService = (e) => {
        setSelectedImageService(e.target.files[0]);
    };

    const handleOpenToolModal = () => setOpenToolModal(true);
    const handleCloseToolModal = () => setOpenToolModal(false);

    const handleOpenServiceModal = () => setOpenServiceModal(true);
    const handleCloseServiceModal = () => setOpenServiceModal(false);

    const handleSubmit = async () => {
        try {
            const producto = await createProducto(formData, token);

            if (selectedImage) {
                await uploadProductoImage(producto.id, selectedImage, token);
            }

            setOpenToolModal(false);
            setFormData({
                nombre: '',
                descripcion: '',
                categoriaHerramientaFK: '',
                precio: '',
                stock: '',
                proveedorFK: userId,
            });
            setSelectedImage(null);
        } catch (error) {
            alert('Error al crear el producto. Por favor, verifica los datos e inténtalo de nuevo.');
        }
    };

    const handleSubmitService = async () => {
        try {
            const servicio = await createServicio(formDataService, token);

            if (selectedImageService) {
                await uploadServicioImage(servicio.id, selectedImageService, token);
            }

            setOpenServiceModal(false);
            setFormDataService({
                nombre: '',
                descripcion: '',
                categoriaServicioFK: '',
                precio: '',
                proveedorFK: userId,
            });
            setSelectedImageService(null);
        } catch (error) {
            console.error('Error al crear el servicio:', error); // Imprime el error completo en la consola
            alert('Error al crear el servicio. Por favor, verifica los datos e inténtalo de nuevo.');
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
            <Container sx={{ mt: 6 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Bienvenido, {username} 👋
                </Typography>
                <Typography variant="h6" gutterBottom>
                    ¡Explora cómo puedes contribuir con tus herramientas o habilidades!
                </Typography>
                <Grid container spacing={4}>
                    {/* Tarjeta para Herramientas */}
                    <Grid item xs={12} sm={6} onClick={handleOpenToolModal}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <HandymanIcon color="primary" sx={{ fontSize: 60 }} />
                                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                                    Herramientas
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Comparte tus herramientas como taladros, sierras y más.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Tarjeta para Servicios */}
                    <Grid item xs={12} sm={6} onClick={handleOpenServiceModal}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <BuildIcon color="primary" sx={{ fontSize: 60 }} />
                                <Typography variant="h6" component="h3" sx={{ mt: 2 }}>
                                    Servicios
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Ofrece tus habilidades como plomero, electricista, y más.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>

            {/* Modal de Herramientas */}
            <Dialog open={openToolModal} onClose={handleCloseToolModal} maxWidth="sm" fullWidth>
                <DialogTitle>Agregar Herramienta</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nombre"
                        name="nombre"
                        fullWidth
                        value={formData.nombre}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        name="descripcion"
                        fullWidth
                        value={formData.descripcion}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="categoria-label">Categoría</InputLabel>
                        <Select
                            labelId="categoria-label"
                            name="categoriaHerramientaFK"
                            value={formData.categoriaHerramientaFK}
                            onChange={handleChange}
                        >
                            {categorias.map((categoria) => (
                                <MenuItem key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Precio"
                        name="precio"
                        type="number"
                        fullWidth
                        value={formData.precio}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Stock"
                        name="stock"
                        type="number"
                        fullWidth
                        value={formData.stock}
                        onChange={handleChange}
                    />
                    <input type="file" onChange={handleImageChange} accept="image/*" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseToolModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Modal de Servicios */}
            <Dialog open={openServiceModal} onClose={handleCloseServiceModal} maxWidth="sm" fullWidth>
                <DialogTitle>Agregar Servicio</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Nombre"
                        name="nombre"
                        fullWidth
                        value={formDataService.nombre}
                        onChange={handleChangeService}
                    />
                    <TextField
                        margin="dense"
                        label="Descripción"
                        name="descripcion"
                        fullWidth
                        value={formDataService.descripcion}
                        onChange={handleChangeService}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel id="categoria-label-service">Categoría</InputLabel>
                        <Select
                            labelId="categoria-label-service"
                            name="categoriaServicioFK"
                            value={formDataService.categoriaServicioFK}
                            onChange={handleChangeService}
                        >
                            {categoriasServices.map((categoria) => (
                                <MenuItem key={categoria.id} value={categoria.id}>
                                    {categoria.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Precio"
                        name="precio"
                        type="number"
                        fullWidth
                        value={formDataService.precio}
                        onChange={handleChangeService}
                    />
                    <input type="file" onChange={handleImageChangeService} accept="image/*" />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseServiceModal} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleSubmitService} color="primary">
                        Guardar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OfferPage;
