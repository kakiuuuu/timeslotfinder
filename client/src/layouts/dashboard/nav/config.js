// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Home',
    path: '/app',
    icon: icon('ic_user'),
  },
  // {
  //   title: 'user',
  //   path: '/user',
  //   icon: icon('ic_user'),
  // },
  {
    title: 'compare',
    path: '/compare',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Event',
    path: '/event',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
