import { Injectable, signal } from '@angular/core';
import { CatalogService } from './catalog.service';
import { Product } from '../product-card/product';

@Injectable()
export class CatalogStubService implements Partial<CatalogService> {
  products = signal<Product[]>([
    {
      id: '1',
      title: 'TITLE_1',
      description: 'DESC_1',
      photo: 'PHOTO_1',
      price: 1,
      stock: 0,
    },
    {
      id: 'ID_2',
      title: 'TITLE_2',
      description: 'DESC_2',
      photo: 'PHOTO_2',
      price: 1,
      stock: 1,
    },
    {
      id: 'ID_3',
      title: 'TITLE_3',
      description: 'DESC_3',
      photo: 'PHOTO_3',
      price: 2,
      stock: 2,
    },
  ]);

  hasProductsInStock = signal(true);

  decreaseStock(product: Product) {}
}
