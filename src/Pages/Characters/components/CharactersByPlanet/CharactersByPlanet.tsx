// import useSWR from 'swr';
import React from 'react';
import { Typography } from '../../../../Components/Typography/Typography';
import { Loading } from '../../../../Components/Loading/Loading';
import { default as S } from './styles.module.css';
import { LoadCharacter } from '../Character/Character';
import useSWR from 'swr';
import { Planet } from '../../../../types/planet';
import { fetcher } from '../../../../API/fetcher';

export const CharactersByPlanet = ({ planet }: { planet: string }) => {
  const { data: planetApiResponse, isLoading } = useSWR(
    `https://swapi.dev/api/planets/?search=${planet}`,
    fetcher,
  );

  if (isLoading) return <Loading />;

  const planetResult: Planet = planetApiResponse?.results?.[0];

  return (
    <section className={S.listContainer}>
      <Typography className={S.listHeader} variant="h2">
        {planet} Characters
      </Typography>

      {isLoading ? (
        <Loading />
      ) : (
        <div className={S.contents}>
          {planetResult?.residents.length ? (
            planetResult?.residents.map((resident: string) => (
              <LoadCharacter key={resident} url={resident} />
            ))
          ) : (
            <Typography className={S.listHeader} variant="h2">
              No residents
            </Typography>
          )}
        </div>
      )}
    </section>
  );
};
