import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  z-index: 1000;
`;

const CartTitle = styled.h3`
  margin-bottom: 1rem;
  color: #d32f2f;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

export function Cart() {
  const { cartItems } = useCart();

  return (
    <CartContainer>
      <CartTitle>Carrinho ({cartItems.reduce((total, item) => total + item.quantity, 0)})</CartTitle>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        cartItems.map((item) => (
          <CartItem key={item.name}>
            <span>{item.name} x {item.quantity}</span>
            <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
          </CartItem>
        ))
      )}
    </CartContainer>
  );
}