import { MAT_DIALOG_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { SignUpPayload } from '@app/views/sign-up/sign-up.model';

@Component({
  selector: 'reject-confirmation-dialog',
  templateUrl: 'reject-confirmation-dialog.component.html'
})
export class RejectConfirmationComponent {
  rejectionReason: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: SignUpPayload) {}
}
