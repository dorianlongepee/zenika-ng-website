import { Component, input, output } from '@angular/core';
import { Product } from './product';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  imports: [NgClass],
  templateUrl: './productCard.component.html',
  styleUrl: './productCard.component.css',
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToBasket = output<Product>();

  get isLastChance() {
    return this.product().stock == 1;
  }

  protected handleAddBasket() {
    this.addToBasket.emit(this.product());
  }
}
