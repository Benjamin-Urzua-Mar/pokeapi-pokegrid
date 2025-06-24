import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../src/components/Hero';

const { screen } = require('@testing-library/react');

describe('Hero', () => {
  it('renderiza el título principal', () => {
    render(<Hero />);
    expect(screen.getByText(/pinflag - pokeapi/i)).toBeInTheDocument();
  });
});
