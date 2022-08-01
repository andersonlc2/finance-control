import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/service/account/shared/auth.guard';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { MainlistComponent } from './components/mainlist/mainlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'transaction/:id', component: TransactionComponent },
      { path: 'transaction/:id/add', component: AddTransactionComponent }
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent }
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
