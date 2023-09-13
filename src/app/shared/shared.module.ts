import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, BrowserModule],
  exports:[
    HeaderComponent,
    LoadingComponent,
    ]
})
export class SharedModule { }
