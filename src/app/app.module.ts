import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http'
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './Auth/guards/auth-guard.service';
import { AuthService } from './Auth/guards/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './Auth/Auth.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    FormsModule,

    SharedModule,
    AuthModule,
    
    
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
