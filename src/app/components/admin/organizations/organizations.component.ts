import { Component } from '@angular/core';
import { Organization } from '../../../model/organization';
import { OrganizationService } from '../../../services/organization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.scss']
})
export class OrganizationsComponent {
  organizations: Organization[] = [];
  constructor(
    private organizationService: OrganizationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getOrganizations();
  }

  getOrganizations() {
    this.organizationService.getOrganizations().subscribe({
      next: (organizations: Organization[]) => {
        this.organizations = organizations;
        debugger; 
      },
      complete: () => {
        debugger;
      },
      error: (error: any) => {
        console.error('Error fetching organizations:', error);
      }
    });
  }

  insertOrganization() {
    this.router.navigate(['/admin/organizations/insert']);
  }

  editOrganization(id: number) {
    this.router.navigate(['/admin/organizations/edit', id]);
  }

  deleteOrganization(id: number) {
    this.organizationService.deleteOrganization(id).subscribe({
      next: (response: any) => {
        
      },
      complete: () => {
        alert('Delete organization successfully');
        this.router.navigate(['/admin/organizations']);
      },
      error: (error: any) => {
        console.error('Error deleting organization:', error);
      }
    });
  }

}
