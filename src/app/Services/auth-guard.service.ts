import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot): boolean{
                console.log(localStorage.getItem('loggedIn'))
                if(localStorage.getItem('loggedIn')==='true'){
                  return true
                }else{
                  console.log('i am here')
                  this.router.navigate(['/','login']);
                }
  }
}
