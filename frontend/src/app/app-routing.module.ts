import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/service/account/shared/auth.guard';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { MainlistComponent } from './components/mainlist/mainlist.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';
import { ChartsComponent } from './components/dashboard/charts/charts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: ChartsComponent, },
      { path: 'transaction/:id/:mes/:ano', component: TransactionComponent },
      { path: 'transaction/:id/add', component: AddTransactionComponent },
      { path: 'accounts/:accountId/transaction/:transactionId', component: DetailTransactionComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signin', component: SigninComponent }
    ]
  },
  {
    path: 'main-list',
    component: MainlistComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
