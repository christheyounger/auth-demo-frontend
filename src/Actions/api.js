import Axios from "axios";

const getAuthHeader = (token) => ({ Authorization: `bearer ${token}` });

export const get = async (url, headers = {}) => Axios.get(url, { headers });

export const getWithToken = (url, token) => get(url, getAuthHeader(token));
