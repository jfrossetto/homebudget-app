import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadExtractContainerComponent } from './upload-extract-container/upload-extract-container.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: UploadExtractContainerComponent }
];

@NgModule({
  declarations: [
    UploadExtractContainerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UploadExtractModule { }
