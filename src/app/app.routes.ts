import { Routes } from '@angular/router';
import { basketGuard } from './basket/basket.guard';

export const routes: Routes = [
  {
    path: 'catalog',
    loadComponent: () => import('./catalog/catalog.component'),
  },
  {
    path: 'basket',
    loadComponent: () => import('./basket/basket.component'),
    canMatch: [basketGuard],
  },
  {
    path: 'basket',
    loadComponent: () => import('./empty-basket/empty-basket.component'),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./basket/basket.component'),
  },
  { path: '**', redirectTo: 'catalog' },
];
