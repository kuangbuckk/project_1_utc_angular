import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DetailEventComponent } from './components/detail-event/detail-event.component';
import { TicketOrderComponent } from './components/ticket-order/ticket-order.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { TicketOrderConfirmComponent } from './components/ticket-order-confirm/ticket-order-confirm.component';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminModule } from './components/admin/admin.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DetailEventComponent,
    TicketOrderComponent,
    LoginComponent,
    RegisterComponent,
    AppComponent,
    TicketOrderConfirmComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    { 
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true 
    },
    DatePipe
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
