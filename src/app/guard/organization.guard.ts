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
export class OrganizerGuard {
  userResponse?:UserResponse | null;
  constructor(
    private tokenService: TokenService, 
    private router: Router,
    private userService:UserService 
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isTokenExpired = this.tokenService.isTokenExpired();
    const isUserIdValid = this.tokenService.getUserId() > 0;
    this.userResponse = this.userService.getUserResponseFromLocalStorage();
    const isOrganizer = this.userResponse?.role.name == 'ORGANIZER';
    debugger
    if (!isTokenExpired && isUserIdValid && isOrganizer) {
      return true;
    } else {
      this.router.navigate(['/404-not-found']);
      return false;
    }
  }  
}

export const OrganizerGuardFn: CanActivateFn = (
  next: ActivatedRouteSnapshot, 
  state: RouterStateSnapshot
): boolean => {
  debugger
  return inject(OrganizerGuard).canActivate(next, state);
}
