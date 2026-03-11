import { Injectable, signal } from '@angular/core';
import { BasketItem } from './basket-item';
import { BasketService } from './basket.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class BasketStubService implements Partial<BasketService> {
  items = signal<BasketItem[]>([]);
  count = signal(0);

  fetchBasket(): Observable<BasketItem[]> {
    return of(this.items());
  }

  addItem(product: BasketItem): Observable<BasketItem> {
    return of({ id: product.id, title: '', price: 0 });
  }
}
