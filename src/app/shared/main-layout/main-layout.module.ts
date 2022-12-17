import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import { MainLayoutComponent } from './main-layout.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ShareModuleModule } from '../share-module/share-module.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LayoutHeaderComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ShareModuleModule,
    RouterModule
  ]
})
export class MainLayoutModule { }
