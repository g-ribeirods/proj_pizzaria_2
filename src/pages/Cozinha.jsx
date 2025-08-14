import styled from 'styled-components';
import { usePedidos } from '../context/PedidosContext';

const Content = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
`;

const PedidoCard = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  background: #f8f8f8;
  border-radius: 6px;
`;

const Button = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: green;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export function Cozinha() {
  const { pedidosPreparacao, marcarPedidoPronto } = usePedidos();

  return (
    <Content>
      <Title>Cozinha</Title>
      {pedidosPreparacao.length === 0 ? (
        <p>Nenhum pedido em preparação</p>
      ) : (
        pedidosPreparacao.map((pedido) => ( 
          <PedidoCard key={pedido.id}>
            <p><strong>Tipo:</strong> {pedido.tipoEntrega === 'local' ? 'Consumo no Local' : 'Entrega'}</p>
            <p><strong>Data:</strong> {pedido.data}</p>
            {pedido.itens.map((item, i) => (
              <p key={i}>{item.quantity}x {item.name}</p>
            ))}
            <p><strong>Total:</strong> R$ {pedido.total.toFixed(2)}</p>
            <Button onClick={() => marcarPedidoPronto(pedido.id)}>
              Pedido pronto
            </Button>
          </PedidoCard>
        ))
      )}
    </Content>
  );
}