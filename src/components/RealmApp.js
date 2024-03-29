import React, { useEffect } from "react";
import * as Realm from "realm-web";

const baseUrl = process.env.REACT_APP_REALM_BASE_URL;

function createRealmApp(id) {
  return new Realm.App({ id, baseUrl });
}

const RealmAppContext = React.createContext(null);

export function RealmAppProvider({ appId, children }) {
  const [loadedGapi, setLoadedGapi] = React.useState(false)

  useEffect(() => {
    console.log('realmApp.currentUser>>>>>>', realmApp.currentUser)
    if (!realmApp.currentUser) {
      logInApiKey(process.env.REACT_APP_REALM_API_KEY)
      console.log("loginnnnnn!")
    }
  }, [])
  // Store Realm.App in React state. If appId changes, all children will rerender and use the new realmApp.
  const [realmApp, setRealmApp] = React.useState(createRealmApp(appId));
  React.useEffect(() => {
    setRealmApp(createRealmApp(appId));
  }, [appId]);

  // Store the app's current user in state and wrap the built-in auth functions to modify this state
  const [currentUser, setCurrentUser] = React.useState(realmApp.currentUser);
  console.log('currentUser>>>>>>', currentUser)
  // Wrap the base logIn function to save the logged in user in state
  const logIn = React.useCallback(
    async (credentials) => {
      await realmApp.logIn(credentials);
      setCurrentUser(realmApp.currentUser);
    },
    [realmApp]
  );


  const logInApiKey = async (apiKey) => {
    const credentials = Realm.Credentials.apiKey(apiKey);
    await realmApp.logIn(credentials);
    setCurrentUser(realmApp.currentUser);
  };

  const logInGoogle = React.useCallback(async (token) => {
    if (token) {
      const credentials = Realm.Credentials.google({ idToken: token });
      await realmApp.logIn(credentials);
      setCurrentUser(realmApp.currentUser);
      return
    }
    const credentials = Realm.Credentials.google({ redirectUrl: 'http://localhost:3000/redirect' });
    await realmApp.logIn(credentials);
    setCurrentUser(realmApp.currentUser);
  });

  // Wrap the current user's logOut function to remove the logged out user from state
  const logOut = React.useCallback(async () => {
    try {
      const user = realmApp.currentUser;
      await user?.logOut();
      await realmApp.removeUser(user);
    } catch (err) {
      console.error(err);
    }
    // In this App there will only be one logged in user at a time, so
    // the new current user will be null. If you add support for
    // multiple simultaneous user logins, this updates to another logged
    // in account if one exists.
    setCurrentUser(realmApp.currentUser);
  }, [realmApp]);

  // Override the App's currentUser & logIn properties + include the app-level logout function
  const realmAppContext = React.useMemo(() => {
    return { ...realmApp, currentUser, logIn, logOut, logInGoogle, loadedGapi };
  }, [realmApp, currentUser, logIn, logOut, logInGoogle, loadedGapi]);

  return (
    <RealmAppContext.Provider value={realmAppContext}>
      {children}
    </RealmAppContext.Provider>
  );
}

export function useRealmApp() {
  const realmApp = React.useContext(RealmAppContext);
  if (!realmApp) {
    throw new Error(
      `No Realm App found. Make sure to call useRealmApp() inside of a <RealmAppProvider />.`
    );
  }
  return realmApp;
}
