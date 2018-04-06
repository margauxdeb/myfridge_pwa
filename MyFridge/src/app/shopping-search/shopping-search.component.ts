import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';

import { Shopping } from '../models/shopping';
import { ShoppingService } from '../services/shopping.service';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-shopping-search',
  templateUrl: './shopping-search.component.html',
  styleUrls: ['./shopping-search.component.css']
})
export class ShoppingSearchComponent implements OnInit {

  shoppings$: Observable<Shopping[]>;
  private searchTerms = new Subject<string>();

  constructor(private shoppingService: ShoppingService) { }

  // Apply the research terms function into the DB
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.shoppings$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.shoppingService.searchShoppings(term)),
    );
  }

}
