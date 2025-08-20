import styled from 'styled-components';
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { usePedidos } from '../context/PedidosContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DeliveryOptions = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
`;

const OptionButton = styled.button`
  flex: 1;
  padding: 1rem;
  background: ${props => props.active ? '#d32f2f' : '#f5f5f5'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  transition: all 0.3s;

  &:hover {
    background: ${props => props.active ? '#b71c1c' : '#e0e0e0'};
  }
`;

const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const ControlButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;

  &:hover {
    background-color: #b71c1c;
  }
`;

const RemoveButton = styled.button`
  background-color: transparent;
  color: #d32f2f;
  border: 1px solid #d32f2f;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 1rem;
  font-size: 0.8rem;

  &:hover {
    background-color: #ffebee;
  }
`;

const TotalContainer = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 8px;
  font-weight: bold;
  text-align: right;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1.3rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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
`;

export function Carrinho() {
  const { 
    cartItems, 
    total, 
    increaseQuantity, 
    decreaseQuantity, 
    removeItem,
    customerName,
    setCustomerName
  } = useCart();

  const { adicionarPedido } = usePedidos();
  
  const [mesaOuEndereco, setMesaOuEndereco] = useState('');
  const [tipoEntrega, setTipoEntrega] = useState(null);

  const navigate = useNavigate();

  const finalizarPedido = () => {
    if (cartItems.length === 0) {
      toast.error("Carrinho vazio!");
      return;
    }

    if (!tipoEntrega) {
      toast.error("Selecione o tipo de entrega!");
      return;
    }

    if (!customerName.trim()) {
      toast.error("Informe o nome do cliente!");
      return;
    }

    if (tipoEntrega === 'local' && !mesaOuEndereco.trim()) {
      toast.error("Informe o número da mesa!");
      return;
    }

    if (tipoEntrega === 'entrega' && !mesaOuEndereco.trim()) {
      toast.error("Informe o endereço de entrega!");
      return;
    }

    const novoPedido = {
      id: Date.now(),
      itens: [...cartItems],
      total,
      data: new Date().toISOString(),
      mesaOuEndereco,
      tipoEntrega,
      cliente: customerName, // Adiciona o nome do cliente no pedido
      entregueOuServido: false,
      status: "pendente"
    };

    adicionarPedido(novoPedido); // ← envia para a cozinha
    navigate('/pagamento');      // ← vai para página de pagamento
  };

  return (
    <Container>
      <Title>Seu Carrinho</Title>
      
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio</p>
      ) : (
        <>
          <Input
            type="text"
            placeholder="Nome do cliente"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          {cartItems.map((item) => (
            <CartItem key={item.name}>
              <ItemInfo>
                <h3>{item.name}</h3>
                <QuantityControls>
                  <ControlButton onClick={() => decreaseQuantity(item.name)}>-</ControlButton>
                  <span>{item.quantity}</span>
                  <ControlButton onClick={() => increaseQuantity(item.name)}>+</ControlButton>
                </QuantityControls>
                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
              </ItemInfo>
              <RemoveButton onClick={() => removeItem(item.name)}>
                Remover
              </RemoveButton>
            </CartItem>
          ))}

          <DeliveryOptions>
            <OptionButton 
              type="button"
              onClick={() => setTipoEntrega('local')}
              active={tipoEntrega === 'local'}
            >
              Consumir no Local
            </OptionButton>
            <OptionButton 
              type="button"
              onClick={() => setTipoEntrega('entrega')}
              active={tipoEntrega === 'entrega'}
            >
              Entrega
            </OptionButton>
          </DeliveryOptions>

          <Input
            type="text"
            placeholder={
              tipoEntrega === 'local' ? "Número da mesa" : 
              tipoEntrega === 'entrega' ? "Endereço de entrega" : 
              "Selecione o tipo de entrega"
            }
            value={mesaOuEndereco}
            onChange={(e) => setMesaOuEndereco(e.target.value)}
            disabled={!tipoEntrega}
          />

          <TotalContainer>
            <p>Total: R$ {total.toFixed(2)}</p>
          </TotalContainer>

          <Button onClick={finalizarPedido}>Finalizar Pedido</Button>
        </>
      )}
    </Container>
  );
}

