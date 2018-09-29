import { Injectable } from '@angular/core';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '@app/core';

import { ActionAddSignUp, SignUpActionTypes } from './sign-up.actions';
import { State } from '@app/views/sign-up/sign-up.model';

export const SIGN_UP_KEY = 'SIGNUP';

@Injectable()
export class SignUpEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private store: Store<State>
  ) {}

  @Effect({ dispatch: false })
  persistSignUp = this.actions$.pipe(
    ofType<ActionAddSignUp>(SignUpActionTypes.ADD_SIGN_UP),
    withLatestFrom(this.store),
    tap(([action, state]) => {
      this.localStorageService.setItem(SIGN_UP_KEY, state.signup);
    })
  );
}
