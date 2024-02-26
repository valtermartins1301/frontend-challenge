import React from 'react';
import { screen, render } from '@testing-library/react';
import Characters from '../Characters';
import useSWR from 'swr';

jest.mock('swr');
jest.mock('../components/HomeWorld/HomeWorld', () => ({
  HomeWorld: () => <div data-testid="mocked-home-world">Mocked HomeWorld</div>,
}));

const useSWRMock = useSWR as jest.Mock;
const mockPeopleApiResponse = {
  results: [
    {
      url: '1',
      name: 'Luke Skywalker',
      homeworld: 'Tatooine',
      height: '172',
      mass: '77',
      gender: 'male',
    },
    {
      url: '2',
      name: 'Leia Organa',
      homeworld: 'Alderaan',
      height: '150',
      mass: '49',
      gender: 'female',
    },
  ],
};

describe('Characters component', () => {
  it('renders correctly with loading state', () => {
    useSWRMock.mockReturnValueOnce({ data: null, isLoading: true });

    render(<Characters />);

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders correctly with characters list', () => {
    useSWRMock.mockReturnValueOnce({ data: mockPeopleApiResponse, isLoading: false });

    render(<Characters />);

    expect(screen.getByText('Star Wars Characters')).toBeInTheDocument();
    expect(
      screen.getByText(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Leia Organa')).toBeInTheDocument();
  });

  it('renders correctly filter options', () => {
    useSWRMock.mockReturnValueOnce({ data: mockPeopleApiResponse, isLoading: false });

    render(<Characters />);

    expect(screen.getByText('Filter By:')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByText('Naboo')).toBeInTheDocument();
  });
});
