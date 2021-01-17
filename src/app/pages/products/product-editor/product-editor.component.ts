import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProduct } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.scss'],
})
export class ProductEditorComponent implements OnInit {
  isNewProduct = true;

  productForm: FormGroup;

  productData: IProduct;

  latestId: number;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    const currentProductId = this.productData?.id || this.latestId || 1;

    this.productForm = this.fb.group({
      id: [currentProductId],
      name: ['', [Validators.required]],
      description: [''],
      quantity: ['', [Validators.required, Validators.min(0)]],
      expire_date: ['', Validators.required],
    });
  }
}
