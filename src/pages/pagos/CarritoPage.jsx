import { useCart } from '../../components/CartContext';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import axios from 'axios';

const CarritoPage = () => {
    const { cart, removeFromCart, clearCart, getTotal } = useCart();

    const handleCheckout = async () => {
        if (cart.some(item => item.quantity <= 0)) {
            alert('Todos los productos deben tener una cantidad mayor a 0.');
            return;
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