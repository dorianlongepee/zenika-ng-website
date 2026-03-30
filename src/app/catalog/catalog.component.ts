import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { CurrencyPipe } from '@angular/common';
import { CatalogService } from './catalog.service';
import { BasketService } from '../basket/basket.service';
import { APP_TITLE } from '../app.token';
import { Product } from '../product-card/product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-catalog',
  imports: [ProductCardComponent, CurrencyPipe, RouterLink],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export default class CatalogComponent {
  private catalogService = inject(CatalogService);
  private basketService = inject(BasketService);

  appTitle = inject(APP_TITLE);

  readonly count = this.basketService.total;
  readonly products = this.catalogService.products;
  readonly hasProductsInStock = this.catalogService.hasProductsInStock;

  protected updateBasket(product: Product) {
    this.basketService.addItem(product).subscribe();
    this.catalogService.decreaseStock(product.id);
  }

  constructor() {
    this.catalogService.fetchProducts().subscribe();
    this.basketService.fetchBasket().subscribe();
  }
}
