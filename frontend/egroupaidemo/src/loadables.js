import Loadable from 'react-loadable';
import PageLoader from 'components/PageLoader';

export const BlackList = Loadable({
  loader: () => import('components/BlackList'),
  loading: PageLoader
});

export const Recognition = Loadable({
  loader: () => import('components/Recognition'),
  loading: PageLoader
});

export const Train = Loadable({
  loader: () => import('components/Train'),
  loading: PageLoader
});

export const WhiteList = Loadable({
  loader: () => import('components/WhiteList'),
  loading: PageLoader
});
