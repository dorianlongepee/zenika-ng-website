import { CurrencyPipe } from '@angular/common';
import { BasketService } from './basket.service';
import { Component, inject } from '@angular/core';
import { CheckoutFormComponent } from './checkout-form/checkout-form.component';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe, CheckoutFormComponent],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css',
})
export default class BasketComponent {
  private basketService = inject(BasketService);
  basketItems = this.basketService.items;
  basketTotal = this.basketService.total;
}
