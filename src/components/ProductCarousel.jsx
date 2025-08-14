import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CarouselContainer = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const SectionTitle = styled.h2`
  color: #d32f2f;
  margin-bottom: 1rem;
  padding-left: 1rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 1rem;
  margin: 0 10px; // Aumentei a margem lateral
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  height: 330px; // Aumentei a altura
  display: flex!important;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.div`
  height: 150px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 0.5rem;
  background-image: ${props => props.imgUrl ? `url(${props.imgUrl})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0;
  color: #333;
`;

const ProductPrice = styled.span`
  font-weight: bold;
  color: #d32f2f;
`;

const AddButton = styled.button`
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  width: 100%;

  &:hover {
    background-color: #b71c1c;
  }
`;

export function ProductCarousel({ title, items }) {
  const { addToCart } = useCart();

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success(`${item.name} adicionado ao carrinho!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: false,
    focusOnSelect: true,
    initialSlide: 0,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [
  
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <CarouselContainer>
      <SectionTitle>{title}</SectionTitle>
      <Slider {...settings}>
        {items.map((item, index) => (
          <ProductCard key={index}>
            <ProductImage imgUrl={item.image} />
            <ProductName>{item.name}</ProductName>
            <p>{item.description}</p>
            <div>
              <ProductPrice>R$ {item.price.toFixed(2)}</ProductPrice>
              <AddButton onClick={() => handleAddToCart(item)}>Adicionar</AddButton>
            </div>
          </ProductCard>
        ))}
      </Slider>
    </CarouselContainer>
  );
}