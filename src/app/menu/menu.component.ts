import { Component, computed, inject, input } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  private basketService = inject(BasketService);
  numberOfItems = computed<number>(() => this.basketService.items().length);
}
