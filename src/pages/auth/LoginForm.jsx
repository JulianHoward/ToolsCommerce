import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from '../../theme';
import { postLogin } from '../../services/AuthService';
import { Helmet } from 'react-helmet'; // Importación de react-helmet para gestionar las etiquetas de SEO

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Tools & Services
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const enviarDatos = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    doLogin();
  };

  const doLogin = () => {
    const credentials = {
      correo,
      password
    };

    console.log("Intentando iniciar sesión con credenciales:", credentials);

    postLogin(credentials)
      .then((res) => {
        console.log("Login exitoso", res);
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', correo);
        navigate('/home');
      })
      .catch((err) => {
        console.error("Error en login", err);
        if (err.response && err.response.status === 401) {
          setErrors({ ...errors, formError: 'Usuario o contraseña incorrectos' });
        }
      });
  };

  return (
    <ThemeProvider theme={theme}>
      {/* Mejora SEO: Uso de react-helmet para agregar etiquetas meta y título de la página */}
      <Helmet>
        <title>Iniciar sesión - Tools & Services</title> {/* Título descriptivo */}
        <meta name="description" content="Inicia sesión en Tools & Services para acceder a herramientas y servicios." /> {/* Descripción clara para SEO */}
        <meta name="robots" content="noindex, nofollow" /> {/* Evita que los motores de búsqueda indexen esta página de login */}
      </Helmet>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
            Bienvenido de nuevo
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 1 }}>
            Ingresa tus datos para continuar explorando herramientas y servicios.
          </Typography>
          <Box component="form" noValidate onSubmit={enviarDatos} sx={{ mt: 3 }}>
            {errors.formError && <Typography color="error">{errors.formError}</Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="correo"
              label="Correo Electrónico"
              name="correo"
              autoComplete="correo"
              autoFocus
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              error={Boolean(errors.correo)}
              helperText={errors.correo}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordar mis datos"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: 'primary.main',
                '&:hover': {
                  backgroundColor: '#ff8f00',
                },
              }}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary.main">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" color="secondary.main">
                  {"¿No tienes cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
