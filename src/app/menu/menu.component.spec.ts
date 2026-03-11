import { ProductCardComponent } from '../product-card/product-card.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { BasketService } from '../basket/basket.service';
import { BasketStubService } from '../basket/basket.service.stub';
import { By } from '@angular/platform-browser';
import { BasketItem } from '../basket/basket-item';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let basketService: BasketService;

  const fakeBasketItems: BasketItem[] = [
    { id: '1', title: 'TEST1', price: 10 },
    { id: '2', title: 'TEST2', price: 20 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: BasketService, useClass: BasketStubService }],
      imports: [MenuComponent],
    }).compileComponents();

    basketService = TestBed.inject(BasketService);

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the number of items', () => {
    const badge = fixture.debugElement.query(By.css('[data-testid="badge"]'));
    expect(badge.nativeElement.innerText).toBe('0');

    basketService.addItem(fakeBasketItems[0]);
    basketService.addItem(fakeBasketItems[1]);
    fixture.detectChanges();

    expect(badge.nativeElement.innerText).toBe('2');
  });
});
