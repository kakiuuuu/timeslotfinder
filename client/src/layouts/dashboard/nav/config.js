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
  {
    title: 'Your Events',
    path: '/eventlist',
    icon: icon('ic_cart'),
  },
  {
    title: 'compare',
    path: '/compare',
    icon: icon('ic_analytics'),
  },
  {
    title: 'New Event',
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
