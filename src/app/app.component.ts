import { APP_TITLE } from './app.token';
import { BasketService } from './basket/basket.service';
import { Component, inject } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { Product } from './product-card/product';
import { ProductCardComponent } from './product-card/product-card.component';
import { CatalogService } from './catalog/catalog.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, ProductCardComponent, CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private catalogService = inject(CatalogService);
  private basketService = inject(BasketService);

  appTitle = inject(APP_TITLE);

  readonly count = this.basketService.count;
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
