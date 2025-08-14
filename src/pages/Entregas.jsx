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

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: bold;
  color: #555;
`;

const InfoValue = styled.span`
  color: #333;
`;

const StatusIndicator = styled.span`
  color: ${props => props.entregue ? 'green' : 'red'};
  margin-right: 0.5rem;
  font-weight: bold;
`;

const LocalBadge = styled.span`
  background: #d32f2f;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
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

  const handleMarcarComoEntregue = (pedidoId) => {
    marcarComoEntregueOuServido(pedidoId);
    toast.success(
      pedidosEntrega.find(p => p.id === pedidoId)?.tipoEntrega === 'local' 
        ? "Pedido servido com sucesso!" 
        : "Pedido entregue com sucesso!"
    );
  };

  return (
    <Content>
      <Title>Entregas</Title>

      {pedidosEntrega.length === 0 ? (
        <p>Nenhuma entrega em andamento</p>
      ) : (
        pedidosEntrega.map((pedido) => (
          <PedidoCard key={pedido.id}>
            <InfoRow>
              <div>
                <StatusIndicator entregue={pedido.entregueOuServido}>●</StatusIndicator>
                <InfoLabel>Status:</InfoLabel> 
                <InfoValue>
                  {pedido.entregueOuServido ? 
                    (pedido.tipoEntrega === 'local' ? 'Servido' : 'Entregue') : 
                    (pedido.tipoEntrega === 'local' ? 'Aguardando serviço' : 'Aguardando entrega')}
                </InfoValue>
              </div>
              <div>
                <InfoLabel>Data:</InfoLabel> 
                <InfoValue>{new Date(pedido.data).toLocaleString()}</InfoValue>
              </div>
            </InfoRow>

            <InfoRow>
              <div>
                <InfoLabel>Tipo:</InfoLabel> 
                <InfoValue>
                  {pedido.tipoEntrega === 'local' ? 'Consumo no Local' : 'Entrega'}
                </InfoValue>
              </div>
              <div>
                <InfoLabel>
                  {pedido.tipoEntrega === 'local' ? 'Mesa:' : 'Endereço:'}
                </InfoLabel> 
                <InfoValue>
                  {pedido.mesaOuEndereco}
                </InfoValue>
              </div>
            </InfoRow>

            <div>
              <InfoLabel>Itens:</InfoLabel>
              {pedido.itens.map((item, i) => (
                <div key={i}>
                  <InfoValue>{item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}</InfoValue>
                </div>
              ))}
            </div>

            <div>
              <InfoLabel>Total:</InfoLabel> 
              <InfoValue>R$ {pedido.total.toFixed(2)}</InfoValue>
            </div>

            {!pedido.entregueOuServido && (
              <Button onClick={() => handleMarcarComoEntregue(pedido.id)}>
                {pedido.tipoEntrega === 'local' ? 'Marcar como Servido' : 'Marcar como Entregue'}
              </Button>
            )}
          </PedidoCard>
        ))
      )}
    </Content>
  );
}