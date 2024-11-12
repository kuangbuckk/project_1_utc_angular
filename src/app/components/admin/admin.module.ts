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


@NgModule({
    declarations: [
        AdminComponent,
        CategoriesAdminComponent,
        CategoriesInsertAdminComponent,
        CategoriesUpdateAdminComponent,
        OrganizationsComponent,
        OrganizationInsertAdminComponent,
        OrganizationUpdateAdminComponent,
    ],
    imports: [
        AdminRoutingModule,
        CommonModule,
        FormsModule
    ]
})

export class AdminModule {}