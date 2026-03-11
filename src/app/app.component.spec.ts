import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { BasketService } from './basket/basket.service';
import { BasketStubService } from './basket/basket.service.stub';
import { CatalogService } from './catalog/catalog.service';
import { CatalogStubService } from './catalog/catalog.service.stub';
import { APP_TITLE } from './app.token';
import { findIndex } from 'rxjs';

describe('App', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let catalogService: CatalogService;
  let basketService: BasketService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: BasketService, useClass: BasketStubService },
        { provide: CatalogService, useClass: CatalogStubService },
        { provide: APP_TITLE, useValue: 'Title' },
      ],
    }).compileComponents();

    catalogService = TestBed.inject(CatalogService);
    basketService = TestBed.inject(BasketService);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the site title', () => {
    const title = fixture.debugElement.query(By.css('h1')).nativeElement
      .textContent;

    expect(title).toBe('Title');
  });

  //FIXME
  xit('should not display products whose stock is empty', () => {
    expect(catalogService.products()).toHaveSize(3);
    let products = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(products.length).toBe(2);
    expect(products[0].nativeElement.textContent).toContain('TITLE_2');

    products[0].triggerEventHandler('addToBasket', component.products()[1]);
    fixture.detectChanges();
    products = fixture.debugElement.queryAll(By.css('app-product-card'));

    expect(products.length).toBe(1);
    expect(products[0].nativeElement.textContent).toContain('TITLE_3');
  });

  it('should display a message when stock is completely empty', () => {
    let message = fixture.debugElement.query(
      By.css('[data-testid="emptyMessage"]')
    );
    expect(message).toBeNull();

    /// ??????
    (catalogService as unknown as CatalogStubService).hasProductsInStock.set(
      false
    );

    fixture.detectChanges();

    message = fixture.debugElement.query(
      By.css('[data-testid="emptyMessage"]')
    );
    expect(message.nativeElement.textContent).toContain(
      'Désolé, notre stock est vide !'
    );
  });
});
