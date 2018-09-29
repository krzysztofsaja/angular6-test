import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterViewComponent } from '@app/views/sign-up/register-view/register-view.component';
import { RegistrationListComponent } from '@app/views/sign-up/registration-list/registration-list.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterViewComponent,
    data: { title: 'anms.menu.register' }
  },
  {
    path: 'registration-list',
    component: RegistrationListComponent,
    data: { title: 'anms.menu.table' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewsRoutingModule {}
