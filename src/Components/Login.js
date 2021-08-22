import React, { useEffect } from "react";
import useGlobal from "../store";
import queryString from "query-string";
import { oauthConfig } from "../Config/constants";

function Login(props) {
  const [globalState, globalActions] = useGlobal();
  const params = queryString.parse(props.location.search);
  const { code, error: oauthError, error_description, state: returnState } = params;
  const {
    security: { state, status, error },
  } = globalState;
  const { authUrl, clientId, scopes, redirectUri } = oauthConfig;

  useEffect(() => {
    if (code) {
      if (state === returnState) {
        globalActions.getToken(code, state);
      }
    } else if (!oauthError) {
      window.location.href = `${authUrl}?state=${state}&client_id=${clientId}&redirectUri=${redirectUri}&response_type=code&scope=${scopes.join(',')}`;
    }
  }, [authUrl, clientId, code, globalActions, state, returnState, oauthError, redirectUri, scopes]);

  if (oauthError) {
    return (
      <div class="alert alert-danger">Error: { oauthError }: { error_description }</div>
    )
  }

  switch (status) {
    case "authFailure":
      if (!code) {
        window.location.href = "/login";
      }
      return <div className="alert alert-danger">Fail: {error}</div>;
    case "authenticated":
      return (
        <div className="alert alert-success">Auth'd</div>
      );
    default:
        return "Authenticating"
  }

}

export default Login;
