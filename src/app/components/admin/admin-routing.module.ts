import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AdminComponent } from "./admin.component";
import { CategoriesAdminComponent } from "./categories/categories.admin.component";
import { CategoriesInsertAdminComponent } from "./categories/insert/categories-insert-admin.component";
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
import { AdminGuard } from "../../guard/admin.guard";
import { UsersAdminComponent } from "./users/users-admin.component";
import { UsersUpdateAdminComponent } from "./users/update/users-update.component";

const routes: Routes = [
    //Admin
    {
        path: 'admin', 
        component: AdminComponent, 
        // canActivate: [AdminGuard],
        // canActivateChild: [AdminGuard],
        children: [
            {path: 'categories', component: CategoriesAdminComponent},
            {path: 'organizations', component: OrganizationsComponent},
            {path: 'events', component: EventsAdminComponent},
            {path: 'events/:id/ticket-categories', component: TicketCategoryAdminComponent},
            {path: 'users', component: UsersAdminComponent},

            //actions
            {path: 'categories/insert', component: CategoriesInsertAdminComponent},
            {path: 'categories/edit/:id', component: CategoriesUpdateAdminComponent},
            {path: 'organizations/insert', component: OrganizationInsertAdminComponent},
            {path: 'organizations/edit/:id', component: OrganizationUpdateAdminComponent},
            {path: 'events/insert', component: EventsInsertAdminComponent},
            {path: 'events/edit/:id', component: EventsUpdateAdminComponent},
            {path: 'events/:id/ticket-categories/insert', component: TicketCategoryInsertAdminComponent},
            {path: 'events/:id/ticket-categories/edit/:ticketCategoryId', component: TicketCategoryUpdateAdminComponent},
            {path: 'users/edit/:id',component: UsersUpdateAdminComponent}
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
