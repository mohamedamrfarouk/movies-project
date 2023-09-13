import { Component , OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email = '';
  password = '';
  errorMessage = null;
  loginForm: FormGroup;
  AuthService: any;
  constructor(private usersService: UsersService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.createForm()
  }
  createForm(){
    this.loginForm = new FormGroup({
      userData: new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
      }),
    })
  }

  onSubmit() {
    this.email = this.loginForm.get('userData.email').value
    this.password = this.loginForm.get('userData.password').value
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



