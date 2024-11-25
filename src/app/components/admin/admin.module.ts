import { Ticket } from './../../model/ticket';
import { NgModule } from "@angular/core";
import { AdminRoutingModule } from "./admin-routing.module";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { CategoriesAdminComponent } from "./categories/categories.admin.component";
import { CategoriesInsertAdminComponent } from "./categories/insert/categories-insert-admin.component";
import { FormsModule } from "@angular/forms";
import { CategoriesUpdateAdminComponent } from "./categories/update/categories-update-admin.component";
import { OrganizationsComponent } from "./organizations/organizations.component";
import { OrganizationInsertAdminComponent } from "./organizations/insert/organization-insert-admin.component";
import { OrganizationUpdateAdminComponent } from "./organizations/update/organization-update-admin.component";
import { EventsAdminComponent } from "./events/events-admin.component";
import { EventsInsertAdminComponent } from "./events/insert/events-insert-admin.component";
import { EventsUpdateAdminComponent } from "./events/update/events-update-admin.component";
import { TicketCategoryAdminComponent } from "./ticket-category/ticket-category-admin.component";
import { TicketCategoryInsertAdminComponent } from "./ticket-category/insert/ticket-category-insert-admin.component";
import { TicketCategoryUpdateAdminComponent } from "./ticket-category/update/ticket-category-update-admin.component";
import { UsersAdminComponent } from "./users/users-admin.component";
import { UsersUpdateAdminComponent } from './users/update/users-update.component';
import { DashboardAdminComponent } from './dashboard/dashboard-admin.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [
        AdminComponent,
        CategoriesAdminComponent,
        CategoriesInsertAdminComponent,
        CategoriesUpdateAdminComponent,
        OrganizationsComponent,
        OrganizationInsertAdminComponent,
        OrganizationUpdateAdminComponent,
        EventsAdminComponent,
        EventsInsertAdminComponent,
        EventsUpdateAdminComponent,
        TicketCategoryAdminComponent,
        TicketCategoryInsertAdminComponent,
        TicketCategoryUpdateAdminComponent,
        UsersAdminComponent,
        UsersUpdateAdminComponent,
        DashboardAdminComponent,
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule,
        NgChartsModule
    ]
})

export class AdminModule {}