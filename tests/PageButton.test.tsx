import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageButton from '../src/components/PageButton';

const { screen } = require('@testing-library/react');

describe('PageButton', () => {
  it('renderiza el número de página', () => {
    render(<PageButton pageNumber={1} onClick={() => {}} selected={true} />);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
