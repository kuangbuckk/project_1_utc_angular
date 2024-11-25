import { Organization } from './../../../../model/organization';
import { Component } from '@angular/core';
import { OrganizationDTO } from '../../../../dtos/organization/organization.dto';
import { OrganizationService } from '../../../../services/organization.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-organization-update-admin',
  templateUrl: './organization-update-admin.component.html',
  styleUrls: ['./organization-update-admin.component.scss']
})
export class OrganizationUpdateAdminComponent {
  updateOrganizationDTO: OrganizationDTO = {
    name: ''
  }
  organizationId: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if(idParam){
      this.organizationId = parseInt(idParam);
    }
    this.organizationService.getOrganizationById(this.organizationId).subscribe({
      next: (organization: Organization) => {
        this.updateOrganizationDTO = {
          name: organization.name
        }
      },
      error: (error: any) => {
        alert('Get organization failed: ' + error.error);
      }
    })
  }

  updateOrganization(): void {
    this.organizationService.updateOrganization(this.organizationId, this.updateOrganizationDTO).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Update organization successfully');
        this.router.navigate(['/admin/organizations']);
      },
      error: (error: any) => {
        alert('Update organization failed: ' + error.error);
      }
    })
  }
}
