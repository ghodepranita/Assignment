import { UsersListComponent } from './Pages/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './Pages/user-registration-form/user-registration-form.component';

const routes: Routes = [
  {
    path: 'add-user', component: UserRegistrationFormComponent
  },
  {
    path: 'edit-user/:id', component: UserRegistrationFormComponent
  },
  {
    path: 'user-list', component: UsersListComponent
  },
  {
    path: '**', component: UsersListComponent
  },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
