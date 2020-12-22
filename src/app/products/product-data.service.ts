import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../core/products/product';

@Injectable()
export class ProductDataService {

  constructor(private $http: HttpClient ) { }

  getAllProducts(): Observable<Product>
  {
    return this.$http.get('products.json').pipe(delay(2000)) as Observable<Product>;
  }

}
