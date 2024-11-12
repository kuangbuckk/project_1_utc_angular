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

const routes: Routes = [
    //Admin
    {
        path: 'admin', 
        component: AdminComponent, 
        children: [
            {path: 'categories', component: CategoriesAdminComponent},
            {path: 'organizations', component: OrganizationsComponent},

            //actions
            {path: 'categories/insert', component: CategoriesInsertAdminComponent},
            {path: 'categories/edit/:id', component: CategoriesUpdateAdminComponent},
            {path: 'organizations/insert', component: OrganizationInsertAdminComponent},
            {path: 'organizations/edit/:id', component: OrganizationUpdateAdminComponent},
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
