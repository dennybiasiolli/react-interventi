import { Action } from 'redux';

import { JwtToken } from '../../models/JwtToken';
import { UserInfo } from '../../models/UserInfo';

export enum AuthActions {
  SET_TOKEN = 'SET_TOKEN',
  SET_USER_INFO_LOADING = 'SET_USER_INFO_LOADING',
  SET_USER_INFO = 'SET_USER_INFO',
}

interface SetTokenAction extends Action {
  type: AuthActions.SET_TOKEN;
  payload?: JwtToken;
}

interface SetUserInfoLoadingAction extends Action {
  type: AuthActions.SET_USER_INFO_LOADING;
  payload: boolean;
}

interface SetUserInfoAction extends Action {
  type: AuthActions.SET_USER_INFO;
  payload?: UserInfo;
}

export type AuthActionTypes =
  | SetTokenAction
  | SetUserInfoLoadingAction
  | SetUserInfoAction;
