import { UserService } from './../../services/user.service';
import { TokenService } from './../../services/token.service';
import { Component } from '@angular/core';
import { User } from '../../model/user';
import { UserUpdateDTO } from '../../dtos/user/user.update.dto';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  userUpdateDTO: UserUpdateDTO = {
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: new Date(),
    current_password: '',
    new_password: '',
    retype_new_password: '',
  };

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userResponse = this.userService.getUserResponseFromLocalStorage();
    if (userResponse) {
      this.userUpdateDTO = {
        full_name: userResponse.full_name,
        email: userResponse.email,
        phone_number: userResponse.phone_number,
        address: userResponse.address,
        date_of_birth: userResponse.date_of_birth,
        current_password: '',
        new_password: '',
        retype_new_password: '',
      };
    }
  }

  updateProfile() {
    const token = this.tokenService.getToken();
    if (!token) {
      return;
    }
    this.userService.updateUserInfo(token, this.userUpdateDTO).subscribe({
      next: (response: any) => {
        alert('Cập nhật tài khoản thành công!');
      },
      complete: () => {
        
      },
      error: (error: any) => {
        console.error('Đã xảy ra lỗi: ', error?.error.message);
      }
    })
  }    

}
