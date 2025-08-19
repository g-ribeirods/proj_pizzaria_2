import React from "react";
import styled from "styled-components";
import promocoes from "../data/promocoes.json"; // 👈 importando o JSON
import { useCart } from "../context/CartContext"; // 👈 importar o carrinho

const Container = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
`;

const CategoryTitle = styled.h2`
  margin: 2rem 0 1rem;
  color: #444;
`;

const PromoCard = styled.div`
  background: #fff8f8;
  border: 1px solid #f3c0c0;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0px 2px 6px rgba(0,0,0,0.1);

  h3 {
    margin: 0 0 0.5rem 0;
    color: #d32f2f;
  }

  p {
    margin: 0.3rem 0;
  }

  button {
    margin-top: 1rem;
    padding: 0.6rem 1rem;
    background: #d32f2f;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
`;

export function Promocoes() {
  const { addToCart } = useCart(); // 👈 para adicionar no carrinho

  return (
    <Container>
      <Title>Promoções</Title>

      {Object.entries(promocoes).map(([categoria, itens]) => (
        <div key={categoria}>
          <CategoryTitle>{categoria}</CategoryTitle>

          {itens.map((promo, index) => (
            <PromoCard key={index}>
              <h3>{promo.name}</h3>
              <p>{promo.description}</p>
              <p><strong>R$ {promo.price.toFixed(2)}</strong></p>
              <button onClick={() => addToCart(promo)}>
                Adicionar ao Carrinho
              </button>
            </PromoCard>
          ))}
        </div>
      ))}
    </Container>
  );
}
