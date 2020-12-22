import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { getCartItemsCount } from 'src/app/core/cart/cart-selector';
import { CartStore } from 'src/app/core/cart/cart-store';

@Component({
  selector: 'zs-cart-items-count',
  templateUrl: './cart-items-count.component.html',
  styleUrls: ['./cart-items-count.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemsCountComponent implements OnInit {

  totalItemsInCart$: Observable<number>;
  constructor(private cartStore: CartStore) { }

  ngOnInit(): void {
    this.totalItemsInCart$ = this.cartStore.select(getCartItemsCount);
  }

}
