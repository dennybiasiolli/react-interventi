import { JwtToken } from '../../models/JwtToken';
import { UserInfo } from '../../models/UserInfo';
import { AuthActions, AuthActionTypes } from './auth-types';

export const setToken = (jwtToken: JwtToken | undefined): AuthActionTypes => ({
  payload: jwtToken,
  type: AuthActions.SET_TOKEN,
});

export const setUserInfoLoading = (value: boolean): AuthActionTypes => ({
  payload: value,
  type: AuthActions.SET_USER_INFO_LOADING,
});

export const setUserInfo = (
  userInfo: UserInfo | undefined
): AuthActionTypes => ({
  payload: userInfo,
  type: AuthActions.SET_USER_INFO,
});
