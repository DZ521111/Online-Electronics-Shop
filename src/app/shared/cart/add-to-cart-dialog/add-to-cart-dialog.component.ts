import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/core/cart/cart-item';

interface AddToCartDialogData
{
  cartItem: CartItem;
}

@Component({
  selector: 'zs-add-to-cart-dialog',
  templateUrl: './add-to-cart-dialog.component.html',
  styleUrls: ['./add-to-cart-dialog.component.scss']
})
export class AddToCartDialogComponent implements OnInit {
  cartItem: CartItem;
  constructor(
    @Inject(MAT_DIALOG_DATA) data : AddToCartDialogData,
    private router: Router,
    private matDialogRef: MatDialogRef<AddToCartDialogComponent>
  )
  {
    this.cartItem = data.cartItem;
  }

  ngOnInit(): void {
  }

  goToCart()
  {
    this.router.navigate(['/cart']).then(() => this.closeDialog());
  }

  continueShopping()
  {
    this.router.navigate(['/products']).then(() => this.closeDialog());
  }

  closeDialog()
  {
    this.matDialogRef.close();
  }


}
