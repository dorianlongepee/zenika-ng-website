import { TestBed } from '@angular/core/testing';

import { CatalogService } from './catalog.service';
import { CatalogStubService } from './catalog.service.stub';

describe('CatalogService', () => {
  let service: CatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatalogService);
  });

  it('should decrease the product stock', () => {
    expect(service.products()[0].stock).toBe(2);

    service.decreaseStock(service.products()[0]);

    expect(service.products()[0].stock).toBe(1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    expect(service.products()[0].stock).toBe(2);

    service.decreaseStock(service.products()[0]);

    expect(service.products()[0].stock).toBe(1);

    service.decreaseStock(service.products()[0]);

    expect(service.products()[0].stock).toBe(0);

    service.decreaseStock(service.products()[0]);

    expect(service.products()[0].stock).toBe(0);
  });
});
