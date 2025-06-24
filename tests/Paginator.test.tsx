import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Paginator from '../src/components/Paginator';

jest.mock('../src/env', () => ({
  VITE_POKEMON_URL: 'https://pokeapi.co/api/v2/pokemon',
  VITE_SPRITES_URL: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'
}));

const { screen, fireEvent } = require('@testing-library/react');

describe('Paginator', () => {
  it('muestra los botones de página', () => {
    render(<Paginator total={30} currentPage={1} onPageChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('llama a onPageChange al hacer click en un botón', () => {
    const onPageChange = jest.fn();
    render(<Paginator total={60} currentPage={1} onPageChange={onPageChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
