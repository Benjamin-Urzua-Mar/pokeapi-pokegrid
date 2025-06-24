import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import LandingPage from '../src/pages/LandingPage';

const { screen } = require('@testing-library/react');

describe('LandingPage', () => {
  it('renderiza el texto de bienvenida', () => {
    render(<LandingPage />);
    expect(screen.getByText(/comenzar presiona start/i)).toBeInTheDocument();
  });
});
