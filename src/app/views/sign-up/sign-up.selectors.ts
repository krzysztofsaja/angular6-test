import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SignUpState, State } from '@app/views/sign-up/sign-up.model';

export const selectSignUps = createFeatureSelector<State, SignUpState>(
  'signup'
);

export const selectSearchTerm = createSelector(
  selectSignUps,
  signup => signup.filter.searchTerm
);
export const selectShouldShowAccepted = createSelector(
  selectSignUps,
  signUp => signUp.filter.showAccepted
);

export const selectIsRejected = createSelector(
  selectSignUps,
  signUp => signUp.filter.showRejected
);
export const selectIsPending = createSelector(
  selectSignUps,
  signUp => signUp.filter.showPending
);
