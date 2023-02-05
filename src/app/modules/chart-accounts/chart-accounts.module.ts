import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ChartAccountsContainerComponent } from './chart-accounts-container.component';
import { ChartAccountsUiComponent } from './chart-accounts-ui/chart-accounts-ui.component';
import { ChartAccountsListComponent } from './chart-accounts-list/chart-accounts-list.component';
import { ChartAccountsFormComponent } from './chart-accounts-form/chart-accounts-form.component';
import { AngularMaterialModule } from  '../../shared/angular-material/angular-material.module';
import { ShareModuleModule } from 'src/app/shared/share-module/share-module.module';

const routes: Routes = [
  { path: '', component: ChartAccountsContainerComponent }
];

@NgModule({
  declarations: [ChartAccountsContainerComponent, ChartAccountsUiComponent, ChartAccountsListComponent, ChartAccountsFormComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ShareModuleModule,
    RouterModule.forChild(routes)
  ]
})
export class ChartAccountsModule { }
