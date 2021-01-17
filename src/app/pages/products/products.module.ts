import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';

import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import {
  NzGridModule,
  NzInputModule,
  NzModalModule,
  NzNotificationModule,
} from 'ng-zorro-antd';
import { IconsProviderModule } from 'src/app/icons-provider.module';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NzTableModule,
    NzButtonModule,
    NzNotificationModule,
    IconsProviderModule,
    NzModalModule,
    ReactiveFormsModule,
    NzGridModule,
    NzInputModule,
  ],
  declarations: [ProductsComponent, ProductEditorComponent],
  exports: [ProductsComponent],
})
export class ProductsModule {}
