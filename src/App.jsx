import { AppRoutes } from './routes/AppRoutes';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { PedidosProvider } from './context/PedidosContext';
import { MenuProvider } from './context/MenuContext';
import { StaffProvider } from './context/StaffContext';

function App() {
  return (
    <StaffProvider>
    <MenuProvider>
    <AuthProvider>
      <CartProvider>
        <PedidosProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </PedidosProvider>
      </CartProvider>
    </AuthProvider>
    </MenuProvider>
    </StaffProvider>
  );
}

export default App;
