import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SidebarContainer = styled.div`
  width: 250px;
  background-color: #d32f2f;
  color: white;
  height: 100vh;
  position: fixed;
  padding: 1rem;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  text-align: center;
  padding: 1rem 0;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  margin-bottom: 0.5rem;
`;

const MenuLink = styled(NavLink)`
  display: block;
  padding: 0.75rem 1rem;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &.active {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: bold;
  }
`;

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: auto;
  margin-bottom: 1rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <SidebarContainer>
      <Logo>Pizzaria {user?.role === 'admin' ? 'Admin' : ''}</Logo>
      <MenuList>
        <MenuItem>
          <MenuLink to="/cardapio">Cardápio</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/carrinho">Carrinho</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/pagamento">Pagamento</MenuLink>
        </MenuItem>
        <MenuItem>
          <MenuLink to="/promocoes">Promoções</MenuLink>
        </MenuItem>
        
        {user?.role === 'admin' && (
          <>
            <MenuItem>
              <MenuLink to="/cozinha">Cozinha</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/entregas">Entregas</MenuLink>
            </MenuItem>
            <MenuItem>
              <MenuLink to="/admin">Administrador</MenuLink>
            </MenuItem>
          </>
        )}
      </MenuList>
      
      <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
    </SidebarContainer>
  );
}