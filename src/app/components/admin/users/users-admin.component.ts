import { Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { Component } from '@angular/core';
import { UserResponse } from '../../../responses/user.response';
import { UserService } from '../../../services/user.service';
import { Organization } from '../../../model/organization';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.scss']
})
export class UsersAdminComponent {
  users: UserResponse[] = [];
  organizations: Organization[] = [];

  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getAllOrganizations();
  }

  getUsers() {
    this.userService.retrieveAllUsers().subscribe({
      next: (response: UserResponse[]) => {
        this.users = response;
        this.users = this.users.sort((a, b) => a.id - b.id);
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  getAllOrganizations() {
    this.organizationService.getOrganizations().subscribe({
      next: (organizations: Organization[]) => {
        this.organizations = organizations;
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error);
      }
    })
  }

  editUser(userId: number) {
    this.router.navigate(['/admin/users/edit', userId]);
  }

}
