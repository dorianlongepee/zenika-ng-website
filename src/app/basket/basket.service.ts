import { BasketItem } from './basket-item';
import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  private readonly _items = signal<BasketItem[]>([]);
  readonly items = this._items.asReadonly();

  readonly count = computed<number>(() => {
    return this._items().reduce((total, { price }) => total + price, 0);
  });

  addItem(item: BasketItem): void {
    this._items.update((items) => [...items, item]);
  }
}
