import { PuntoVendita } from '../../models/PuntoVendita';
import { InterventiActions, InterventiActionTypes } from './interventi-types';

export interface InterventiState {
  puntiVendita: PuntoVendita[];
  puntiVenditaLoading: boolean;
}

const getInitialState = (): InterventiState => ({
  puntiVendita: [],
  puntiVenditaLoading: false,
});

export function InterventiReducer(
  state = getInitialState(),
  action: InterventiActionTypes
): InterventiState {
  switch (action.type) {
    case InterventiActions.SET_PUNTI_VENDITA_LOADING:
      return {
        ...state,
        puntiVenditaLoading: action.payload,
      };
    case InterventiActions.SET_PUNTI_VENDITA:
      return {
        ...state,
        puntiVendita: action.payload,
        puntiVenditaLoading: false,
      };
  }
  return state;
}
