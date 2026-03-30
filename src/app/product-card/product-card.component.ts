import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { CurrencyPipe, NgClass, UpperCasePipe } from '@angular/common';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product-card',
  imports: [NgClass, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  readonly product = input.required<Product>();
  readonly addToBasket = output<Product>();

  get isLastChance() {
    return this.product().stock == 1;
  }

  protected handleAddBasket() {
    this.addToBasket.emit(this.product());
  }
}
