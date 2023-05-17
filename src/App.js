import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './redux/store';
import { RealmAppProvider, useRealmApp } from "./components/RealmApp";

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components

import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <ThemeProvider>
              <RealmAppProvider appId={process.env.REACT_APP_APPID}>
                <ScrollToTop />
                {/* <StyledChart /> */}
                <Router />
              </RealmAppProvider>
            </ThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </HelmetProvider>
  );
}
