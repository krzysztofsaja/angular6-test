import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import {
  selectShouldShowAccepted,
  selectIsPending,
  selectIsRejected
} from '@app/views/sign-up/sign-up.selectors';
import { AppState } from '@app/core';
import { select, Store } from '@ngrx/store';
import {
  ActionShowAccepted,
  ActionShowPending,
  ActionShowRejected,
  ActionUpdateSignUpSearchTerm
} from '@app/views/sign-up/sign-up.actions';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'filters-component',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.scss']
})
export class FiltersComponent implements OnInit, OnDestroy {
  searchTerm = '';
  searchTermSubject$ = new BehaviorSubject('');
  isPending$: Observable<boolean>;
  isRejected$: Observable<boolean>;
  isAccepted$: Observable<boolean>;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.isPending$ = this.store.pipe(select(selectIsPending));
    this.isRejected$ = this.store.pipe(select(selectIsRejected));
    this.isAccepted$ = this.store.pipe(select(selectShouldShowAccepted));

    this.subscriptions.push(
      this.searchTermSubject$
        .asObservable()
        .pipe(debounceTime(300))
        .subscribe(searchTerm =>
          this.store.dispatch(new ActionUpdateSignUpSearchTerm(searchTerm))
        )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  toggleIsRejected(event): void {
    this.store.dispatch(new ActionShowRejected(event.checked));
  }

  toggleIsAccepted(event): void {
    this.store.dispatch(new ActionShowAccepted(event.checked));
  }

  toggleIsPending(event): void {
    this.store.dispatch(new ActionShowPending(event.checked));
  }

  onSearch(value): void {
    this.searchTermSubject$.next(value);
  }
}
