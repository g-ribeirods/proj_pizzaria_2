import { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [customerName, setCustomerName] = useState(''); // nome do cliente
  const [mesaOuEndereco, setMesaOuEndereco] = useState(''); // local/mesa

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.name === product.name);

      if (existingItem) {
        return prevItems.map(item =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const increaseQuantity = (productName) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === productName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productName) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.name === productName
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      )
    );
  };

  const removeItem = (productName) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.name !== productName)
    );
  };

  const clearCart = () => setCartItems([]);

  const finalizarPagamento = () => {
    setCartItems([]); // limpa o carrinho após pagamento
    setCustomerName('');
    setMesaOuEndereco('');
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      finalizarPagamento,
      total,
      customerName,
      setCustomerName,
      mesaOuEndereco,
      setMesaOuEndereco
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
