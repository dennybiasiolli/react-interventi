import { PuntoVendita } from '../../models/PuntoVendita';
import { InterventiActions, InterventiActionTypes } from './interventi-types';

export const setPuntiVenditaLoading = (
  value: boolean
): InterventiActionTypes => ({
  payload: value,
  type: InterventiActions.SET_PUNTI_VENDITA_LOADING,
});

export const setPuntiVendita = (
  puntiVendita: PuntoVendita[]
): InterventiActionTypes => ({
  payload: puntiVendita,
  type: InterventiActions.SET_PUNTI_VENDITA,
});
