import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocksRoutingModule } from './blocks-routing.module';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './root/app.component';
import { ZsMaterialModule } from '../shared/material-module';
import { CartItemsCountComponent } from '../shared/cart/cart-items-count/cart-items-count.component';
import { SharedModule } from '../shared/shared.module';
// import { AppComponent } from './root/app.component';


@NgModule({
  declarations: [HeaderComponent, AppComponent],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    ZsMaterialModule,
    SharedModule
  ],
  exports: [HeaderComponent, AppComponent]
})

export class BlocksModule { }
