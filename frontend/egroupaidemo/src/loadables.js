import Loadable from 'react-loadable';
import PageLoader from 'components/PageLoader';

export const Black = Loadable({
  loader: () => import('pages/Black'),
  loading: PageLoader
});

export const Home = Loadable({
  loader: () => import('pages/Home'),
  loading: PageLoader
});

export const Train = Loadable({
  loader: () => import('pages/Train'),
  loading: PageLoader
});

export const White = Loadable({
  loader: () => import('pages/White'),
  loading: PageLoader
});
