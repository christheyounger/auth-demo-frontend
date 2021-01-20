import React from "react";
import useGlobal from "../store";
import queryString from "query-string";
import { oauthConfig } from "../Config/constants";

function Login(props) {
  const [globalState, globalActions] = useGlobal();
  const params = queryString.parse(props.location.search);
  const { code } = params;
  const {
    security: { user, state, status, error },
  } = globalState;
  const { authUrl, clientId } = oauthConfig;
  switch (status) {
    case "authFailure":
      if (!code) {
        window.location.href = "/login";
      }
      return <div class="alert alert-danger">Fail: {error}</div>;
    case "authenticated":
      return <div class="alert alert-success">Auth'd as: {user.username}</div>;
    default:
    //nothing
  }

  if (code) {
    globalActions.getToken(code, state);
    return <div>Authenticating...</div>;
  } else {
    window.location.href = `${authUrl}?state=${state}&clientId=${clientId}`;
    return <div>Redirecting to your authentication provider</div>;
  }
}

export default Login;
