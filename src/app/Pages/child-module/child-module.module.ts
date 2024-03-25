import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildModuleRoutingModule } from './child-module-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ChildModuleRoutingModule
  ]
})
export class ChildModuleModule { }
