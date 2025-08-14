import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const LoginForm = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  color: #d32f2f;
  text-align: center;
  margin-bottom: 2rem;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #d32f2f;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #d32f2f;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
`;

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

const handleSubmit = (e) => {
  e.preventDefault();

  if (!username || !password) {
    setError('Por favor, preencha todos os campos');
    return;
  }

  if (username === 'admin' && password === 'admin123') {
    login({ username, role: 'admin' });
    navigate('/admin');
    return;
  }

  if (username && password) {
    login({ username, role: 'cliente' });
    navigate('/cardapio');
  } else {
    setError('Credenciais inválidas');
  }
};

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Title>Pizzaria Delícia</Title>
        
        <InputGroup>
          <Label htmlFor="username">Usuário</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Digite seu usuário"
          />
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </InputGroup>
        
        <Button type="submit">Entrar</Button>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </LoginContainer>

  );
}
