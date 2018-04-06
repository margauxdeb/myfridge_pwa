import { Component, OnInit } from '@angular/core';
import { Stock } from '../models/stock';
import { StockService } from '../services/stock.service';

@Component({
  selector: 'app-stock-lists',
  templateUrl: './stock-lists.component.html',
  styleUrls: ['./stock-lists.component.css']
})
export class StockListsComponent implements OnInit {

  stocks: Stock[] = [];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.getStocks();
  }

  // Get all stocks lists
  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(stocks => this.stocks = stocks);
  }

  // Create a new stock list
  addStock(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.stockService.addStock({ name } as Stock)
      .subscribe(stock => {
        this.stocks.push(stock);
      }
    );
  }

  // Delete a stock list
  deleteStock(stock: Stock): void {
    this.stocks = this.stocks.filter(s => s !== stock);
    this.stockService.deleteStock(stock).subscribe();
  }
}
