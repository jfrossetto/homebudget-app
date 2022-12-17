import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlAccountsContainerComponent } from './control-accounts-container/control-accounts-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ControlAccountsContainerComponent }
];

@NgModule({
  declarations: [
    ControlAccountsContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)    
  ]
})
export class ControlAccountsModule { }
