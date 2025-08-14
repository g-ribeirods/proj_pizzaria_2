import styled from 'styled-components';
import { useState } from 'react';
import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

const Content = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #d32f2f;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const Button = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #b71c1c;
  }
`;

export function Admin() {
  const context = useContext(MenuContext);
  
  if (!context) {
    console.error("MenuContext não está disponível!");
    return <div>Erro: Contexto não disponível</div>;
  }

  const { adicionarPizza } = context;
  const [novaPizza, setNovaPizza] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovaPizza(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const pizzaCompleta = {
    ...novaPizza,
    price: parseFloat(novaPizza.price)
  };
  adicionarPizza(pizzaCompleta);
  alert(`Pizza "${novaPizza.name}" adicionada com sucesso!`);
  
  setNovaPizza({
    name: '',
    description: '',
    price: '',
    image: ''
  });
};

  return (
    <Content>
      <Title>Painel Administrativo</Title>
      
      <Form onSubmit={handleSubmit}>
        <FormTitle>Adicionar Nova Pizza</FormTitle>
        
        <FormGroup>
          <Label htmlFor="name">Nome da Pizza:</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={novaPizza.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="description">Ingredientes:</Label>
          <TextArea
            id="description"
            name="description"
            value={novaPizza.description}
            onChange={handleChange}
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="price">Preço (R$):</Label>
          <Input
            type="number"
            id="price"
            name="price"
            value={novaPizza.price}
            onChange={handleChange}
            step="0.01"
            min="0"
            required
          />
        </FormGroup>
        
        <FormGroup>
          <Label htmlFor="image">URL da Imagem:</Label>
          <Input
            type="url"
            id="image"
            name="image"
            value={novaPizza.image}
            onChange={handleChange}
            placeholder="https://exemplo.com/imagem.jpg"
          />
        </FormGroup>
        
        <Button type="submit">Adicionar Pizza</Button>
      </Form>
    </Content>
  );
}