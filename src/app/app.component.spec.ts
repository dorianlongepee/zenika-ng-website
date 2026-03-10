import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { Product } from './product-card/product';

describe('App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const fakeProducts: Product[] = [
    {
      id: 'welsch',
      title: 'Coding the welsch',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-welsch.jpg',
      price: 20,
      stock: 2,
    },
    {
      id: 'world',
      title: 'Coding the world',
      description: 'Tee-shirt col rond - Homme',
      photo: '/assets/coding-the-world.jpg',
      price: 18,
      stock: 1,
    },
    {
      id: 'vador',
      title: 'Duck Vador',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-stars.jpg',
      price: 21,
      stock: 2,
    },
    {
      id: 'snow',
      title: 'Coding the snow',
      description: 'Tee-shirt col rond - Femme',
      photo: '/assets/coding-the-snow.jpg',
      price: 19,
      stock: 2,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    component.products.set(fakeProducts);
    fixture.detectChanges();
  });

  it('should display 4 product cards', () => {
    const debugElement = fixture.debugElement.queryAll(
      By.css('app-product-card')
    );

    expect(debugElement.length).toBe(4);
  });

  it('should update the total when "addToBasket" class method is called', () => {
    const menu = fixture.debugElement.query(By.css('app-menu'));
    const header = fixture.debugElement.query(By.css('header'));
    const panier = menu.nativeElement.querySelector('.nav-link');
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));

    products[0].triggerEventHandler('addToBasket', component.products()[0]);
    fixture.detectChanges();

    expect(panier.innerText).toContain('1');
    expect(header.nativeElement.innerText).toContain(`20 €`);
  });

  it('should decrease the stock of the product added to the basket', () => {
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));
    products[0].triggerEventHandler('addToBasket', component.products()[0]);
    fixture.detectChanges();

    expect(component.products()[0].stock).toBe(1);
  });

  it('should not display products whose stock is empty', () => {
    component.products.set(
      fakeProducts.map((p) => {
        if (p.id === 'welsch') {
          return { ...p, stock: 0 };
        }
        return { ...p };
      })
    );
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(products.length).toBe(3);
    expect(fixture.nativeElement.innerText).not.toContain('Coding the welsch');
  });

  it('should display a message when stock is completely empty', () => {
    component.products.set(
      fakeProducts.map((p) => {
        return { ...p, stock: 0 };
      })
    );
    fixture.detectChanges();
    const products = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(products).toEqual([]);
    expect((fixture.nativeElement as HTMLElement).textContent).toContain(
      'Désolé, notre stock est vide !'
    );
  });
});
