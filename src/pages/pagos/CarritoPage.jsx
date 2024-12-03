import { useCart } from '../../components/CartContext';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';
import { getProductos } from '../../services/ToolsService';
import { getServicios } from '../../services/ServiciosService';
import { getUserDetails } from '../../services/AuthService';
import { useEffect, useState } from 'react';

const CarritoPage = () => {
    const { cart, removeFromCart, clearCart, getTotal } = useCart();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const [userId, setUserId] = useState('');
    const [ formDataAlquiler, setFormDataAlquiler ] = useState({
        clienteFK: '',
        productoFK: '',
        fechaInicio: '',
        fechaFin: '',
        total: '',
        estado: 'pendiente',
    });

    const [ formDataContrato, setFormDataContrato ] = useState({
        clienteFK: '',
        servicioFK: '',
        fechaInicio: '',
        duracion: '',
        total: '',
        estado: 'pendiente',
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const userDetails = await getUserDetails(token);
                const userDetailsOne = userDetails.find(user => user.correo === username);

                if (userDetailsOne) {
                    setUserId(userDetailsOne.id);
                    localStorage.setItem('userId', userDetailsOne.id);
                    console.log('Detalles del usuario:', userDetailsOne.id);
                    setFormDataAlquiler((prevFormDataAlquiler) => ({
                        ...prevFormDataAlquiler,
                        clienteFK: userDetailsOne.id,
                    }));

                    setFormDataContrato((prevFormDataContrato) => ({
                        ...prevFormDataContrato,
                        clienteFK: userDetailsOne.id,
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

    const createAlquiler = async (item) => {
        const newAlquiler = {
            ...formDataAlquiler,
            productoFK: item.id,
            fechaInicio: new Date().toISOString(),
            fechaFin: new Date().toISOString(),
            total: item.precio,
        };
    
        try {
            const response = await axios.post('http://localhost:3000/api/alquileres', newAlquiler, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Alquiler creado:', response.data);
        } catch (error) {
            console.error('Error al crear el alquiler:', error);
        }
    };

    const createContrato = async (item) => {
        const newContrato = {
            ...formDataContrato,
            servicioFK: item.id,
            fechaInicio: new Date().toISOString(),
            duracion: 1,
            total: item.precio,
        };

        try {
            const response = await axios.post('http://localhost:3000/api/contratos', newContrato, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Contrato creado:', response.data);
        } catch (error) {
            console.error('Error al crear el contrato:', error);
        }
    };


    const checkItemCategory = async (item) => {
        try {
            const [ productos, servicios ] = await Promise.all([
                getProductos(token),
                getServicios(token)
            ]);

            const productoFound = productos.find(producto => producto.nombre === item.nombre);
            const servicioFound = servicios.find(servicio => servicio.nombre === item.nombre);

            if (productoFound) {
                // Si el item está en la lista de productos, crear un alquiler
                createAlquiler(item);
            } else if (servicioFound) {
                // Si el item está en la lista de servicios, crear un contrato
                createContrato(item);
            } else {
                console.log('Item no encontrado en servicios ni productos.');
            }
        } catch (error) {
            console.error('Error al verificar el item:', error);
        }
    }

    const handleCheckout = async () => {
        if (cart.some(item => item.quantity <= 0)) {
            alert('Todos los productos deben tener una cantidad mayor a 0.');
            return;
        }

        for (const item of cart) {
            await checkItemCategory(item);
        }

        try {
            const response = await axios.post('http://localhost:3000/api/pagos/create-stripe-session', {
                carrito: cart,
                total: getTotal(),
                clienteFK: 1,
            });

            if (response.data.url) {
                window.location.href = response.data.url;
            }
        } catch (error) {
            console.error('Error al iniciar el proceso de pago:', error);
            alert('Hubo un problema al procesar el pago.');
        }
    };

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5', color: 'white' }}>
            <Container sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom color="primary">
                    Carrito de Compras
                </Typography>
                {cart.length === 0 ? (
                    <Typography variant="body1" color="text.secondary">
                        Tu carrito está vacío.
                    </Typography>
                ) : (
                    <>
                        <Grid container spacing={4}>
                            {cart.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    <Card sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: 3 }}>
                                        <CardContent>
                                            <Typography variant="h6" color="primary">
                                                {item.nombre}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Precio: ${item.precio}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Cantidad: {item.quantity}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Subtotal: ${item.quantity * item.precio}
                                            </Typography>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                sx={{ mt: 2 }}
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                Eliminar
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                        <Box sx={{ mt: 4 }}>
                            <Typography variant="h5" color="primary">
                                Total: Bs.{getTotal()}
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ mt: 2, mr: 2 }}
                                onClick={clearCart}
                            >
                                Vaciar Carrito
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleCheckout}
                            >
                                Proceder al Pago
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </Box>
    );
};

export default CarritoPage;
