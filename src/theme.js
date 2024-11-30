
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ff6f00', // Naranja vibrante
    },
    secondary: {
      main: '#37474f', // Gris oscuro
    },
    background: {
      default: '#f5f5f5', // Fondo claro
    },
    text: {
      primary: '#37474f', // Texto principal gris oscuro
      secondary: '#757575', // Texto secundario gris
    },
  },
});

export default theme;
