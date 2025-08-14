import { useState, useContext } from 'react';
import styled from 'styled-components';
import { usePedidos } from '../context/PedidosContext';
import { StaffContext } from '../context/StaffContext'; // Verifique o caminho correto
import { toast } from 'react-toastify';

// Estilos corrigidos
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
  color: ${({ $entregue }) => ($entregue ? 'green' : 'red')}; // Corrigido para styled-components v6+
  margin-right: 0.5rem;
  font-weight: bold;
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

const StaffSelector = styled.select`
  width: 100%;
  padding: 0.75rem;
  margin: 1rem 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

const LocalBadge = styled.span`
  background: #d32f2f;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 0.5rem;
`;

const StaffSelectionContainer = styled.div`
  margin: 1rem 0;
`;

const StaffLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

const StaffSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
`;

export function Entregas() {
  const { garcons = [], entregadores = [] } = useContext(StaffContext) || {};
  const { pedidosEntrega, marcarComoEntregueOuServido } = usePedidos();
  const [selecoes, setSelecoes] = useState({});

  const getStaffDisponivel = (tipoEntrega) => {
    return tipoEntrega === 'local' ? garcons : entregadores;
  };

  const handleSelecao = (pedidoId, staffId) => {
    setSelecoes(prev => ({ ...prev, [pedidoId]: staffId }));
  };

  const handleFinalizar = (pedido) => {
    const staffId = selecoes[pedido.id];
    
    if (!staffId) {
      toast.error(`Selecione um ${pedido.tipoEntrega === 'local' ? 'garçom' : 'entregador'}!`);
      return;
    }

    marcarComoEntregueOuServido({
      ...pedido,
      staffResponsavel: staffId,
      entregueOuServido: true,
      status: "finalizado"
    });

    toast.success(pedido.tipoEntrega === 'local' ? 'Servido!' : 'Entregue!');
    setSelecoes(prev => ({ ...prev, [pedido.id]: undefined }));
  };

  return (
    <Content>
      <Title>Entregas</Title>

      {pedidosEntrega.length === 0 ? (
        <p>Nenhuma entrega em andamento</p>
      ) : (
        pedidosEntrega.map(pedido => (
          <PedidoCard key={pedido.id}>
            {/* Cabeçalho do pedido */}
            <InfoRow>
              <div>
                <StatusIndicator $entregue={pedido.entregueOuServido}>
                  ●
                </StatusIndicator>
                <InfoLabel>Pedido #:</InfoLabel>
                <InfoValue>{pedido.id}</InfoValue>
              </div>
              <div>
                <InfoLabel>Data:</InfoLabel>
                <InfoValue>{new Date(pedido.data).toLocaleString()}</InfoValue>
              </div>
            </InfoRow>

            {/* Tipo e Local */}
            <InfoRow>
              <div>
                <InfoLabel>Tipo:</InfoLabel>
                <InfoValue>
                  {pedido.tipoEntrega === 'local' ? 'Consumo no Local' : 'Entrega'}
                  {pedido.tipoEntrega === 'local' && (
                    <LocalBadge>Mesa: {pedido.mesaOuEndereco}</LocalBadge>
                  )}
                </InfoValue>
              </div>
              {pedido.tipoEntrega === 'entrega' && (
                <div>
                  <InfoLabel>Endereço:</InfoLabel>
                  <InfoValue>{pedido.mesaOuEndereco}</InfoValue>
                </div>
              )}
            </InfoRow>

            {/* Itens do pedido */}
            <div style={{ margin: '1rem 0' }}>
              <InfoLabel>Itens:</InfoLabel>
              {pedido.itens.map((item, i) => (
                <div key={i} style={{ margin: '0.5rem 0' }}>
                  <InfoValue>
                    {item.quantity}x {item.name} - R$ {(item.price * item.quantity).toFixed(2)}
                  </InfoValue>
                </div>
              ))}
            </div>

            {/* Total */}
            <InfoRow style={{ borderTop: '1px solid #eee', paddingTop: '0.5rem' }}>
              <InfoLabel>Total:</InfoLabel>
              <InfoValue style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                R$ {pedido.total.toFixed(2)}
              </InfoValue>
            </InfoRow>

            {/* Área de ação (só aparece se não entregue) */}
             {!pedido.entregueOuServido && (
              <StaffSelectionContainer>
                <StaffLabel>
                  {pedido.tipoEntrega === 'local' ? 'Atribuir Garçom:' : 'Atribuir Entregador:'}
                </StaffLabel>
                <StaffSelect
                  value={selecoes[pedido.id] || ''}
                  onChange={(e) => handleSelecao(pedido.id, e.target.value)}
                >
                  <option value="">Selecione...</option>
                  {getStaffDisponivel(pedido.tipoEntrega).map(pessoa => (
                    <option key={pessoa.id} value={pessoa.id}>
                      {pessoa.name}
                    </option>
                  ))}
                </StaffSelect>

                <Button onClick={() => handleFinalizar(pedido)}>
                  {pedido.tipoEntrega === 'local' ? 'Confirmar Serviço' : 'Confirmar Entrega'}
                </Button>
              </StaffSelectionContainer>
            )}

            {pedido.entregueOuServido && pedido.staffResponsavel && (
              <InfoRow>
                <InfoLabel>
                  {pedido.tipoEntrega === 'local' ? 'Garçom:' : 'Entregador:'}
                </InfoLabel>
                <InfoValue>
                  {getStaffDisponivel(pedido.tipoEntrega)
                    .find(s => s.id === pedido.staffResponsavel)?.name || 'Não informado'}
                </InfoValue>
              </InfoRow>
            )}
          </PedidoCard>
        ))
      )}
    </Content>
  );
}