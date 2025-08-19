// src/pages/Pagamento.jsx
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #d32f2f;
`;

export function Pagamento() {
  return (
    <Container>
      <Title>Pagamento</Title>
      <p>Se você está vendo esta página, a rota está funcionando ✅</p>
    </Container>
  );
}
