import React from 'react';
import useSWR from 'swr';
import { Typography } from '../../../../components/Typography/Typography';
import { Loading } from '../../../../components/Loading/Loading';
import { default as S } from './styles.module.css';
import { HomeWorld } from '../HomeWorld/HomeWorld';
import { People } from '../../../../types/people';
import { fetcher } from '../../../../api/fetcher';

interface CharacterProps {
  character: People;
  isLoading?: boolean;
}

export const Character: React.FC<CharacterProps> = ({ character, isLoading = false }) => {
  return (
    <article className={S.article}>
      <div className={S.containerPeople}>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <img
              className={S.characterPhoto}
              src={`https://picsum.photos/432/230?random=${character.url}`}
              alt="character image"
            />
            <div className={S.characterHeader}>
              <Typography className={S.characterName} variant="h4">
                {character.name}
              </Typography>
              <HomeWorld url={character.homeworld} />
            </div>
            <div className={S.characterInfo}>
              <Typography variant="body">HEIGHT • {character.height}</Typography>
              <Typography variant="body">MASS • {character.mass}</Typography>
              <Typography variant="body">GENDER • {character.gender}</Typography>
            </div>
          </>
        )}
      </div>
    </article>
  );
};

export const LoadCharacter = ({ url }: { url: string }) => {
  const { data: characterResult, isLoading } = useSWR(url, fetcher);

  return <Character character={characterResult} isLoading={isLoading} />;
};
