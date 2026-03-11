import { computed, inject, Injectable, Provider, signal } from '@angular/core';
import { Product } from '../product-card/product';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  private httpClient = inject(HttpClient);
  private readonly _products = signal<Product[]>([]);
  readonly products = this._products.asReadonly();

  readonly hasProductsInStock = computed(() =>
    this._products().some(({ stock }) => stock > 0)
  );

  fetchProducts(): Observable<Product[]> {
    return this.httpClient
      .get<Product[]>('http://localhost:8080/api/products')
      .pipe(tap((items) => this._products.set(items)));
  }

  decreaseStock(productId: string) {
    this._products.update((p) => {
      return p.map((pro) => {
        return pro.id === productId && pro.stock > 0
          ? { ...pro, stock: pro.stock - 1 }
          : pro;
      });
    });
  }
}
