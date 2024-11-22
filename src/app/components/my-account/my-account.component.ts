import { UserService } from './../../services/user.service';
import { TokenService } from './../../services/token.service';
import { Component } from '@angular/core';
import { User } from '../../model/user';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent {
  user: User = {
    id: 1,
    full_name: '',
    email: '',
    phone_number: '',
    address: '',
    date_of_birth: new Date(),
    role: {
      id: 1,
      name: ''
    }
  };

  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) { }

  ngOnInit() {
    const userResponse = this.userService.getUserResponseFromLocalStorage();
    if (userResponse) {
      this.user = {
        id: userResponse.id,
        full_name: userResponse.full_name,
        email: userResponse.email,
        phone_number: userResponse.phone_number,
        address: userResponse.address,
        date_of_birth: userResponse.date_of_birth,
        role: userResponse.role
      };
    }
  }

}
