import { NgModule } from '@angular/core';
import { RegistrationListComponent } from './sign-up/registration-list/registration-list.component';
import { ViewsRoutingModule } from '@app/views/views-routing.module';
import { SharedModule } from '@app/shared';
import { RegisterViewComponent } from '@app/views/sign-up/register-view/register-view.component';
import { RegisterFormComponent } from '@app/views/sign-up/register-view/register-form/register-form.component';
import { StoreModule } from '@ngrx/store';
import { signUpReducer } from '@app/views/sign-up/sign-up.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SignUpEffects } from '@app/views/sign-up/sign-up.effects';
import { RejectConfirmationComponent } from '@app/views/sign-up/registration-list/reject-confirmation/reject-confirmation.component';
import { AcceptConfirmationComponent } from '@app/views/sign-up/registration-list/accept-confirmation/accept-confirmation.component';
import { FiltersComponent } from '@app/views/sign-up/registration-list/filters/filters-component';

@NgModule({
  imports: [
    SharedModule,
    ViewsRoutingModule,
    StoreModule.forFeature('signup', signUpReducer),
    EffectsModule.forFeature([SignUpEffects])
  ],
  declarations: [
    RegisterViewComponent,
    RegistrationListComponent,
    RegisterFormComponent,
    RejectConfirmationComponent,
    AcceptConfirmationComponent,
    FiltersComponent
  ],
  entryComponents: [RejectConfirmationComponent, AcceptConfirmationComponent]
})
export class ViewsModule {}
