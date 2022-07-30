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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
