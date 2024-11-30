import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from '@mui/material/Link';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import { useNavigate } from "react-router-dom";
import { postRegister } from '../../services/AuthService';
import { Helmet } from "react-helmet"; // Importamos react-helmet para gestionar SEO

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

const RegisterForm = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [validated, setValidated] = useState(false);
  const [errors, setErrors] = useState({});

  const enviarDatos = (e) => {
    const form = e.currentTarget;
    let isValid = form.checkValidity();

    e.preventDefault();
    e.stopPropagation();

    setValidated(true);

    const newErrors = {
      password: {}
    };
    if (!password) {
      newErrors.password.emptyPassword = 'La contraseña es requerida';
    } else {
      if (password.length < 5) {
        newErrors.password.passwordLength = 'La contraseña debe tener al menos 5 caracteres';
      }
      const upperCaseRegex = new RegExp(/^(?=.*[A-Z])/);
      if (!upperCaseRegex.test(password)) {
        newErrors.password.passwordUpperCase = 'La contraseña debe contener al menos una letra mayúscula';
      }
      const lowerCaseRegex = new RegExp(/^(?=.*[a-z])/);
      if (!lowerCaseRegex.test(password)) {
        newErrors.password.passwordLowerCase = 'La contraseña debe contener al menos una letra minúscula';
      }
      const numberRegex = new RegExp(/^(?=.*[0-9])/);
      if (!numberRegex.test(password)) {
        newErrors.password.passwordNumber = 'La contraseña debe contener al menos un número';
      }
    }

    if (Object.keys(newErrors.password).length === 0) {
      delete newErrors.password;
    } else {
      isValid = false;
    }
    if (!isValid) {
      setErrors(newErrors);
      console.log('Inválido. Errores: ', newErrors);
      return;
    }
    doRegister();
  }

  const doRegister = () => {
    const credentials = {
      nombre,
      apellido,
      correo,
      password,
      telefono,
      direccion
    }

    postRegister(credentials)
      .then(() => navigate('/login'))
      .catch((err) => {
        if (err.response?.status === 400) {
          setErrors({ formError: err.response.data.message });
        }
      });
  }

  return (
    <ThemeProvider theme={theme}>
      {/* Agregamos Helmet para mejorar el SEO */}
      <Helmet>
        {/* Título único para la página de registro */}
        <title>Registro de Cuenta - Tools & Services</title>

        {/* Meta descripción que explica de manera concisa el propósito de la página */}
        <meta name="description" content="Formulario de registro para crear una cuenta en Tools & Services y acceder a herramientas y servicios exclusivos." />

        {/* Meta keywords (si fuera necesario) */}
        {/* <meta name="keywords" content="registro, herramientas, servicios, cuenta" /> */}
      </Helmet>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Crear Cuenta
          </Typography>
          {errors.formError && (
            <Typography color="error" variant="body2">
              {errors.formError}
            </Typography>
          )}
          <Box component="form" noValidate onSubmit={enviarDatos} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="nombre"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  error={!!errors.nombre}
                  helperText={errors.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="apellido"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                  error={!!errors.apellido}
                  helperText={errors.apellido}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="correo"
                  required
                  fullWidth
                  id="correo"
                  label="Correo"
                  type="email"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                  error={!!errors.correo}
                  helperText={errors.correo}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  required
                  fullWidth
                  id="password"
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={!!errors.password}
                  helperText={
                    errors.password && Object.values(errors.password).join(' ')
                  }
                />

              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="telefono"
                  required
                  fullWidth
                  id="telefono"
                  label="Teléfono"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  error={!!errors.telefono}
                  helperText={errors.telefono}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="direccion"
                  required
                  fullWidth
                  id="direccion"
                  label="Dirección"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
                  error={!!errors.direccion}
                  helperText={errors.direccion}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label" fullWidth>
                  Subir Foto de Perfil
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => setProfilePic(e.target.value)}
                  />
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* Enlace a la página de inicio de sesión */}
                <Link href="/login" style={{ textTransform: "none" }}>
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default RegisterForm;
