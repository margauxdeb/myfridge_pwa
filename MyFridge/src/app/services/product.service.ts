import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';

import { Product } from '../models/product';
import { RawProduct } from '../models/rawProduct';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ProductService {

  private productUrl = "http://localhost:3000/products/";
  private stockUrl = "http://localhost:3000/stock";
  private shoppingUrl = "http://localhost:3000/shopping";

  constructor(private http: HttpClient) { }

  // Get products from a stock list
  getProductsStock(id: number): Observable<Product[]> {
    const url = `${this.stockUrl}/${id}/${"products?idStock="}${id}`;
    return this.http.get<Product[]>(url);
  }

  // Get products from a shopping list
  getProductsShopping(id: number): Observable<Product[]> {
    const url = `${this.shoppingUrl}/${id}/${"products?idShopping="}${id}`;
    return this.http.get<Product[]>(url);
  }

  // Delete a product
  deleteProduct(product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productUrl}${id}`;
    return this.http.delete<Product>(url, httpOptions);
  }

  // Edit product properties
  editProduct(product: Product, id: number): Observable<any> {
    return this.http.put<any>(`${this.productUrl}${id}`, product);
  }

  // Create a product
  createProduct(newProduct: RawProduct): Observable<Product> {
    return this.http.post<Product>(this.productUrl, newProduct);
  }

  // Return a product searched
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productUrl}/${"?q="}${term}`).pipe();
  }

  // Manage http operations which failed
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Console log the error
      console.error(error);
      // App can still working by returning a null value
      return of(result as T);
    };
  }
}
