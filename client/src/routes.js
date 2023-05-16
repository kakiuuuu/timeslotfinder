import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import ComparePage from './pages/ComparePage';
import EventDetail from './pages/EventDetail';
import EventResult from './pages/EventResult';
import { Redirection } from './pages/Redirection';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app" />, index: true },
        { path: 'app', element: <HomePage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'compare', element: <ComparePage /> },
        { path: 'event', element: <EventPage /> },
        { path: "event/:eventId", element: <EventDetail />},
        { path: "event/:eventId/result", element: <EventResult />}
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/Event" />, index: true },
        { path: 'redirect', element: <Redirection />},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
