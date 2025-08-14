import styled from 'styled-components';
import { ProductCarousel } from '../components/ProductCarousel';
import cardapioData from '../data/cardapio.json';
import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const Content = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
  text-align: center;
`;

export function Cardapio() {
  const { cardapio } = useContext(MenuContext);
  const { pizzas = [], bebidas = [], sobremesas = [], adicionais = [] } = cardapio;

  return (
    <Content>
      <Title>Cardápio</Title>
      <ProductCarousel title="Pizzas" items={pizzas} />
      <ProductCarousel title="Bebidas" items={bebidas} />
      <ProductCarousel title="Sobremesas" items={sobremesas} />
      <ProductCarousel title="Adicionais" items={adicionais} />
    </Content>
  );
}