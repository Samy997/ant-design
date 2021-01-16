import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { NzNotificationModule } from 'ng-zorro-antd';
import { IconsProviderModule } from 'src/app/icons-provider.module';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzNotificationModule,
    IconsProviderModule,
  ],
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
})
export class ProductsModule {}
