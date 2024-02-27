import React from 'react';
import { render, screen } from '@testing-library/react';
import { Character, LoadCharacter } from '../Character';
import { People } from '../../../../../types/people';
import useSWR from 'swr';

jest.mock('swr');
jest.mock('../../HomeWorld/HomeWorld', () => ({
  HomeWorld: () => <div data-testid="mocked-home-world">Mocked HomeWorld</div>,
}));

const useSWRMock = useSWR as jest.Mock;

const characterMock = {
  name: 'Luke Skywalker',
  homeworld: 'https://swapi.dev/api/planets/1/',
  height: '172',
  mass: '77',
  gender: 'male',
  url: 'https://swapi.dev/api/people/1/',
} as People;

describe('<Character />', () => {
  it('renders character details when not loading', () => {
    render(<Character character={characterMock} />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('HEIGHT • 172')).toBeInTheDocument();
    expect(screen.getByText('MASS • 77')).toBeInTheDocument();
    expect(screen.getByText('GENDER • male')).toBeInTheDocument();
    expect(screen.getByAltText('character image')).toBeInTheDocument();
  });

  it('renders loading spinner when loading', () => {
    render(<Character character={characterMock} isLoading={true} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });
});

describe('<LoadCharacter />', () => {
  it('renders character details when data is fetched', async () => {
    useSWRMock.mockReturnValueOnce({ data: characterMock, isLoading: false });

    render(<LoadCharacter url="https://swapi.dev/api/people/1/" />);

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('HEIGHT • 172')).toBeInTheDocument();
    expect(screen.getByText('MASS • 77')).toBeInTheDocument();
    expect(screen.getByText('GENDER • male')).toBeInTheDocument();
  });

  it('renders loading spinner while data is being fetched', () => {
    useSWRMock.mockReturnValueOnce({ data: characterMock, isLoading: true });

    const { getByTestId } = render(<LoadCharacter url="https://swapi.dev/api/people/1/" />);
    expect(getByTestId('loading')).toBeInTheDocument();
  });
});
