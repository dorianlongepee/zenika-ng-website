export interface CheckoutDetails {
  name: string;
  address: string;
  creditCard: string;
}

export interface CheckoutOrder {
  orderNumber: number;
}

export interface BasketItem {
  id: string;
  title: string;
  price: number;
}
