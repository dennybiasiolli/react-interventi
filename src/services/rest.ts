import axios from 'axios';

import { JwtToken } from '../models/JwtToken';
import { UserInfo } from '../models/UserInfo';
import { store } from '../store';
import {
  setToken,
  setUserInfo,
  setUserInfoLoading,
} from '../store/reducers/auth-actions';

export async function getUserInfo(): Promise<UserInfo | undefined> {
  try {
    store.dispatch(setUserInfoLoading(true));
    const { data } = await axios.get('/user-info/me/');
    store.dispatch(setUserInfo(data));
    return data;
  } catch {
    store.dispatch(setUserInfoLoading(false));
    return undefined;
  }
}

export async function login(
  username: string,
  password: string
): Promise<JwtToken | undefined> {
  try {
    const res = await axios.post('/token/', {
      password,
      username,
    });
    const jwtToken = res.data as JwtToken;
    store.dispatch(setToken(jwtToken));
    return jwtToken;
  } catch {
    return undefined;
  }
}

export async function refreshToken(
  refreshTokenStr: string
): Promise<JwtToken | undefined> {
  try {
    const res = await axios.post('/token/refresh/', {
      refresh: refreshTokenStr,
    });
    const jwtToken = res.data as JwtToken;
    store.dispatch(setToken(jwtToken));
    return jwtToken;
  } catch {
    return undefined;
  }
}
