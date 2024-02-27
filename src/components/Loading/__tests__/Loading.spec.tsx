import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from '../Loading';

describe('<Loading />', () => {
  it('renders loading element', () => {
    render(<Loading />);

    const loading = screen.getByTestId('loading');
    expect(loading).toBeInTheDocument();
  });
});
