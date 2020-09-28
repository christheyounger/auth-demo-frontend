import Axios from "axios";
import { oauthConfig } from '../Config/constants';
const { tokenUrl } = oauthConfig;

const getToken = async (store, code) => {
    const { security: { state } } = store.state;
    const response = await Axios.post(tokenUrl, {code, state});
    const { data: { user, accessToken, refreshToken } } = response;
    const security = {
        user,
        accessToken,
        refreshToken,
        state,
        status: 'authenticated',
        error: null,
    }
    store.setState({ security })
}

export default {
    getToken
}