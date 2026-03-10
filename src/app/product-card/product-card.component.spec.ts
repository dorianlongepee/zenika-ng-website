import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './product-card.component';
import { By } from '@angular/platform-browser';
import { Product } from './product';

describe('ProductComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const productMock: Product = {
    id: 'testId',
    title: 'TEST',
    description: 'ceci est une description',
    photo: 'test/test',
    price: 10,
    stock: 10,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', productMock);
    fixture.detectChanges();
  });

  // FIXME: ici, j'ai essayé de mettre dans des describe, mais fixture est à null, d'après SO, c'est psq les blocs describe sont exécutés avant le beforeEach
  it('should display the product as "last chance" if stock equals 1', () => {
    const card = fixture.debugElement.query(By.css('[data-testid="card"]'));
    fixture.componentRef.setInput('product', { ...productMock, stock: 1 });
    fixture.detectChanges();

    expect(card.classes).toEqual({ ...card.classes, 'text-bg-warning': true });
  });

  it('should not display the product as "last chance" if stock greater than 1', () => {
    const card = fixture.debugElement.query(By.css('[data-testid="card"]'));
    fixture.componentRef.setInput('product', { ...productMock, stock: 2 });
    fixture.detectChanges();

    expect(card.classes).not.toEqual({
      ...card.classes,
      'text-bg-warning': true,
    });
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    const spy = spyOn(component.addToBasket, 'emit');
    fixture.debugElement.query(By.css('button')).nativeElement.click();
    expect(spy).toHaveBeenCalledOnceWith(productMock);
  });
});
