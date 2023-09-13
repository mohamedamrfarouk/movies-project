import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule, 
    BrowserModule, 
    RouterModule, 
    ReactiveFormsModule, 
    FormsModule, 
    HttpClientModule,
    SharedModule
  ],
  exports:[
    LoginComponent,
    SignUpComponent,
    ]
})
export class AuthModule { }
