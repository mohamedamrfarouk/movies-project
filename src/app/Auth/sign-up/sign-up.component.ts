import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{
  signupForm: FormGroup;
  email = '';
  password = '';
  errorMessage = '';

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit() {
    this.createForm()
  }

  createForm(){      
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        'email': new FormControl(null, [Validators.required, Validators.email]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
      }),
    })
  }

  onSubmit() {

    this.email = this.signupForm.get('userData.email').value
    this.password = this.signupForm.get('userData.password').value
    const userExists = this.userService.doesUserExist(this.email);

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password.';
      return;
    }

    if (userExists) {
      this.errorMessage = 'User with this email already exists.';
    } else {
      // Clear any previous error messages
      this.errorMessage = null;
      // Add the new user to the CSV file
      this.userService.addUserToCsv(this.email, this.password).subscribe(() => {
        // Implement your logic for successful signup (e.g., navigate to login page)
      }, (error) => {
        this.errorMessage = 'Error adding the user: ' + error;
      });
    }
    if(this.errorMessage){
      console.error("error: ",this.errorMessage)
    }else{
      this.router.navigate(['/', 'login']);
    }
  }
}
