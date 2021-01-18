import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NzModalService, NzNotificationService } from 'ng-zorro-antd';
import { IProduct } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { ProductEditorComponent } from './product-editor/product-editor.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: IProduct[] = [];
  listOfCurrentPageData: IProduct[] = [];
  setOfCheckedId = new Set<number>();
  currentDate = new Date();

  // products: IProduct[] = [];

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
    this.listOfData = this.productsService.Products.map((product) => ({
      ...product,
      expire_date: new Date(product.expire_date),
    }));
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: IProduct[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData.forEach(({ id }) =>
      this.updateCheckedSet(id, checked)
    );
  }

  addProduct(): void {
    const modal = this.nzModalService.create({
      nzTitle: 'Add Product',
      nzContent: ProductEditorComponent,
      nzViewContainerRef: this.VCR,
      nzComponentParams: {
        latestId: this.listOfData[this.listOfData.length - 1]?.id + 1,
      },
    });

    modal.afterClose.subscribe((result: IProduct) => {
      if (result) {
        this.listOfData = [result, ...this.listOfData];
        this.onCurrentPageDataChange(this.listOfData);
      }
    });
  }

  editProduct(productData: IProduct): void {
    const modal = this.nzModalService.create({
      nzTitle: 'Edit Product',
      nzContent: ProductEditorComponent,
      nzViewContainerRef: this.VCR,
      nzComponentParams: {
        productData,
      },
    });

    modal.afterClose.subscribe((result: IProduct) => {
      if (result) {
        const index = this.getProductIndex(result.id);
        this.listOfData[index] = result;
        this.listOfData = [...this.listOfData];
        this.onCurrentPageDataChange(this.listOfData);
      }
    });
  }

  removeProducts(): void {
    this.loading = true;

    this.setOfCheckedId.forEach((id) => this.remove(id));

    this.setOfCheckedId.clear();

    this.loading = false;
  }

  remove(id: number): void {
    const index = this.getProductIndex(id);

    if (index > -1) {
      const deletedProduct = this.listOfData.splice(index, 1)[0];
      this.listOfData = [...this.listOfData];

      this.nzNotificationService.create(
        'success',
        'Deleted',
        `${deletedProduct.name} Was Deleted Successfully!`
      );

      this.onCurrentPageDataChange(this.listOfData);
    }
  }

  private getProductIndex(id: number): number {
    return this.listOfData.findIndex((product) => product.id === id);
  }
}
