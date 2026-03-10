import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgClass],
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
