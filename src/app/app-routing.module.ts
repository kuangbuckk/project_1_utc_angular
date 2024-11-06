import { Ticket } from './model/ticket';
import { Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DetailEventComponent } from "./components/detail-event/detail-event.component";
import { TicketOrderComponent } from "./components/ticket-order/ticket-order.component";
import { TicketOrderConfirmComponent } from "./components/ticket-order-confirm/ticket-order-confirm.component";
const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'event/:id', component: DetailEventComponent },
    {path: 'ticket-category/:id', component: TicketOrderComponent},
    {path: 'my-cart', component: TicketOrderConfirmComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
