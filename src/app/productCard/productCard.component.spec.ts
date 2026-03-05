import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardComponent } from './productCard.component';
describe('ProductComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', {
      id: 0,
      title: 'TEST',
      description: 'ceci est une description',
      photo: 'test/test',
      price: 10,
      stock: 10,
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product photo as image url', () => {
    const image = (fixture.nativeElement as HTMLElement).querySelector('img');
    expect(image?.getAttribute('src')).toBe(component.product().photo);
  });

  it('should display the product description', () => {
    const description = (fixture.nativeElement as HTMLElement).querySelector(
      'small'
    );
    expect(description?.innerText).toBe(component.product().description);
  });

  it('should display the product title', () => {
    const title = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-title a'
    );

    expect(title?.textContent).toBe(component.product().title);
  });

  it('should display the product price', () => {
    const price = (fixture.nativeElement as HTMLElement).querySelector(
      '.card-text'
    );

    expect(price?.textContent).toBe(`${component.product().price} €`);
  });

  it('should emit addToBasket event with the given product when the button is clicked', () => {
    const spy = spyOn(component.addToBasket, 'emit');
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    expect(spy).toHaveBeenCalledOnceWith(component.product());
  });

  it('should not add the "text-bg-warning" className when stock is greater than 1', () => {
    component.product().stock = 2;
    fixture.detectChanges();
    const classes = (fixture.nativeElement as HTMLElement)
      .querySelector('.card')
      ?.getAttribute('class');

    console.log(classes);

    expect(classes).not.toContain('text-bg-warning');
  });
  it('should add the "text-bg-warning" className when stock is equal to 1', () => {
    component.product().stock = 1;
    fixture.detectChanges();
    const classes = (fixture.nativeElement as HTMLElement)
      .querySelector('.card')
      ?.getAttribute('class');

    console.log(classes);

    expect(classes).toContain('text-bg-warning');
  });
});
