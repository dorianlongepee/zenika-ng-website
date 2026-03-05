import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ProductCardComponent } from './productCard/productCard.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [ProductCardComponent] },
        add: { schemas: [CUSTOM_ELEMENTS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product cards', () => {
    const debugElement = fixture.debugElement.queryAll(
      By.css('app-product-card')
    );

    expect(debugElement.length).toBe(component.products.length);
  });

  it('should update the total when "addToBasket" class method is called', () => {
    component.total = 25;
    component.count = 1;
    fixture.detectChanges();

    const menu = fixture.debugElement.query(By.css('app-menu'));
    const header = (fixture.nativeElement as HTMLElement).querySelector(
      'header'
    );

    expect(
      (menu.nativeElement as HTMLElement).querySelector('.nav-link')
        ?.textContent
    ).toBe('Voir mon panier 1');
    expect(header?.textContent).toContain("Votre panier s'élève à 25 €");

    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    products[0].triggerEventHandler('addToBasket', component.products[0]);
    fixture.detectChanges();

    expect(
      (menu.nativeElement as HTMLElement).querySelector('.nav-link')
        ?.textContent
    ).toBe('Voir mon panier 2');
    expect(header?.textContent).toContain(
      `Votre panier s'élève à ${25 + component.products[0].price} €`
    );
  });

  it('should decrease the stock of the product added to the basket', () => {
    const originalStock = component.products[0].stock;
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    products[0].triggerEventHandler('addToBasket', component.products[0]);
    fixture.detectChanges();

    expect(component.products[0].stock).toBe(originalStock - 1);
  });

  it('should not display products whose stock is empty', () => {
    component.products[0].stock = 0;
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(products.length).toBe(3);
    expect(fixture.nativeElement as HTMLElement).not.toContain(
      component.products[0].title
    );
  });

  it('should display a message when stock is completely empty', () => {
    component.products = component.products.map((p) => {
      return { ...p, stock: 0 };
    });
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(products).toEqual([]);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Désolé, notre stock est vide !'
    );
  });
});
