import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';

import { Shopping } from '../models/shopping';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ShoppingService {

  private shoppingUrl = "http://localhost:3000/shopping";

  constructor(private http: HttpClient) { }

  // Get all shoppings lists
  getShoppings(): Observable<Shopping[]> {
    return this.http.get<Shopping[]>(this.shoppingUrl);
  }

  // Get shopping list detail
  getShopping(id: number): Observable<Shopping> {
    const url = `${this.shoppingUrl}/${id}`;
    return this.http.get<Shopping>(url);
  }

  // Update shopping list properties
  updateShopping(shopping: Shopping, id: number): Observable<any> {
    return this.http.put<any>(`${this.shoppingUrl}/${id}`, shopping);
  }

  // Create a new shopping list
  addShopping(shopping: Shopping): Observable<Shopping> {
    return this.http.post<Shopping>(this.shoppingUrl, shopping);
  }

  // Delete a shopping list
  deleteShopping(shopping: Shopping | number): Observable<Shopping> {
    const id = typeof shopping === 'number' ? shopping : shopping.id;
    const url = `${this.shoppingUrl}/${id}`;
    return this.http.delete<Shopping>(url, httpOptions);
  }

  // Get a shopping list id from its name
  getShoppingId(shopping: string): Observable<Shopping> {
    const url = `${this.shoppingUrl}${"?name="}${shopping}`;
    return this.http.get<Shopping>(url);
  }

  // Return a shopping list from query
  searchShoppings(term: string): Observable<Shopping[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Shopping[]>(`${this.shoppingUrl}/${"?q="}${term}`).pipe();
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
