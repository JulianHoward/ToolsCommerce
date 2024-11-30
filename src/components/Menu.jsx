import { AppBar, Toolbar, Typography, IconButton, Box, Modal, Avatar, Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const username = localStorage.getItem('username');

    const handleCartClick = () => {
        navigate('/carrito');
    };

    const handleProfileClick = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, cursor: 'pointer' }}
                        onClick={() => navigate('/home')}
                    >
                        Tools Now
                    </Typography>
                    <Box>
                        <IconButton color="inherit" onClick={handleCartClick}>
                            <ShoppingCartIcon />
                        </IconButton>
                        <IconButton color="inherit" onClick={handleProfileClick}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 300,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Avatar
                        sx={{ width: 80, height: 80, margin: '0 auto', bgcolor: 'primary.main' }}
                    >
                        {username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                        {username || 'Usuario'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Correo: {username ? `${username}@example.com` : 'correo@example.com'}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleLogout}
                        fullWidth
                    >
                        Cerrar Sesión
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export default Menu;
