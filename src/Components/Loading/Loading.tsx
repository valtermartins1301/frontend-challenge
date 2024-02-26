import { default as S } from './styles.module.css';

export const Loading = () => (
  <div data-testid="loading" className={S.loadingContainer}>
    <span className={S.loader} />
  </div>
);
