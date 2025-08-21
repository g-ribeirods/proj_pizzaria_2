import { useState, useContext } from 'react';
import styled from 'styled-components';
import { usePedidos } from '../context/PedidosContext';
import { StaffContext } from '../context/StaffContext';
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

const GorjetaContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  background: #fff3e0;
  border-radius: 6px;
  border-left: 4px solid #ff9800;
`;

const GorjetaOption = styled.label`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  cursor: pointer;
`;

const GorjetaInput = styled.input`
  margin-right: 0.5rem;
`;

const GorjetaText = styled.span`
  color: #333;
`;

const GorjetaValue = styled.span`
  font-weight: bold;
  color: #e65100;
  margin-left: 0.5rem;
`;

export function Entregas() {
  const { garcons = [], entregadores = [] } = useContext(StaffContext) || {};
  const { pedidosEntrega, marcarComoEntregueOuServido } = usePedidos();
  const [selecoes, setSelecoes] = useState({});
  const [gorjetas, setGorjetas] = useState({});

  const getStaffDisponivel = (tipoEntrega) => {
    return tipoEntrega === 'local' ? garcons : entregadores;
  };

  const handleSelecao = (pedidoId, staffId) => {
    setSelecoes(prev => ({ ...prev, [pedidoId]: staffId }));
  };

  const handleGorjeta = (pedidoId, comGorjeta) => {
    setGorjetas(prev => ({ ...prev, [pedidoId]: comGorjeta }));
  };

  const calcularTotalComGorjeta = (pedido) => {
    const gorjeta = gorjetas[pedido.id] ? pedido.total * 0.1 : 0;
    return pedido.total + gorjeta;
  };

  const handleFinalizar = (pedido) => {
    const staffId = selecoes[pedido.id];
    
    if (!staffId) {
      toast.error(`Selecione um ${pedido.tipoEntrega === 'local' ? 'garçom' : 'entregador'}!`);
      return;
    }

    const comGorjeta = gorjetas[pedido.id] || false;
    const valorGorjeta = comGorjeta ? pedido.total * 0.1 : 0;
    const totalComGorjeta = pedido.total + valorGorjeta;

    marcarComoEntregueOuServido({
      ...pedido,
      staffResponsavel: staffId,
      comGorjeta,
      valorGorjeta,
      totalComGorjeta,
      entregueOuServido: true,
      status: "finalizado"
    });

    toast.success(
      pedido.tipoEntrega === 'local' 
        ? `Servido! ${comGorjeta ? '(+10% de gorjeta)' : ''}` 
        : `Entregue! ${comGorjeta ? '(+10% de gorjeta)' : ''}`
    );
    
    setSelecoes(prev => ({ ...prev, [pedido.id]: undefined }));
    setGorjetas(prev => ({ ...prev, [pedido.id]: undefined }));
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

            {/* TIPO E LOCAL - SEÇÃO QUE ESTAVA FALTANDO */}
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

            {/* SEÇÃO DE GORJETA (só para consumo local) */}
            {!pedido.entregueOuServido && pedido.tipoEntrega === 'local' && (
              <GorjetaContainer>
                <StaffLabel>Gorjeta (10%):</StaffLabel>
                <GorjetaOption>
                  <GorjetaInput
                    type="radio"
                    name={`gorjeta-${pedido.id}`}
                    checked={gorjetas[pedido.id] === true}
                    onChange={() => handleGorjeta(pedido.id, true)}
                  />
                  <GorjetaText>Sim, incluir 10% de gorjeta</GorjetaText>
                  <GorjetaValue>(+ R$ {(pedido.total * 0.1).toFixed(2)})</GorjetaValue>
                </GorjetaOption>
                
                <GorjetaOption>
                  <GorjetaInput
                    type="radio"
                    name={`gorjeta-${pedido.id}`}
                    checked={gorjetas[pedido.id] === false}
                    onChange={() => handleGorjeta(pedido.id, false)}
                  />
                  <GorjetaText>Não, obrigado</GorjetaText>
                </GorjetaOption>

                {gorjetas[pedido.id] && (
                  <InfoRow style={{ marginTop: '0.5rem' }}>
                    <InfoLabel>Total com gorjeta:</InfoLabel>
                    <InfoValue style={{ color: '#e65100', fontWeight: 'bold' }}>
                      R$ {calcularTotalComGorjeta(pedido).toFixed(2)}
                    </InfoValue>
                  </InfoRow>
                )}
              </GorjetaContainer>
            )}

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