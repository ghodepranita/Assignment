import { UsersListComponent } from './Pages/users-list/users-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserRegistrationFormComponent } from './Pages/user-registration-form/user-registration-form.component';
import { ParentComponentComponent } from './Pages/parent-component/parent-component.component';
import { ChildComponentComponent } from './Pages/child-component/child-component.component';

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
    path:'parent', component:ParentComponentComponent
  },
  {
    path:'child', component:ChildComponentComponent
  },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' },
  {
    path: '**', component: UsersListComponent
  },
  { path: 'parent', loadChildren: () => import('./Pages/parent-module/parent-module.module').then(m => m.ParentModuleModule) },
  { path: 'child', loadChildren: () => import('./Pages/child-module/child-module.module').then(m => m.ChildModuleModule) },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
