import { Action } from 'redux';

import { PuntoVendita } from '../../models/PuntoVendita';

export enum InterventiActions {
  SET_PUNTI_VENDITA_LOADING = 'SET_PUNTI_VENDITA_LOADING',
  SET_PUNTI_VENDITA = 'SET_PUNTI_VENDITA',
}

interface SetPuntiVenditaLoadingAction extends Action {
  type: InterventiActions.SET_PUNTI_VENDITA_LOADING;
  payload: boolean;
}

interface SetPuntiVenditaAction extends Action {
  type: InterventiActions.SET_PUNTI_VENDITA;
  payload: PuntoVendita[];
}

export type InterventiActionTypes =
  | SetPuntiVenditaLoadingAction
  | SetPuntiVenditaAction;
