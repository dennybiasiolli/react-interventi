import axios, { AxiosRequestConfig } from 'axios';
import { decode as JwtDecode } from 'jsonwebtoken';

import { JwtToken } from '../models/JwtToken';
import { store } from '../store';
import { setToken, setUserInfo } from '../store/reducers/auth-actions';
import { refreshToken } from './rest';

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;

axios.interceptors.request.use((reqConfig: AxiosRequestConfig) => {
  const jwtToken = store.getState().auth.jwtToken;
  reqConfig.headers.Authorization = jwtToken && `Bearer ${jwtToken.access}`;
  return reqConfig;
});

let lastRetry: Date | undefined;
let fetchTokenTask: Promise<JwtToken | undefined> | undefined;

export function forceLogout() {
  store.dispatch(setUserInfo(undefined));
  store.dispatch(setToken(undefined));
  fetchTokenTask = undefined;
  lastRetry = undefined;
}

axios.interceptors.response.use(undefined, async err => {
  if (err.response.config.url.includes('/token/')) {
    throw err;
  }
  if (
    err.response.status === 401 ||
    (err.response.status === 403 &&
      err.response.data.code === 'token_not_valid')
  ) {
    // avoiding refresh loop
    if (lastRetry && new Date().getTime() - lastRetry.getTime() < 200) {
      throw forceLogout();
    }

    const jwtToken = store.getState().auth.jwtToken;

    if (!fetchTokenTask && jwtToken) {
      const isRefreshTokenExpired =
        (JwtDecode(jwtToken.refresh) as any).exp < Date.now() / 1000;
      if (isRefreshTokenExpired) {
        throw forceLogout();
      }

      fetchTokenTask = refreshToken(jwtToken.refresh);
    }
    const newJwtToken = await fetchTokenTask;
    if (newJwtToken) {
      store.dispatch(setToken(newJwtToken));
      lastRetry = new Date();
      return axios(err.config);
    }
    throw forceLogout();
  }
  throw err;
});
