import { CurrencyPipe } from '@angular/common';
import { BasketService } from './basket.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export default class BasketComponent {
  private basketService = inject(BasketService);
  basketItems = this.basketService.items;
  basketTotal = this.basketService.total;
}
