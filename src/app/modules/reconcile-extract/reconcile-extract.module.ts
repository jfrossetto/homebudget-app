import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReconcileExtractContainerComponent } from './reconcile-extract-container/reconcile-extract-container.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ReconcileExtractContainerComponent }
];


@NgModule({
  declarations: [
    ReconcileExtractContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ReconcileExtractModule { }
