import useSWR from 'swr';
import { Typography } from '../../../../Components/Typography/Typography';
import { default as S } from './styles.module.css';
import { fetcher } from '../../../../API/fetcher';
import { Planet } from '../../../../types/planet';

export const HomeWorld = ({ url }: { url: string }) => {
  const { data: homeWorldApiResponse } = useSWR(url, fetcher);
  const homeWorldData: Planet = homeWorldApiResponse;

  return (
    <Typography className={S.characterHomeworld} variant="h5">
      {homeWorldData?.name}
    </Typography>
  );
};
