import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var isAuthenticated = this.getToken();
    if (!isAuthenticated) {
      this.router.navigate(['/login']);
    } else {
      let user: any = this.decodeToken(sessionStorage.getItem('token'));
      if (user.role != 'student') {
        this.router.navigate(['/']);
      }
    }

    return isAuthenticated;
  }
  getToken() {
    return !!sessionStorage.getItem('token');
  }

  decodeToken(token: any) {
    return jwt_decode(token);
  }
}
