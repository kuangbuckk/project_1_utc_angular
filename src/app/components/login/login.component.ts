import { UserResponse } from './../../responses/user.response';
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
  userResponse?: UserResponse | undefined;
  showPassword = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private tokenService: TokenService
  ) {
    this.email = '';
    this.password = '';
  }

  ngOnInit() {
  }

  login(){
    debugger
    const loginDTO:LoginDTO = {
        "email": this.email,
        "password": this.password,
        // "role_id": this.selectedRole?.id ?? 1
    }

    this.userService.login(loginDTO).subscribe({
      next: (response: LoginResponse) => {
        const { token } = response;
        if  (this.rememberMe){
          this.tokenService.setToken(token);
          this.userService.getUserDetail(token).subscribe({
            next: (userResponse: any) => {
              this.userResponse = {
                id: userResponse.id,
                full_name: userResponse.full_name,
                address: userResponse.address,
                date_of_birth: userResponse.date_of_birth,
                is_active: userResponse.is_active,
                role: userResponse.role,
                email: userResponse.email,
                phone_number: userResponse.phone_number,
                organization: userResponse.organization
              };
              alert(userResponse.full_name + ' đăng nhập thành công');
              if (this.userResponse.is_active !== 1){
                this.router.navigate(['/']);
                alert('Tài khoản của bạn đã bị khóa');
                return;
              } else {
                this.userService.saveUserResponseToLocalStorage(this.userResponse);
                this.router.navigate(['/']);
              }
            },
            complete: () => {
              //xử lý khi request hoàn thành
            },
            error: (error: any) => {
              alert('Get user details failed: ' + error.error);
            }
          })
        }
      },
      complete: () => {
        //xử lý khi request hoàn thành
      },
      error: (error: any) => {
        //xử lý khi request gặp lỗi
        alert('Loggin failed: ' + error.error);
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
