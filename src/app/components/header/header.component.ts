import { CartService } from './../../services/cart.service';
import { UserResponse } from './../../responses/user.response';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userResponse?: UserResponse | null;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
  }

  logOut(){
    this.userService.removeUserFromLocalStorage();
    this.tokenService.removeToken();
    this.cartService.clearCart();
    this.userResponse = null;
    alert('Đăng xuất thành công');
  }
}
