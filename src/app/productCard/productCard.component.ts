import { Component, input, output } from "@angular/core";
import { Product } from "./product";

@Component({
  selector: "app-product-card",
  imports: [],
  templateUrl: "./productCard.component.html",
  styleUrl: "./productCard.component.css",
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToBasket = output<Product>();

  protected handleAddBasket() {
    this.addToBasket.emit(this.product());
  }
}
