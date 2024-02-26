import { screen, render, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';

describe('<FilterBar />', () => {
  it('renders options correctly', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const defaultFilter = 'Default Filter';

    render(<FilterBar options={options} defaultFilter={defaultFilter} />);

    const selectElement = screen.getByLabelText('Filter By:');
    expect(selectElement).toBeInTheDocument();

    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('calls onChange handler when option is selected', () => {
    const onChangeMock = jest.fn();
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const defaultFilter = 'Default Filter';

    render(<FilterBar options={options} defaultFilter={defaultFilter} onChange={onChangeMock} />);

    const selectElement = screen.getByLabelText('Filter By:');
    fireEvent.change(selectElement, { target: { value: 'Option 2' } });

    expect(onChangeMock).toHaveBeenCalledWith('Option 2');
  });

  it('updates state when option is selected', () => {
    const options = ['Option 1', 'Option 2', 'Option 3'];
    const defaultFilter = 'Default Filter';

    render(<FilterBar options={options} defaultFilter={defaultFilter} />);

    const selectElement = screen.getByLabelText('Filter By:');
    fireEvent.change(selectElement, { target: { value: 'Option 3' } });

    expect(selectElement).toHaveValue('Option 3');
  });
});
