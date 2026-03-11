import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../product-card/product';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private readonly _products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);

  readonly products = this._products.asReadonly();

  readonly hasProductsInStock = computed(() =>
    this._products().some(({ stock }) => stock > 0)
  );

  decreaseStock(product: Product) {
    this._products.update((p) => {
      return p.map((pro) => {
        return pro.id === product.id && pro.stock > 0
          ? { ...pro, stock: pro.stock - 1 }
          : pro;
      });
    });
  }
}
