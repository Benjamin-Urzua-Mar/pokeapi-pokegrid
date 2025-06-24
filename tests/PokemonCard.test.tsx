import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonCard from '../src/components/PokemonCard';

// Utilidad para obtener screen y fireEvent de la forma compatible
const { screen, fireEvent } = require('@testing-library/react');

describe('PokemonCard', () => {
  const baseProps = {
    id: '25',
    name: 'pikachu',
    sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
  };

  it('muestra el nombre y el id del pokemon', () => {
    render(<PokemonCard {...baseProps} />);
    expect(screen.getByText('#25 pikachu')).toBeInTheDocument();
  });

  it('muestra el corazón vacío si no es favorito', () => {
    render(<PokemonCard {...baseProps} isFavorite={false} onToggleFavorite={() => {}} />);
    expect(screen.getByText('♡')).toBeInTheDocument();
  });

  it('muestra el corazón lleno si es favorito', () => {
    render(<PokemonCard {...baseProps} isFavorite={true} onToggleFavorite={() => {}} />);
    expect(screen.getByText('♥')).toBeInTheDocument();
  });

  it('llama a onToggleFavorite al hacer click en el corazón', () => {
    const onToggleFavorite = jest.fn();
    render(<PokemonCard {...baseProps} isFavorite={false} onToggleFavorite={onToggleFavorite} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onToggleFavorite).toHaveBeenCalled();
  });

  it('no muestra el botón de favorito si no se pasa onToggleFavorite', () => {
    render(<PokemonCard {...baseProps} />);
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('llama a handlePokedex al hacer click en la tarjeta', () => {
    const handlePokedex = jest.fn();
    render(<PokemonCard {...baseProps} handlePokedex={handlePokedex} />);
    fireEvent.click(screen.getByText('#25 pikachu'));
    expect(handlePokedex).toHaveBeenCalled();
  });

  it('muestra la imagen alternativa si la imagen falla al cargar', () => {
    render(<PokemonCard {...baseProps} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);
    expect(img).toHaveAttribute('src', 'whosthatpokemon.jpeg');
  });
});
