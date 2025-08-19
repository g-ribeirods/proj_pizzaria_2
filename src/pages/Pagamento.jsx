import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
`;

const Total = styled.h2`
  text-align: right;
  margin-top: 2rem;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.8rem 1.2rem;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export function Pagamento() {
  const { cartItems, total, clearCart } = useCart();

  const handlePagamento = () => {
    alert('Pagamento realizado com sucesso!');
    clearCart(); // limpa o carrinho após confirmar pagamento
  };

  return (
    <Container>
      <Title>Pagamento</Title>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          {cartItems.map(item => (
            <Item key={item.name}>
              <span>{item.name} x {item.quantity}</span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </Item>
          ))}

          <Total>Total: R$ {total.toFixed(2)}</Total>
          <Button onClick={handlePagamento}>Confirmar Pagamento</Button>
        </>
      )}
    </Container>
  );
}
