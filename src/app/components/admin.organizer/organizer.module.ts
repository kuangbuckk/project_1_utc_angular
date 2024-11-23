import { EventsInsertOrganizerComponent } from './event/insert/events-insert-organizer.component';
import { Ticket } from './../../model/ticket';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { OrganizerRoutingModule } from "./organizer-routing.module";
import { OrganizerComponent } from './organizer.component';
import { EventOrganizerComponent } from './event/event-organizer.component';
import { TicketCategoryOrganizerComponent } from './ticket-category/ticket-category-organizer.component';
import { BrowserModule } from '@angular/platform-browser';
import { TicketCategoryInsertOrganizerComponent } from './ticket-category/insert/ticket-category-insert-organizer.component';
import { TicketCategoryUpdateOrganizerComponent } from './ticket-category/update/ticket-category-update-organizer.component';

@NgModule({
    declarations: [
        OrganizerComponent,
        EventOrganizerComponent,
        EventsInsertOrganizerComponent,
        TicketCategoryOrganizerComponent,
        TicketCategoryInsertOrganizerComponent,
        TicketCategoryUpdateOrganizerComponent
    ],
    imports: [
        OrganizerRoutingModule,
        CommonModule,
        FormsModule,
        BrowserModule,
    ]
})

export class OrganizerModule {}