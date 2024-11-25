import { RoleService } from './../../../../services/role.service';
import { UserUpdateAdminDTO } from './../../../../dtos/user/user.admin.update.dto';
import { Router, ActivatedRoute } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { Component } from '@angular/core';
import { UserResponse } from 'src/app/responses/user.response';
import { UserService } from 'src/app/services/user.service';
import { Organization } from 'src/app/model/organization';
import { Role } from '../../../../model/role';

@Component({
  selector: 'app-users-update-admin',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss']
})

export class UsersUpdateAdminComponent {
  userUpdateAdminDTO: UserUpdateAdminDTO = {
    full_name: '',
    phone_number: '',
    email: '',
    address: '',
    is_active: 0,
    date_of_birth: new Date(),

    role_id: 0,
    organization_id: 0
  }
  roles: Role[] = [];
  organizations: Organization[] = [];
  userId: number = 0;


  constructor(
    private userService: UserService,
    private organizationService: OrganizationService,
    private roleService: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.activatedRoute.snapshot.paramMap.get('id');
    if (idParam) {
      this.userId = parseInt(idParam);
    }
    this.getUser(this.userId);
    this.getAllRoles();
    this.getAllOrganizations();
  }

  getUser(userId: number) {
    this.userService.getUserByIdAdminOnly(userId).subscribe({
      next: (response: UserResponse) => {
        this.userUpdateAdminDTO = {
          full_name: response.full_name,
          phone_number: response.phone_number,
          email: response.email,
          address: response.address,
          is_active: response.is_active,
          date_of_birth: response.date_of_birth,
          role_id: response.role.id,
          organization_id: response.organization ?  response.organization.id : 0
        }
        debugger;
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error.error);
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
        console.log('error: ', error.error);
      }
    })
  }

  getAllRoles() {
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
      },
      complete: () => {
      },
      error: (error: any) => {
        console.log('error: ', error.error);
      }
    })
  }

  updateUser() {
    this.userService.updateUserAdmin(this.userId, this.userUpdateAdminDTO).subscribe({
      next: (response: any) => {
        alert('Update user successfully');
        this.router.navigate(['/admin/users']);
      },
      complete: () => {
      },
      error: (error: any) => {
        alert('error: ' +  error.error);
      }
    })
  }

  onRoleChange() {
    if (this.userUpdateAdminDTO.role_id !== 3) {
      this.userUpdateAdminDTO.organization_id = 0;
    }
  }
}
