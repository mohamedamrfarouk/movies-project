import { Component , OnInit, ViewChild, OnChanges} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../guards/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../guards/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';
  errorMessage = null;
  userData 
  @ViewChild('LoginForm') loginForm: NgForm;

  AuthService: any;
  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    
  }
  onSubmit() {

    this.email = this.loginForm.value.userData.email
    this.password = this.loginForm.value.userData.password  
    const isValid = this.usersService.isUserValid(this.email, this.password);

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    if (isValid) {
      this.errorMessage = null; 
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
    if(this.errorMessage){
      console.error("error: ",this.errorMessage)
    }else{
      this.authService.login()
      localStorage.setItem("loggedIn", "true");
      this.router.navigate(['/', 'movies-catalog']);
    }
  }
}



