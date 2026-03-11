import { TestBed } from '@angular/core/testing';

import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasketService);
  });

  it('should update the items when a product is added', () => {
    expect(service.items()).toHaveSize(0);

    service.addItem({ id: 'TEST_1', title: 'TEST', price: 10 });

    expect(service.items()).toHaveSize(1);
    expect(service.items()[0].id).toBe('TEST_1');

    service.addItem({ id: 'TEST_2', title: 'TEST2', price: 20 });

    expect(service.items()).toHaveSize(2);
    expect(service.items()[1].id).toBe('TEST_2');
  });

  it('should update the total when a product is added', () => {
    expect(service.items()).toHaveSize(0);

    service.addItem({ id: 'TEST_1', title: 'TEST', price: 10 });

    expect(service.count()).toBe(10);

    service.addItem({ id: 'TEST_2', title: 'TEST2', price: 20 });

    expect(service.count()).toBe(30);
  });
});
