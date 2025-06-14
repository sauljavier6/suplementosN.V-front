import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from '../components/layouts/AppLayout';
import HomePage from '../pages/homepage/HomePage';
import ProductDetails from '../pages/productdetailspage/ProductDetailsPage';
import ProductsPage from '../pages/productspage/ProductsPage';

const AppRoutes= () => {

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} /> 
        <Route path="detalles/:id" element={<ProductDetails />} /> 
        <Route path="productos/:categoria" element={<ProductsPage />} /> 
        <Route path="productos/search/:busqueda" element={<ProductsPage />} /> 
      </Route>

      {/* Redirección */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default AppRoutes;
