import { oauthConfig } from "../Config/constants";
import { getWithToken } from "./api";

export const getQuotes = (token) =>
  getWithToken(`${oauthConfig.authServer}/quotes`, token);
