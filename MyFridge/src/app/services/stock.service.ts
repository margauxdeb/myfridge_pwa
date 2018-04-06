import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Stock } from '../models/stock';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StockService {

  private stockUrl = "http://localhost:3000/stock";

  constructor(private http: HttpClient) { }

  // Get all stocks lists
  getStocks(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.stockUrl);
  }

  // Get stock list detail
  getStock(id: number): Observable<Stock> {
    const url = `${this.stockUrl}/${id}`;
    return this.http.get<Stock>(url);
  }

  // Update stock list properties
  updateStock(stock: Stock, id: number): Observable<any> {
    return this.http.put<any>(`${this.stockUrl}/${id}`, stock);
  }

  // Create a new stock list
  addStock(stock: Stock): Observable<Stock> {
    return this.http.post<Stock>(this.stockUrl, stock);
  }

  // Delete stock list
  deleteStock(stock: Stock | number): Observable<Stock> {
    const id = typeof stock === 'number' ? stock : stock.id;
    const url = `${this.stockUrl}/${id}`;
    return this.http.delete<Stock>(url, httpOptions);
  }

  // Get stock list id from its name
  getStockId(stock: string): Observable<Stock> {
    const url = `${this.stockUrl}${"?name="}${stock}`;
    return this.http.get<Stock>(url);
  }

  // Search stock list from query
  searchStocks(term: string): Observable<Stock[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Stock[]>(`${this.stockUrl}/${"?q="}${term}`).pipe();
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
