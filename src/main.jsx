import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Homepage from './pages/HomePage';
import LoginForm from './pages/auth/LoginForm';
import RegisterForm from './pages/auth/RegisterForm';
import ToolsCategoriesPage from './pages/tools/categorias/ToolsCategoriesPage';
import HerramientasPorCategoriaPage from './pages/tools/items/HerramientasPorCategoriaPage';
import DetalleHerramientaPage from './pages/tools/items/DetalleHerramientaPage';
import ServiciosPorCategoriaPage from './pages/tools/items/ServiciosPorCategoriaPage';
import ServicesCategoriasPage from './pages/tools/categorias/ServicesCategoriesPage';
import DetalleServicioPage from './pages/tools/items/DetalleServicioPage';
import { CartProvider } from './components/CartContext';
import CarritoPage from './pages/pagos/CarritoPage';
import Success from './pages/pagos/Success';
import Cancel from './pages/pagos/Cancel';
import OfferPage from './pages/join/OfferPage';
import HistorialPage from './pages/profile/HistorialPage';

const router = createBrowserRouter([
  { path: '/home', element: <Homepage /> },
  { path: '/login', element: <LoginForm /> },
  { path: '/register', element: <RegisterForm /> },
  { path: '/herramientas', element: <ToolsCategoriesPage /> },
  { path: '/herramientas/:categoriaId', element: <HerramientasPorCategoriaPage /> },
  { path: '/herramientas/detail/:productoId', element: <DetalleHerramientaPage /> },
  { path: '/servicios', element: <ServicesCategoriasPage /> },
  { path: '/servicios/:categoriaId', element: <ServiciosPorCategoriaPage /> },
  { path: '/servicios/detail/:servicioId', element: <DetalleServicioPage /> },
  { path: '/carrito', element: <CarritoPage /> },
  { path: '/success', element: <Success /> },
  { path: '/cancel', element: <Cancel /> },
  { path: '/join', element: <OfferPage /> },
  { path: '/historial', element: <HistorialPage /> },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>,
);
