import { TestBed } from '@angular/core/testing';
import { CartItem } from './cart-item';
import { CartState, initialState } from './cart-state';
import { CartStore } from './cart-store';

describe('CartStore', () => {
  let cartStore: CartStore;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartStore]
     });

    cartStore = TestBed.inject(CartStore);
  });

  it('should create an instance', () => {
    expect(cartStore).toBeTruthy();
  });

  it('Can Add Item into cart', () => {
    const currentState = initialState;
    expect(currentState.cartItems.length).toBe(0);

    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'apple',
      description: 'very good!'
    };

    cartStore.addCartItem(cartItem);

    const expectedState = {
      cartItems: [cartItem]
    };
    expect(cartStore.state).toEqual(expectedState);
  });



  it('Can Clear Item into cart', () => {

    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'apple',
      description: 'very good!'
    };

    cartStore.addCartItem(cartItem);


    const currentState = {
      cartItems: [cartItem]
    };

    expect(cartStore.state).toEqual(currentState);

    cartStore.clearCart();

    expect(cartStore.state).toEqual(initialState);
  });



  it('Can Restore Item into cart', () => {

    const currentState = initialState;

    expect(cartStore.state).toEqual(currentState);
    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'apple',
      description: 'very good!'
    };

    const expectedState: CartState = {
      cartItems: [cartItem]
    };

    cartStore.restoreCart(expectedState);

    expect(cartStore.state).toEqual(expectedState);
  });


  // remove an item
  it('Can Remove Item into cart', () => {

    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'apple',
      description: 'very good!'
    };
    const cartItem1: CartItem = {
      id: 2,
      imgUrl: 'img/banana',
      price: 3,
      quantity: 10,
      itemTotal: 30,
      name: 'banana',
      description: 'very healthy!'
    };

    const currentState: CartState = {
      cartItems: [cartItem, cartItem1]
    };

    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);

    cartStore.removeCartItem(cartItem);

    const expectedState: CartState =  {
        cartItems: [cartItem1]
    };

    expect(cartStore.state).toEqual(expectedState);

  });



  // Update cart item
  it('Can Update Item into cart', () => {

    const cartItem: CartItem = {
      id: 1,
      imgUrl: 'img/apple',
      price: 2,
      quantity: 10,
      itemTotal: 20,
      name: 'apple',
      description: 'very good!'
    };
    const cartItem1: CartItem = {
      id: 2,
      imgUrl: 'img/banana',
      price: 3,
      quantity: 10,
      itemTotal: 30,
      name: 'banana',
      description: 'very healthy!'
    };

    const currentState: CartState = {
      cartItems: [cartItem, cartItem1]
    };

    cartStore.restoreCart(currentState);

    expect(cartStore.state).toEqual(currentState);

    const cartItemToUpdate: CartItem = {
      id: 2,
      imgUrl: 'img/banana',
      price: 3,
      quantity: 99,
      itemTotal: 297,
      name: 'banana',
      description: 'very healthy!'
    };

    cartStore.updateCartItem(cartItemToUpdate);

    const expectedState: CartState =  {
        cartItems: [cartItem, cartItemToUpdate]
    };

    expect(cartStore.state).toEqual(expectedState);

  });


});


