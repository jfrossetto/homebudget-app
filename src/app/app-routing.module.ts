import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { MainLayoutComponent } from './shared/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '', component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'control-accounts', loadChildren: () => import('./modules/control-accounts/control-accounts.module').then(m => m.ControlAccountsModule) },
      { path: 'chart-accounts', loadChildren: () => import('./modules/chart-accounts/chart-accounts.module').then(m => m.ChartAccountsModule) },
      { path: 'upload-extract', loadChildren: () => import('./modules/upload-extract/upload-extract.module').then(m => m.UploadExtractModule) },
      { path: 'reconcile-extract', loadChildren: () => import('./modules/reconcile-extract/reconcile-extract.module').then(m => m.ReconcileExtractModule) }
    ]
  },
  // Not found
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
