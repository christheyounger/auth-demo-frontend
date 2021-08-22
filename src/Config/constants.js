const authServer = "http://localhost:8080";

export const oauthConfig = {
  authServer,
  redirectUri: 'http://localhost:3000/login',
  authUrl: `${authServer}/oauth2/authorize`,
  tokenUrl: `${authServer}/oauth2/token`,
  verifyUrl: `${authServer}/oauth2/verify`,
  clientId: "brightepay-frontend",
  clientSecret: "secret",
  scopes: [
    'read:finance-accounts'
  ]
};
