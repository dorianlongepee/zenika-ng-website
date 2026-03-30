import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CheckoutDetails } from '../basket-item';
import { BasketService } from '../basket.service';

@Component({
  selector: 'app-checkout-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css',
})
export class CheckoutFormComponent {
  private basketService = inject(BasketService);
  protected checkoutInProgress = signal<boolean>(false);
  protected displayErrorMessage = signal<boolean>(false);
  protected displayConfirmationMessage = signal<boolean>(false);
  protected order = signal<number>(0);

  checkout(checkoutDetails: CheckoutDetails): void {
    this.checkoutInProgress.set(true);
    this.basketService.checkout(checkoutDetails).subscribe({
      next: (item) => {
        this.order.set(item.orderNumber);
        this.displayConfirmationMessage.set(true);
      },
      error: () => {
        this.displayErrorMessage.set(true);
        this.checkoutInProgress.set(false);
      },
    });
  }
}
