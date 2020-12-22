import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CartItem } from 'src/app/core/cart/cart-item';
import { getIsItemAlreadyInCart } from 'src/app/core/cart/cart-selector';
import { CartStore } from 'src/app/core/cart/cart-store';
import { ALLOWED_PRODUCT_QUANTITIES, CartService } from 'src/app/core/cart/cart.service';
import { Product } from 'src/app/core/products/product';
import { AddToCartDialogComponent } from '../add-to-cart-dialog/add-to-cart-dialog.component';

@Component({
  selector: 'zs-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddToCartComponent implements OnInit {
  @Input() product: Product;
  availableQuantities: number[];
  quantity: number;
  isItemAlreadyInCart: Observable<boolean>;

  constructor(private cartStore: CartStore, private cartService: CartService, private matDialog: MatDialog) {}

  ngOnInit() {
    this.availableQuantities = ALLOWED_PRODUCT_QUANTITIES;
    this.isItemAlreadyInCart = this.cartStore.select(
      getIsItemAlreadyInCart(this.product.id)
    );
    this.quantity = 1;
  }

  addItemToCart() {
    this.cartService
      .addToCart(this.product, this.quantity)
      .subscribe((cartItem) => this.openDialog(cartItem));
  }

  openDialog(cartItem: CartItem)
  {
    this.matDialog.open(AddToCartDialogComponent, {
      width: '350px',
      height: '250px',
      data: { cartItem },
      disableClose: true,
    });
  }
}
