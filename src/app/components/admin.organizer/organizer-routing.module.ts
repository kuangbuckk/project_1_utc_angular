import { Ticket } from './../../model/ticket';
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { OrganizerComponent } from "./organizer.component";
import { EventOrganizerComponent } from "./event/event-organizer.component";
import { TicketCategoryOrganizerComponent } from './ticket-category/ticket-category-organizer.component';
import { TicketCategoryInsertOrganizerComponent } from './ticket-category/insert/ticket-category-insert-organizer.component';
import { TicketCategoryUpdateOrganizerComponent } from './ticket-category/update/ticket-category-update-organizer.component';
import { OrganizerGuard } from "../../guard/organization.guard";
import { EventsInsertOrganizerComponent } from './event/insert/events-insert-organizer.component';
import { DashboardOrganizerComponent } from './dashboard/dashboard-organizer.component';

const routes: Routes = [
    {
        path: 'organizer', 
        component: OrganizerComponent, 
        // canActivate: [OrganizerGuard],
        children: [
            {path: 'events', component: EventOrganizerComponent},
            {path: 'events/:id/ticketCategory', component: TicketCategoryOrganizerComponent},
            {path: 'dashboard', component: DashboardOrganizerComponent},

            //actions
            {path: 'events/insert', component: EventsInsertOrganizerComponent},
            {path: 'events/:id/ticketCategory/insert', component: TicketCategoryInsertOrganizerComponent},
            {path: 'events/:eventId/ticketCategory/update/:id', component: TicketCategoryUpdateOrganizerComponent}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class OrganizerRoutingModule {}
