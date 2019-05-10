import { JwtToken } from '../../models/JwtToken';
import { UserInfo } from '../../models/UserInfo';
import { AuthActions, AuthActionTypes } from './auth-types';

export interface AuthState {
  jwtToken?: JwtToken;
  userInfo?: UserInfo;
  userInfoLoading: boolean;
}

const jsonwebtokenString = localStorage.getItem('jsonwebtoken');
const getInitialState = (): AuthState => ({
  jwtToken: jsonwebtokenString && JSON.parse(jsonwebtokenString),
  userInfo: undefined,
  userInfoLoading: true,
});

export function AuthReducer(
  state = getInitialState(),
  action: AuthActionTypes
): AuthState {
  switch (action.type) {
    case AuthActions.SET_TOKEN:
      if (action.payload) {
        localStorage.setItem('jsonwebtoken', JSON.stringify(action.payload));
      } else {
        localStorage.removeItem('jsonwebtoken');
      }
      return {
        ...state,
        jwtToken: action.payload,
      };
    case AuthActions.SET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
        userInfoLoading: false,
      };
    case AuthActions.SET_USER_INFO_LOADING:
      return {
        ...state,
        userInfoLoading: action.payload,
      };
  }
  return state;
}
