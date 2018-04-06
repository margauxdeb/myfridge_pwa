import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { Stock } from '../models/stock';
import { StockService } from '../services/stock.service';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.css']
})
export class StockSearchComponent implements OnInit {

  stocks$: Observable<Stock[]>;
  private searchTerms = new Subject<string>();

  constructor(private stockService: StockService) { }

  // Apply the research terms function into the DB
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.stocks$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.stockService.searchStocks(term)),
    );
  }
}
