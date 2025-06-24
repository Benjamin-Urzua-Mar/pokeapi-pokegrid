import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokeGridPage from '../src/pages/PokeGridPage';
import { FavoritesProvider } from '../src/contexts/FavoritesContext';

const { screen } = require('@testing-library/react');

jest.mock('../src/env', () => ({
  VITE_POKEMON_URL: 'https://mocked-url.com',
  VITE_SPRITES_URL: 'https://mocked-sprites.com/',
}));

describe('PokeGridPage', () => {
  it('renderiza el botón Ir al final', async () => {
    await act(async () => {
      render(
        <FavoritesProvider>
          <PokeGridPage />
        </FavoritesProvider>
      );
    });
    expect(screen.getByText(/ir al final/i)).toBeInTheDocument();
  });

  it('renderiza el input de búsqueda', async () => {
    await act(async () => {
      render(
        <FavoritesProvider>
          <PokeGridPage />
        </FavoritesProvider>
      );
    });
    expect(screen.getByPlaceholderText(/escribe para filtrar/i)).toBeInTheDocument();
  });

  it('renderiza el checkbox de favoritos', async () => {
    await act(async () => {
      render(
        <FavoritesProvider>
          <PokeGridPage />
        </FavoritesProvider>
      );
    });
    expect(screen.getByLabelText(/mostrar favoritos/i)).toBeInTheDocument();
  });
});
