import { ProductDataService } from './../product-data.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/core/products/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CartService } from 'src/app/core/cart/cart.service';

@Component({
  selector: 'zs-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource = new MatTableDataSource<Product>();
  loading = true;
  subscription = [];
  displayedColumns = ['imgUrl', 'description', 'name', 'price', 'addToCart'];

  @ViewChild(MatSort) sort: MatSort;

  // paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productDataService: ProductDataService, private cartService: CartService) { }

  ngOnInit()
  {
    this.subscription.push(this.productDataService.getAllProducts().subscribe(products => this.onDataLoad(products)));
  }

  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy()
  {
    this.subscription.forEach(s => s.unsubscribe());
  }

  onDataLoad(products)
  {
    this.loading = false;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.data = products;
  }

  addItemToCart(product)
  {
    this.cartService.addToCart(product, 2);
  }

}
