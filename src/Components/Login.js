import React from 'react';
import useGlobal from "../store";
import queryString from 'query-string';
import { oauthConfig } from '../Config/constants';

function Login(props) {
    const [globalState, globalActions] = useGlobal();
    const params = queryString.parse(props.location.search);
    const { code } = params;
    const { security: { user, state }} = globalState;
    const { authUrl, clientId } = oauthConfig;
    if (user) {
      return (
        <div>Auth'd as: {user.username}</div>
      )
    } 
    
    if (code) {
      globalActions.getToken(code, state);
      return (
        <div>Authenticating...</div>
      )
    } else {
      window.location.href=`${authUrl}?state=${state}&clientId=${clientId}`;
      return (
        <div>Redirecting to your authentication provider</div>
      )
    }
}

export default Login;