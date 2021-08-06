const authServer = "http://localhost:8080";

export const oauthConfig = {
  authServer,
  authUrl: `${authServer}/oauth/authorize`,
  tokenUrl: `${authServer}/oauth/token`,
  verifyUrl: `${authServer}/oauth/verify`,
  clientId: "auth-frontend",
  clientSecret: "secret",
};
