import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { AuthReducer } from './reducers/auth-reducer';
import { AuthActionTypes } from './reducers/auth-types';
import { InterventiReducer } from './reducers/interventi-reducer';
import { InterventiActionTypes } from './reducers/interventi-types';

const rootReducer = combineReducers({
  auth: AuthReducer,
  interventi: InterventiReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type RootAction = AuthActionTypes | InterventiActionTypes;

export const store = createStore<RootState, RootAction, {}, {}>(
  rootReducer,
  undefined,
  composeWithDevTools(),
);
