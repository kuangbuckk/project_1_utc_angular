import { Component } from '@angular/core';
import { OrganizationDTO } from '../../../../dtos/organization/organization.dto';
import { Router } from '@angular/router';
import { OrganizationService } from '../../../../services/organization.service';

@Component({
  selector: 'app-organization-insert-admin',
  templateUrl: './organization-insert-admin.component.html',
  styleUrls: ['./organization-insert-admin.component.scss']
})

export class OrganizationInsertAdminComponent {
  insertOrganizationDTO: OrganizationDTO = {
    name: '',    
  };

  constructor(
    private router: Router,
    private organizationServiec: OrganizationService,
  ) { }

  insertOrganization(): void { 
    this.organizationServiec.insertOrganization(this.insertOrganizationDTO).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Thêm organization thành công');
        this.router.navigate(['/admin/organizations']);
      },
      error: (error: any) => {
        alert('Thêm organization thất bại: ' + error.message);
      }
    })
  }
}
