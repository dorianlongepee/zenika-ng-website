import { Component, computed, signal } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { Product } from './product-card/product';
import { ProductCardComponent } from './product-card/product-card.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  readonly products = signal<Product[]>([
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ]);
  readonly count = signal<number>(0);
  readonly total = signal<number>(0);

  readonly hasProductsInStock = computed(() =>
    this.products().some(({ stock }) => stock > 0)
  );

  protected updateBasket(product: Product) {
    this.total.update((total) => total + product.price);
    this.count.update((count) => count + 1);

    this.products.update((p) => {
      return p.map((pro) => {
        return pro.id === product.id ? { ...pro, stock: pro.stock - 1 } : pro;
      });
    });
  }
}
