import styled from 'styled-components';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Cart } from './Cart'; 

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  margin-left: 250px;
  padding: 2rem;    
  max-width: calc(100vw - 250px); // Garante que não ultrapasse a largura disponível
  overflow-x: hidden; // Previne barras de rolagem horizontais
`;

export function AdminLayout() {
  return (
    <LayoutContainer>
      <Sidebar /> 
      <MainContent>
        <Outlet /> 
      </MainContent>
    </LayoutContainer>
  );
}