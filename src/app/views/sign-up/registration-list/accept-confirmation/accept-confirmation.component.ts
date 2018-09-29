import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { SignUpPayload } from '@app/views/sign-up/sign-up.model';

@Component({
  selector: 'accept-confirmation-dialog',
  templateUrl: 'accept-confirmation-dialog.component.html'
})
export class AcceptConfirmationComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: SignUpPayload) {}
}
