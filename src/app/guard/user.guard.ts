import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { UserResponse } from '../responses/user.response';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard {
  userResponse?:UserResponse | null;
  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private userService:UserService 
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    debugger
    if (!isTokenExpired && isUserIdValid) {
      return true;
    } else {
      // Nếu không authenticated, bạn có thể redirect hoặc trả về một UrlTree khác.
      // Ví dụ trả về trang login:
      alert('Bạn phải đăng nhập trước khi thực hiện hành động này');
      this.router.navigate(['/login']);
      return false;
    }
  }  
}

export const UserGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
): boolean => {
  debugger
  return inject(UserGuard).canActivate(next, state);
}
