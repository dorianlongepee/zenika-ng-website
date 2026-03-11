import { HttpClient } from '@angular/common/http';
import { BasketItem } from './basket-item';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private httpClient = inject(HttpClient);

  private readonly _items = signal<BasketItem[]>([]);
  readonly items = this._items.asReadonly();

  readonly count = computed<number>(() => {
    return this._items().reduce((total, { price }) => total + price, 0);
  });

  fetchBasket(): Observable<BasketItem[]> {
    return this.httpClient
      .get<BasketItem[]>('http://localhost:8080/api/basket')
      .pipe(tap((items) => this._items.set(items)));
  }

  addItem(product: BasketItem): Observable<BasketItem> {
    return this.httpClient
      .post<BasketItem>('http://localhost:8080/api/basket', {
        productId: product.id,
      })
      .pipe(tap((item) => this._items.update((items) => [...items, item])));
  }
}
