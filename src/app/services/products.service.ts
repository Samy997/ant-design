import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  get Products(): IProduct[] {
    return products;
  }
}

const products = [
  {
    name: 'Product 1',
    description: 'Product 1 description',
    quantity: 3,
    expire_date: '2020-12-1 09:55:22.607+00',
  },
  {
    name: 'Product 2',
    description: 'Product 2 description',
    quantity: 13,
    expire_date: '2020-12-28 09:55:22.607+00',
  },
];
