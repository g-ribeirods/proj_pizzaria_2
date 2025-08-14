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
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  background: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export function Entregas() {
  const { pedidosEntrega, marcarComoEntregueOuServido } = usePedidos();

  return (
    <Content>
      <Title>Entregas</Title>

      {pedidosEntrega.length === 0 ? (
        <p>Nenhuma entrega em andamento</p>
      ) : (
        pedidosEntrega.map((pedido, index) => (
          <PedidoCard key={index}>
            <p>
              <span
                style={{
                  color: pedido.entregueOuServido ? 'green' : 'red',
                  marginRight: '0.5rem',
                  fontWeight: 'bold',
                }}
              >
                ●
              </span>
              <strong>Data:</strong> {pedido.data}
            </p>

            <p><strong>Mesa/Endereço:</strong> {pedido.mesaOuEndereco}</p>

            {pedido.itens.map((item, i) => (
              <p key={i}>{item.quantity}x {item.name}</p>
            ))}

            {!pedido.entregueOuServido && (
              <>
                <Button onClick={() => marcarComoEntregueOuServido(pedido.id)}>
                  Servido/Entregue
                </Button>
              </>
            )}
          </PedidoCard>
        ))
      )}
    </Content>
  );
}
