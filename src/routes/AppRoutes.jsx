import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Cardapio } from '../pages/Cardapio';
import { Carrinho } from '../pages/Carrinho';
import { Cozinha } from '../pages/Cozinha';
import { Entregas } from '../pages/Entregas';
import { Admin } from '../pages/Admin';
import { NotFound } from '../pages/NotFound';
import { ProtectedRoute } from './ProtectedRoute';
import { AdminLayout } from '../components/AdminLayout';
import { Pagamento } from '../pages/Pagamento'; 


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      <Route path="/login" element={<Login />} />
      
      <Route element={<ProtectedRoute allowedRoles={['admin', 'cliente']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/carrinho" element={<Carrinho />} />
          
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/cozinha" element={<Cozinha />} />
            <Route path="/entregas" element={<Entregas />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/pagamento" element={<Pagamento />} /> 
          </Route>
        </Route>
      </Route>
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}