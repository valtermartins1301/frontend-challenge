import { screen, render } from '@testing-library/react';
import useSWR from 'swr';
import { HomeWorld } from '../HomeWorld';

jest.mock('swr');

const useSWRMock = useSWR as jest.Mock;

describe('HomeWorld component', () => {
  const mockHomeWorldData = {
    name: 'Tatooine',
  };

  test('renders home world correctly', async () => {
    useSWRMock.mockReturnValueOnce({ data: mockHomeWorldData });

    render(<HomeWorld url="https://swapi.dev/api/planets/1/" />);

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
  });
});
