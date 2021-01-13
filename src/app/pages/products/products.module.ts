import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  imports: [ProductsRoutingModule, NzTableModule, NzButtonModule],
  declarations: [ProductsComponent],
  exports: [ProductsComponent],
})
export class ProductsModule {}
