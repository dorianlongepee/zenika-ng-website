import {
  ApplicationConfig,
  provideZoneChangeDetection,
  ValueProvider,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { CatalogService } from './catalog/catalog.service';
import { BasketService } from './basket/basket.service';
import { APP_TITLE } from './app.token';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';

registerLocaleData(localeFr);

const appTitleProvider: ValueProvider = {
  provide: APP_TITLE,
  useValue: 'Bienvenue sur Zenika Ecommerce',
};

export const appConfig: ApplicationConfig = {
  providers: [
    appTitleProvider,
    CatalogService,
    BasketService,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
  ],
};
