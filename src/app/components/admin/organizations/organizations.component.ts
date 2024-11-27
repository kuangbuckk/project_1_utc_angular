import { Component } from '@angular/core';
import { Organization } from '../../../model/organization';
import { OrganizationService } from '../../../services/organization.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
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
    private http: HttpClient
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

  exportExcel(){
    const fileUrl = 'http://localhost:8090/api/v1/excel/export/organizations'; // Replace with your API endpoint
    this.http.get(fileUrl, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        // Create a blob from the response
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor to download the file
        const a = document.createElement('a');
        a.href = url;
        a.download = `organizations.xls`; // Desired file name
        a.click();

        // Revoke the object URL to free memory
        window.URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading file', error);
      }
    );
  }

}
