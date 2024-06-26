import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParentComponentComponent } from '../parent-component/parent-component.component';

const routes: Routes = [
  {path:'',component:ParentComponentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParentModuleRoutingModule { }
