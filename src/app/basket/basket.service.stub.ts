import { Injectable, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { BasketService } from './basket.service';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items = signal<BasketItem[]>([]);
  count = signal(0);
  addItem(item: BasketItem): void {
    this.items.update((items) => [...items, item]);
  }
}
