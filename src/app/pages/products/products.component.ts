import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { ProductsService } from 'src/app/services/products.service';
import { ProductEditorComponent } from './product-editor/product-editor.component';

export interface Data {
  id: number;
  name: string;
  age: number;
  address: string;
  disabled: boolean;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: Data[] = [];
  listOfCurrentPageData: Data[] = [];
  setOfCheckedId = new Set<number>();

  products = [];

  constructor(
    private productsService: ProductsService,
    private nzNotificationService: NzNotificationService,
    private nzModalService: NzModalService,
    private VCR: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts(): void {
    this.products = this.productsService.Products;
    this.listOfData = [...this.products];
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  addProduct(): void {
    this.nzModalService.create({
      nzTitle: 'Add Product',
      nzContent: ProductEditorComponent,
      nzViewContainerRef: this.VCR,
      nzComponentParams: {},
    });
  }

  removeProduct(): void {
    this.loading = true;

    const index = this.listOfData.findIndex((data) =>
      this.setOfCheckedId.has(data.id)
    );

    if (index > -1) {
      setTimeout(() => {
        this.products.splice(index, 1);
        this.listOfData = [...this.products];

        this.nzNotificationService.create(
          'success',
          'Deleted',
          'Product Was Deleted Successfully'
        );

        this.loading = false;
      }, 1000);
    }
  }
}
