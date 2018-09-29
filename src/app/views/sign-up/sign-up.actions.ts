import { Action } from '@ngrx/store';

import { SignUpPayload, SignUpState } from './sign-up.model';

export enum SignUpActionTypes {
  ADD_SIGN_UP = '[SignUp] Add Sign Up',
  ACCEPT_SIGN_UP = '[SignUp] Accept Sign Up',
  REJECT_SIGN_UP = '[SignUp] Reject Sign Up',
  UPDATE_SEARCH_TERM = '[SignUp] Update Search Term',
  SHOW_PENDING = '[SignUp] Show Pending',
  SHOW_ACCEPTED = '[SignUp] Show Accepted',
  SHOW_REJECTED = '[SignUp] Show rejected',
  PERSIST = '[SignUp] Persist'
}

export class ActionAddSignUp implements Action {
  readonly type = SignUpActionTypes.ADD_SIGN_UP;

  constructor(readonly signUp: SignUpPayload) {}
}

export class ActionSignUpPersist implements Action {
  readonly type = SignUpActionTypes.PERSIST;

  constructor(readonly payload: { signUp: SignUpState }) {}
}

export class ActionRejectSignUp implements Action {
  readonly type = SignUpActionTypes.REJECT_SIGN_UP;

  constructor(readonly payload: { signUp: SignUpPayload; reason: string }) {}
}
export class ActionAcceptSignUp implements Action {
  readonly type = SignUpActionTypes.ACCEPT_SIGN_UP;

  constructor(readonly payload: { signUp: SignUpPayload }) {}
}

export class ActionUpdateSignUpSearchTerm implements Action {
  readonly type = SignUpActionTypes.UPDATE_SEARCH_TERM;

  constructor(readonly payload: string) {}
}

export class ActionShowPending implements Action {
  readonly type = SignUpActionTypes.SHOW_PENDING;

  constructor(readonly payload: boolean) {}
}
export class ActionShowRejected implements Action {
  readonly type = SignUpActionTypes.SHOW_REJECTED;

  constructor(readonly payload: boolean) {}
}

export class ActionShowAccepted implements Action {
  readonly type = SignUpActionTypes.SHOW_ACCEPTED;

  constructor(readonly payload: boolean) {}
}
export type SignUpActions =
  | ActionAddSignUp
  | ActionRejectSignUp
  | ActionAcceptSignUp
  | ActionSignUpPersist
  | ActionUpdateSignUpSearchTerm
  | ActionShowPending
  | ActionShowRejected
  | ActionShowAccepted;
