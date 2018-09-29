import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  SignUpMap,
  SignUpPayload,
  SignUpStatus,
  State
} from '@app/views/sign-up/sign-up.model';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, Subscription } from 'rxjs';
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';
import { RejectConfirmationComponent } from '@app/views/sign-up/registration-list/reject-confirmation/reject-confirmation.component';
import {
  ActionAcceptSignUp,
  ActionRejectSignUp
} from '@app/views/sign-up/sign-up.actions';
import { map } from 'rxjs/operators';
import { AcceptConfirmationComponent } from '@app/views/sign-up/registration-list/accept-confirmation/accept-confirmation.component';
import {
  selectIsPending,
  selectIsRejected,
  selectSearchTerm,
  selectShouldShowAccepted
} from '@app/views/sign-up/sign-up.selectors';

@Component({
  selector: 'anms-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit, OnDestroy {
  signUps$: Observable<SignUpMap>;
  dataSource = new MatTableDataSource<SignUpPayload>();
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'idNumber',
    'city',
    'actions'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSubscription: Subscription;

  constructor(private store: Store<State>, public dialog: MatDialog) {}

  ngOnInit() {
    this.signUps$ = this.store.pipe(select(state => state.signup.data));

    this.dataSubscription = combineLatest(
      this.signUps$.pipe(map(data => Object.values(data))),
      this.store.pipe(select(selectIsPending)),
      this.store.pipe(select(selectIsRejected)),
      this.store.pipe(select(selectShouldShowAccepted)),
      this.store.pipe(select(selectSearchTerm))
    )
      .pipe(
        map(
          ([signUps, showPending, showRejected, showAccepted, searchTerm]) => {
            return signUps
              .filter(element =>
                this.shouldShowSignUpWithStatus(
                  element,
                  showPending,
                  showRejected,
                  showAccepted
                )
              )
              .filter(element =>
                this.isSearchTermInSignUp(element, searchTerm)
              );
          }
        )
      )
      .subscribe((data: SignUpPayload[]) => {
        this.dataSource = new MatTableDataSource<SignUpPayload>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  onAccept(element: SignUpPayload) {
    this.openAcceptConfirmationDialog(element);
  }

  onReject(element: SignUpPayload) {
    this.openRejectConfirmationDialog(element);
  }

  private openAcceptConfirmationDialog(signUp: SignUpPayload): void {
    const dialogRef = this.dialog.open(AcceptConfirmationComponent, {
      data: signUp
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason) {
        this.store.dispatch(new ActionAcceptSignUp({ signUp }));
      }
    });
  }

  private openRejectConfirmationDialog(signUp: SignUpPayload): void {
    const dialogRef = this.dialog.open(RejectConfirmationComponent, {
      data: signUp
    });

    dialogRef.afterClosed().subscribe((reason: string) => {
      if (reason) {
        this.store.dispatch(new ActionRejectSignUp({ signUp, reason }));
      }
    });
  }

  private shouldShowSignUpWithStatus(
    element: SignUpPayload,
    showPending: boolean,
    showRejected: boolean,
    showAccepted: boolean
  ): boolean {
    let result = false;
    if (showPending) {
      result = result || element.status === SignUpStatus.PENDING;
    }
    if (showRejected) {
      result = result || element.status === SignUpStatus.REJECTED;
    }
    if (showAccepted) {
      result = result || element.status === SignUpStatus.ACCEPTED;
    }
    return result;
  }

  private isSearchTermInSignUp(signUp: SignUpPayload, term): boolean {
    const lowerTerm = term.toLowerCase();
    return (
      signUp.firstName.toLowerCase().includes(lowerTerm) ||
      signUp.lastName.toLowerCase().includes(lowerTerm) ||
      signUp.email.toLowerCase().includes(lowerTerm) ||
      signUp.idNumber.toLowerCase().includes(lowerTerm) ||
      signUp.city.toLowerCase().includes(lowerTerm)
    );
  }
}
