import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pokedex from '../src/components/Pokedex';

jest.mock('../src/env', () => ({
  VITE_POKEMON_URL: 'https://mocked-url.com',
  VITE_SPRITES_URL: 'https://mocked-sprites.com/',
}));

const { screen, fireEvent } = require('@testing-library/react');

const pokemon = {
  id: '25',
  name: 'pikachu',
  sprite: 'url',
};

describe('Pokedex', () => {
  it('muestra el nombre del pokemon', () => {
    render(<Pokedex pokemon={pokemon} handlePokedex={() => {}} />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  it('llama a handlePokedex al cerrar', () => {
    const handlePokedex = jest.fn();
    render(<Pokedex pokemon={pokemon} handlePokedex={handlePokedex} />);
    fireEvent.click(screen.getByRole('button'));
    expect(handlePokedex).toHaveBeenCalled();
  });
});
