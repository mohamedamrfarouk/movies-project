import { Component , OnInit} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../Services/users.service';
import { Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';

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

    // console.log(this.loginForm)
    // console.log("email: ",this.email)
    // console.log("password: ",this.password)

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }
    if (isValid) {
      this.errorMessage = null; // Clear any previous error messages
      // Implement your logic for successful login (e.g., navigate to another page)
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



