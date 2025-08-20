import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';
import { QRCodeCanvas } from "qrcode.react";

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

const QrContainer = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

export function Pagamento() {
  const { cartItems, total, finalizarPagamento, customerName, mesaOuEndereco } = useCart();
  const [showQr, setShowQr] = useState(false);

  const handleGerarQr = () => setShowQr(true);

  const handlePagamento = () => {
    alert('Pagamento realizado com sucesso!');
    finalizarPagamento();
    setShowQr(false);
  };

  return (
    <Container>
      <Title>Pagamento</Title>

      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <p><strong>Cliente:</strong> {customerName}</p>
          <p><strong>Local de entrega:</strong> {mesaOuEndereco}</p>

          {cartItems.map(item => (
            <Item key={item.name}>
              <span>{item.name} x {item.quantity}</span>
              <span>R$ {(item.price * item.quantity).toFixed(2)}</span>
            </Item>
          ))}

          <Total>Total: R$ {total.toFixed(2)}</Total>

          {!showQr ? (
            <Button onClick={handleGerarQr}>Gerar QR Code</Button>
          ) : (
            <>
              <QrContainer>
                <QRCodeCanvas value={`pix:chave?valor=${total}`} size={200} />
                <p>Escaneie para pagar</p>
              </QrContainer>
              <Button onClick={handlePagamento}>Confirmar Pagamento</Button>
            </>
          )}
        </>
      )}
    </Container>
  );
}
