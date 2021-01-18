import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd';
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

  isLoading: boolean;

  constructor(private fb: FormBuilder, private modal: NzModalRef) {}

  ngOnInit(): void {
    this.initForm();

    this.setFormData();
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

  private setFormData(): void {
    if (this.productData) {
      Object.entries(this.productForm.controls).forEach(([key, control]) => {
        if (
          this.productData[key] !== null &&
          this.productData[key] !== undefined
        ) {
          control.setValue(
            key === 'expire_date'
              ? new Date(this.productData[key])
              : this.productData[key]
          );
        }
      });
    }
  }

  handleCancel() {
    this.modal.close();
  }

  onSubmit() {
    if (this.isFormValid) {
      console.log(this.FormValue, this.productForm.value);
      this.modal.close(this.FormValue);
    }
  }

  private get isFormValid(): boolean {
    Object.entries(this.productForm.controls).forEach(([key, control]) => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    return this.productForm.valid && this.productForm.touched;
  }

  private get FormValue(): IProduct | {} {
    const formValue: IProduct | {} = {};
    Object.entries(this.productForm.controls).forEach(([key, control]) => {
      if (
        control.value !== null &&
        control.value !== undefined &&
        control.value !== ''
      ) {
        formValue[key] = control.value;
      }
    });

    return formValue;
  }
}
