import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CharacterList } from '../CharacterList';
import { People } from '../../../../../types/people';

const mockCharacters = [
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
] as People[];

describe('<CharacterList />', () => {
  it('renders character list correctly', () => {
    const isLoading = false;

    render(<CharacterList characters={mockCharacters} isLoading={isLoading} />);

    expect(screen.getByText('All Characters')).toBeInTheDocument();

    mockCharacters.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
      expect(screen.getByText(`HEIGHT • ${character.height}`)).toBeInTheDocument();
      expect(screen.getByText(`MASS • ${character.mass}`)).toBeInTheDocument();
      expect(screen.getByText(`GENDER • ${character.gender}`)).toBeInTheDocument();
    });
  });

  it('renders "Load More" button correctly', () => {
    const isLoading = false;

    render(<CharacterList characters={[]} isLoading={isLoading} />);

    const loadMoreButton = screen.getByText('LOAD MORE');
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('calls onLoadMore function when "Load More" button is clicked', () => {
    const onLoadMoreMock = jest.fn();
    const isLoading = false;

    render(<CharacterList characters={[]} isLoading={isLoading} onLoadMore={onLoadMoreMock} />);

    const loadMoreButton = screen.getByText('LOAD MORE');
    userEvent.click(loadMoreButton);

    expect(onLoadMoreMock).toHaveBeenCalledTimes(1);
  });
});
