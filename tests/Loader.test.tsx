import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loader from '../src/components/Loader';

const { screen } = require('@testing-library/react');

describe('Loader', () => {
  it('muestra el loader cuando isLoading es true', () => {
    render(<Loader isLoading={true} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('no muestra el loader cuando isLoading es false', () => {
    render(<Loader isLoading={false} />);
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });
});
