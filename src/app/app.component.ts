import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { Product } from './productCard/product';
import { ProductCardComponent } from './productCard/productCard.component';

@Component({
  selector: 'app-root',
  imports: [MenuComponent, ProductCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'my first component';
  products: Product[] = [
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
  ];

  count = 0;
  total = 0;
  protected updateBasket(product: Product) {
    this.total += product.price;
    this.count++;
  }
}
