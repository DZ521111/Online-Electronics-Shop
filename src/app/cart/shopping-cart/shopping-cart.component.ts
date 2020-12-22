import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/cart/cart-item';
import { getCartItems, getCartItemsCount } from 'src/app/core/cart/cart-selector';
import { CartStore } from 'src/app/core/cart/cart-store';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from 'src/app/core/cart/cart.service';

@Component({
  selector: 'zs-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  cartItemsCount: Observable<number>;
  cartItems: Observable<CartItem[]>;
  availableQuantities: number[];
  displayedColumns = ['imgUrl', 'name', 'price', 'quantity', 'remove'];
  constructor(private cartStore: CartStore, private cartService: CartService) { }

  ngOnInit(): void {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.cartItemsCount = this.cartStore.select(getCartItemsCount);
    this.cartItems = this.cartStore.select(getCartItems);
  }

  updateCartItem( {value}, cartItem: CartItem)
  {
    console.log('Attempting update quantity from cart page!');
    this.cartService.updateCartItem({...cartItem, quantity: value});
  }

  removeCartItem(cartItem: CartItem)
  {
    console.log('Attempting remove quantity from cart page!');
    this.cartService.removeCartItem(cartItem);
  }

}
