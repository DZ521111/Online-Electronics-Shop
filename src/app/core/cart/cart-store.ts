import { Injectable } from '@angular/core';
import { Store } from '../store';
import { CartItem } from './cart-item';
import { CartState, initialState } from './cart-state';

@Injectable({ providedIn: 'root' })
export class CartStore extends Store<CartState>
{
  updateCartItem(cartItemToUpdate: CartItem)
  {
    console.log('Updated cart Item!');
    const newState = {
      ...this.state,
      cartItems: this.state.cartItems.map(cartItem => cartItem.id === cartItemToUpdate.id ? cartItemToUpdate : cartItem)
    };

    this.setState(newState);
  }



  removeCartItem(cartItemToRemove: CartItem)
  {
    console.log('Remove cart Item!');
    const newState = {
      ...this.state,
      cartItems: this.state.cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
    };

    this.setState(newState);
  }



  restoreCart(stateToRestore: CartState)
  {
    console.log('Restore cart Item!');
    this.setState(stateToRestore);
  }


  // clear cart items
  clearCart()
  {
    console.log('Clear cart Item!');
    const newState = initialState;

    this.setState(newState);
  }


  // add into cart
  addCartItem(cartItemToAdd: CartItem)
  {
    console.log('Add cart Item!');
    const newState = {
      ...this.state,
      cartItems: [].concat(this.state.cartItems, cartItemToAdd)
    };

    this.setState(newState);
  }

  constructor( )
  {
    super(initialState);
  }
}


