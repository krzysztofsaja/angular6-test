import { SettingsState } from './settings.model';
import { SettingsActions, SettingsActionTypes } from './settings.actions';
import {
  SignUpPayload,
  SignUpState,
  SignUpStatus
} from '@app/views/sign-up/sign-up.model';
import {
  SignUpActions,
  SignUpActionTypes
} from '@app/views/sign-up/sign-up.actions';

const uuidv4 = require('uuid/v4');

export const initialState: SignUpState = {
  data: {},
  filter: {
    searchTerm: '',
    showAccepted: false,
    showPending: true,
    showRejected: false
  }
};

export function signUpReducer(
  state: SignUpState = initialState,
  action: SignUpActions
): SignUpState {
  switch (action.type) {
    case SignUpActionTypes.ADD_SIGN_UP:
      const id = uuidv4();

      const signUpPayload: SignUpPayload = {
        ...action.signUp,
        status: SignUpStatus.PENDING,
        id
      };
      return { ...state, ...{ data: { ...state.data, [id]: signUpPayload } } };

    case SignUpActionTypes.REJECT_SIGN_UP:
      return changeSingUpStatus(
        state,
        action.payload.signUp,
        SignUpStatus.REJECTED,
        action.payload.reason
      );

    case SignUpActionTypes.ACCEPT_SIGN_UP:
      return changeSingUpStatus(
        state,
        action.payload.signUp,
        SignUpStatus.ACCEPTED,
        null
      );
    case SignUpActionTypes.SHOW_ACCEPTED:
      return {
        ...state,
        ...{ filter: { ...state.filter, showAccepted: action.payload } }
      };
    case SignUpActionTypes.SHOW_REJECTED:
      return {
        ...state,
        ...{ filter: { ...state.filter, showRejected: action.payload } }
      };
    case SignUpActionTypes.SHOW_PENDING:
      return {
        ...state,
        ...{ filter: { ...state.filter, showPending: action.payload } }
      };
    case SignUpActionTypes.UPDATE_SEARCH_TERM:
      return {
        ...state,
        ...{ filter: { ...state.filter, searchTerm: action.payload } }
      };
    default:
      return state;
  }
}

function changeSingUpStatus(
  state: SignUpState,
  signUp: SignUpPayload,
  status: SignUpStatus,
  reason: string
): SignUpState {
  const data: SignUpPayload = {
    ...signUp,
    status,
    reason: reason || null
  };
  return {
    ...state,
    ...{ data: { ...state.data, [signUp.id]: data } }
  };
}
