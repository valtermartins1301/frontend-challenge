import React from 'react';
import { Typography } from '../../../../Components/Typography/Typography';
import { Loading } from '../../../../Components/Loading/Loading';
import { default as S } from './styles.module.css';
import { People } from '../../../../types/people';
import { Character } from '../Character/Character';

interface CharacterListProps {
  characters: People[];
  isLoading: boolean;
  onLoadMore?: () => void;
}

export const CharacterList: React.FC<CharacterListProps> = ({
  characters,
  isLoading,
  onLoadMore,
}) => {
  return (
    <section className={S.listContainer}>
      <Typography className={S.listHeader} variant="h2">
        All Characters
      </Typography>

      {isLoading ? (
        <Loading />
      ) : (
        <div className={S.contents}>
          {characters.map((character) => (
            <Character key={character.url} character={character} />
          ))}
        </div>
      )}

      <div className={S.loadMoreContainer}>
        <button className={S.loadMoreButton} onClick={() => onLoadMore?.()}>
          <Typography className={S.loadMoreButtonText} variant="paragraph">
            LOAD MORE
          </Typography>
        </button>
      </div>
    </section>
  );
};
