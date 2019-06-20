import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { AuthReducer } from './reducers/auth-reducer';
import { AuthActionTypes } from './reducers/auth-types';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = AuthActionTypes;

export const store = createStore<RootState, RootAction, {}, {}>(
  rootReducer,
  undefined,
  composeWithDevTools(),
);
