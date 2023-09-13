import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { LoadingComponent } from './loading/loading.component';
import { CommonModule } from '@angular/common';  
@NgModule({
  declarations: [
    HeaderComponent,
    LoadingComponent,
  ],
  imports: [CommonModule],
  exports:[
    HeaderComponent,
    LoadingComponent,
    ]
})
export class SharedModule { }
