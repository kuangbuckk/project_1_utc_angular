import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { DetailEventComponent } from "./components/detail-event/detail-event.component";
import { TicketOrderComponent } from "./components/ticket-order/ticket-order.component";
import { TicketOrderConfirmComponent } from "./components/ticket-order-confirm/ticket-order-confirm.component";
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'event/:id', component: DetailEventComponent },
    {path: 'ticket-category/:id', component: TicketOrderComponent, canActivate: [UserGuard]},
    {path: 'my-cart', component: TicketOrderConfirmComponent, canActivate: [UserGuard]},
    //Admin
    {
        path: 'admin', 
        component: AdminComponent, 
        canActivate: [AdminGuard]
    },
   
    //404 - Not found
    {path: '404-not-found', component: PageNotFoundComponent}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        CommonModule
      ],
      exports: [RouterModule]
})
export class AppRoutingModule {}
