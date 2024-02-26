// import useSWR from 'swr';
import useSWR from 'swr';
import { useState } from 'react';
import { Typography } from '../../Components/Typography/Typography';
import { default as S } from './styles.module.css';
import { CharacterList } from './components/CharacterList/CharacterList';
import { FilterBar } from '../../Components/FilterBar/FilterBar';
import { fetcher } from '../../API/fetcher';
import { CharactersByPlanet } from './components/CharactersByPlanet/CharactersByPlanet';

const PLANETS = [
  'Tatooine',
  'Coruscant',
  'Alderaan',
  'Dagobah',
  'Naboo',
  'Bespin',
  'Hoth',
  'Kashyyyk',
  'Yavin',
  'Mustafar',
  'Kamino',
  'Jakku',
  'Geonosis',
  'Polis Massa',
  'Corellia',
  'Nal Hutta',
  'Mandalore',
  'Mon Calamari',
  'Dantooine',
];

const DEFAULT_FILTER = 'All';

export default function Characters() {
  const [filter, setFilter] = useState<string>(DEFAULT_FILTER);
  const [page, setPage] = useState<number>(1);
  const { data: peopleApiResponse, isLoading } = useSWR(
    `https://swapi.dev/api/people/?page=${page}`,
    fetcher,
  );

  return (
    <main className={S.layout}>
      <div className={S.header}>
        <Typography variant="h1">Star Wars Characters</Typography>
        <Typography variant="paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </Typography>
      </div>

      <FilterBar defaultFilter={DEFAULT_FILTER} options={PLANETS} onChange={setFilter} />

      {filter === DEFAULT_FILTER ? (
        <CharacterList
          characters={peopleApiResponse?.results}
          isLoading={isLoading}
          onLoadMore={() => setPage(page + 1)}
        />
      ) : (
        <CharactersByPlanet planet={filter} />
      )}
    </main>
  );
}
