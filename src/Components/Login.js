import React, { useEffect } from "react";
import useGlobal from "../store";
import queryString from "query-string";
import { oauthConfig } from "../Config/constants";

function Login(props) {
  const [globalState, globalActions] = useGlobal();
  const params = queryString.parse(props.location.search);
  const { code } = params;
  const {
    security: { state, status, error },
  } = globalState;
  const { authUrl, clientId } = oauthConfig;

  useEffect(() => {
    if (code) {
      globalActions.getToken(code, state);
    } else {
      window.location.href = `${authUrl}?state=${state}&client_id=${clientId}&response_type=code`;
    }
  }, [authUrl, clientId, code, globalActions, state]);

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
