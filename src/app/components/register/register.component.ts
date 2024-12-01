import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { RegisterDTO } from '../../dtos/user/register.dto';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @ViewChild('registerForm') registerForm!: NgForm;
  //Khai báo các biến tương ứng field dữ liệu trên form
  email: string;
  phoneNumber: string;
  password: string;
  retypePassword: string;
  fullName: string;
  dateOfBirth: Date;
  address: string;
  isAccepted: boolean;
  showPassword = false;
  showRetypePassword = false;
  
  constructor(private router: Router, private userService: UserService) {
    this.email = '';
    this.phoneNumber = '';
    this.password = '';
    this.retypePassword = '';
    this.fullName = '';
    this.dateOfBirth = new Date();
    this.address = '';
    this.isAccepted = false;
    //inject dependency
  }

  onPhoneChange(){
    console.log(this.phoneNumber);
  }

  register(){
    const registerDTO:RegisterDTO = {
        "full_name": this.fullName,
        "phone_number": this.phoneNumber,
        "email": this.email,
        "address": this.address,
        "password": this.password,
        "retype_password": this.retypePassword,
        "date_of_birth": this.dateOfBirth,
        "facebook_account_id": 0,
        "google_account_id": 0,
        "role_id": 1
    }

    this.userService.register(registerDTO).subscribe({
      next: (response: any) => {
          this.router.navigate(['/login']);
      },
      complete: () => {
        //xử lý khi request hoàn thành
      },
      error: (error: any) => {
        debugger
        //xử lý khi request gặp lỗi
        if (Array.isArray(error.error)) {
          alert(error.error.join('\n'));
        } else {
          alert(error.error ?? 'An error occurred');
        }
      }
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleRetypePasswordVisibility() {
    this.showRetypePassword = !this.showRetypePassword;
  }
}
