import React from 'react';
import { render, screen } from '@testing-library/react';
import { Typography } from '../Typography';

describe('Typography component', () => {
  it('renders correctly with default variant and no className', () => {
    render(<Typography>Hello, World!</Typography>);

    const defaultParagraph = screen.getByText('Hello, World!');
    expect(defaultParagraph.tagName).toBe('P');
    expect(defaultParagraph).toHaveClass('typography');
    expect(defaultParagraph).toHaveClass('paragraph');
  });

  it('renders correctly with custom variant and className', () => {
    render(
      <Typography variant="h2" className="customClass">
        Heading
      </Typography>,
    );

    const customHeading = screen.getByText('Heading');
    expect(customHeading.tagName).toBe('H2');
    expect(customHeading).toHaveClass('typography');
    expect(customHeading).toHaveClass('h2');
    expect(customHeading).toHaveClass('customClass');
  });
});
