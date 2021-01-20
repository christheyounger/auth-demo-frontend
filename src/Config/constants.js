const authServer = "http://localhost:8080";

export const oauthConfig = {
  authServer,
  authUrl: `${authServer}/authorize`,
  tokenUrl: `${authServer}/token`,
  verifyUrl: `${authServer}/verify`,
  clientId: "2",
};
