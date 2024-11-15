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

const routes: Routes = [
    //Admin
    {
        path: 'admin', 
        component: AdminComponent, 
        children: [
            {path: 'categories', component: CategoriesAdminComponent},
            {path: 'organizations', component: OrganizationsComponent},
            {path: 'events', component: EventsAdminComponent},
            {path: 'events/:id/ticket-categories', component: TicketCategoryAdminComponent},

            //actions
            {path: 'categories/insert', component: CategoriesInsertAdminComponent},
            {path: 'categories/edit/:id', component: CategoriesUpdateAdminComponent},
            {path: 'organizations/insert', component: OrganizationInsertAdminComponent},
            {path: 'organizations/edit/:id', component: OrganizationUpdateAdminComponent},
            {path: 'events/insert', component: EventsInsertAdminComponent},
            {path: 'events/edit/:id', component: EventsUpdateAdminComponent},
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
