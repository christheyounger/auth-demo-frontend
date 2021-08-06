import Axios from "axios";
import { oauthConfig } from "../Config/constants";
import { getWithToken } from "./api";
import { getQuotes } from "./quotes";
const { tokenUrl, clientId, clientSecret } = oauthConfig;

const getToken = async (store, code) => {
  const {
    security: { state },
  } = store.state;
  try {
    const body = new URLSearchParams()
    body.append('code', code);
    body.append('grant_type', 'authorization_code');
    const response = await Axios.post(tokenUrl, body, { auth: { username: clientId, password: clientSecret }});
    const {
      data: { access_token },
    } = response;
    const security = {
      access_token,
      state,
      status: "authenticated",
      error: null,
    };
    store.setState({ security });
  } catch (e) {
    const security = {
      user: null,
      accessToken: null,
      refreshToken: null,
      state,
      status: "authFailure",
      error: e.message,
    };
    store.setState({ security });
  }
};

const getProfile = async (token) => getWithToken(oauthConfig.verifyUrl, token);

export default {
  getToken,
  getProfile,
  getQuotes,
};
