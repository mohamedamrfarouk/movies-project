import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() headerText: string;
  loggedIn = localStorage.getItem('loggedIn')==='true'
  constructor(private router: Router, private auth: AuthService){}
  logout(){
    localStorage.setItem('loggedIn', 'false')
    this.auth.logout()
    this.router.navigate(["/","login"])
  }
}
