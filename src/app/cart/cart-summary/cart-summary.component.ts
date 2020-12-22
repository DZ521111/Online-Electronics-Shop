import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCartItemsCount, getCartSubTotal, getEstimatedTax, getOrderTotal, getShippingCost } from 'src/app/core/cart/cart-selector';
import { CartStore } from 'src/app/core/cart/cart-store';

@Component({
  selector: 'zs-cart-summary',
  templateUrl: './cart-summary.component.html',
  styleUrls: ['./cart-summary.component.scss']
})
export class CartSummaryComponent implements OnInit {
  cartSubTotal: Observable<number>;
  cartItemsCount: Observable<number>;
  shippingCost: Observable<number>;
  estimatedCost: Observable<number>;
  orderTotal: Observable<number>;

  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.cartSubTotal = this.cartStore.select(getCartSubTotal);
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.shippingCost = this.cartStore.select(getShippingCost);
    this.estimatedCost = this.cartStore.select(getEstimatedTax);
    this.orderTotal = this.cartStore.select(getOrderTotal);
  }

}
