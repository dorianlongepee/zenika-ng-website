import { CanMatchFn } from '@angular/router';
import { BasketService } from './basket.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const basketGuard: CanMatchFn = (route, segments) => {
  const basketService = inject(BasketService);

  return basketService.fetchBasket().pipe(map(({ length }) => length > 0));
};
