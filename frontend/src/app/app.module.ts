import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticationComponent } from './core/authentication/authentication.component';
import { HeaderComponent } from './components/header/header.component';

import { httpInterceptorProviders } from './http-interceptors';
import { MainlistComponent } from './components/mainlist/mainlist.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { AddTransactionComponent } from './components/add-transaction/add-transaction.component';
import { SigninComponent } from './pages/signin/signin.component';
import { DetailTransactionComponent } from './components/detail-transaction/detail-transaction.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { ChartsbarComponent } from './components/dashboard/charts/chartsbar/chartsbar.component';
import { ChartsdonutComponent } from './components/dashboard/charts/chartsdonut/chartsdonut.component';
import { ChartszoomableComponent } from './components/dashboard/charts/chartszoomable/chartszoomable.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { ChartsbalancesComponent } from './components/dashboard/charts/chartsbalances/chartsbalances.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AuthenticationComponent,
    HeaderComponent,
    MainlistComponent,
    TransactionComponent,
    AddTransactionComponent,
    SigninComponent,
    DetailTransactionComponent,
    ChartsComponent,
    ChartsbarComponent,
    ChartsdonutComponent,
    ChartszoomableComponent,
    ChartsbalancesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
