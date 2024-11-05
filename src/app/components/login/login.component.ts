import { Component, ViewChild } from '@angular/core';
import { LoginDTO } from '../../dtos/user/login.dto';
import { NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../model/role';
import { LoginResponse } from '../../responses/LoginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  email: string;
  password: string;

  roles: Role[] = [];
  rememberMe: boolean = true;
  selectedRole: Role | undefined;


  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService,
    private roleService: RoleService) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
    debugger;
    this.roleService.getRoles().subscribe({
      next: (roles: Role[]) => {
        this.roles = roles;
        this.selectedRole = roles.length > 0 ? roles[0] : undefined;
      },
      complete: () => {

      },
      error: (error: any) => {
        alert('Get roles failed: ' + error.message);
      }
    })
  }

  login(){
    debugger
    const loginDTO:LoginDTO = {
        "email": this.email,
        "password": this.password,
        "role_id": this.selectedRole?.id ?? 1
    }

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        const { token } = response;
        this.tokenService.setToken(token);
      },
      complete: () => {
        //xử lý khi request hoàn thành
      },
      error: (error: any) => {
        //xử lý khi request gặp lỗi
        alert('Loggin failed: ' + error.message);
      }
    })
  }
}
