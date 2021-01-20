import Axios from "axios";
import { oauthConfig } from "../Config/constants";
const { tokenUrl } = oauthConfig;

const getToken = async (store, code) => {
  const {
    security: { state },
  } = store.state;
  try {
    const response = await Axios.post(tokenUrl, { code, state });
    const {
      data: { user, accessToken, refreshToken },
    } = response;
    const security = {
      user,
      accessToken,
      refreshToken,
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

const getProfile = async (token) =>
  Axios.get(oauthConfig.verifyUrl, {
    headers: { Authorization: `bearer ${token}` },
  });

export default {
  getToken,
  getProfile,
};
