import React, { useEffect, useContext } from "react";
import { handleAuthRedirect } from "realm-web";

export const Redirection= () => {

  useEffect(() => {
    handleAuthRedirect();
  }, []);

  return <h1 className="redirection">Signing in... Please Wait</h1>;
};