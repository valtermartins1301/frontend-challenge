import React from 'react';
import { render, screen } from '@testing-library/react';
import { CharactersByPlanet } from '../CharactersByPlanet';
import useSWR from 'swr';

jest.mock('swr');
jest.mock('../../Character/Character', () => ({
  ...jest.requireActual('../../Character/Character'),
  LoadCharacter: () => <h1>character info</h1>,
}));

const useSWRMock = useSWR as jest.Mock;

describe('CharactersByPlanet', () => {
  it('renders loading state while data is fetching', async () => {
    useSWRMock.mockReturnValueOnce({ data: undefined, isLoading: true, isError: false });

    render(<CharactersByPlanet planet="Tatooine" />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders list of characters when data is successfully fetched', async () => {
    const mockPlanetData = {
      name: 'Tatooine',
      residents: ['https://swapi.dev/api/people/1/', 'https://swapi.dev/api/people/2/'],
    };

    useSWRMock.mockReturnValueOnce({
      data: { results: [mockPlanetData] },
      isLoading: false,
    });

    render(<CharactersByPlanet planet="Tatooine" />);

    expect(screen.getByText('Tatooine Characters')).toBeInTheDocument();
    expect(screen.getAllByText('character info')).toHaveLength(2);
  });

  it('renders "No residents" message if planet has no residents', async () => {
    const mockPlanetData = {
      name: 'Tatooine',
      residents: [],
    };

    useSWRMock.mockReturnValueOnce({
      data: { results: [mockPlanetData] },
      isLoading: false,
      isError: false,
    });

    render(<CharactersByPlanet planet="Tatooine" />);

    expect(screen.getByText('No residents')).toBeInTheDocument();
  });
});
