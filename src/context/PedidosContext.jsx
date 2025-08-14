import { createContext, useState, useEffect, useContext } from "react";

const PedidosContext = createContext();

export function PedidosProvider({ children }) {
  const [pedidos, setPedidos] = useState(() => {
    const saved = localStorage.getItem('pizzaria-pedidos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('pizzaria-pedidos', JSON.stringify(pedidos));
  }, [pedidos]);

  const pedidosPreparacao = pedidos.filter(pedido => 
    pedido.status === 'preparacao' && !pedido.entregueOuServido
  );

  const pedidosEntrega = pedidos.filter(pedido => 
    pedido.status === 'entrega' && !pedido.entregueOuServido
  );

  const adicionarPedido = (pedido) => {
    const novoPedido = {
      ...pedido,
      status: 'preparacao',
      id: Date.now(), 
      data: new Date().toLocaleString('pt-BR')
    };
    
    setPedidos(prev => [...prev, novoPedido]);
  };

  const marcarPedidoPronto = (id) => {
    setPedidos(prev =>
      prev.map(pedido =>
        pedido.id === id ? { ...pedido, status: 'entrega' } : pedido
      )
    );
  };

  const marcarComoEntregueOuServido = (id) => {
    setPedidos(prev =>
      prev.map(pedido =>
        pedido.id === id ? { ...pedido, entregueOuServido: true } : pedido
      )
    );
  };

  return (
    <PedidosContext.Provider
      value={{
        pedidos,
        pedidosPreparacao,
        pedidosEntrega,
        adicionarPedido,
        marcarPedidoPronto,
        marcarComoEntregueOuServido
      }}
    >
      {children}
    </PedidosContext.Provider>
  );
}

export function usePedidos() {
  const context = useContext(PedidosContext);
  if (!context) {
    throw new Error('usePedidos deve ser usado dentro de um PedidosProvider');
  }
  return context;
}