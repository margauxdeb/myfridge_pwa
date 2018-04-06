import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/of';
import { empty } from 'rxjs/observable/empty';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import { listLocales } from 'ngx-bootstrap/chronos';

import { ProductService } from "../services/product.service";
import { StockService } from '../services/stock.service';

import { RawProduct } from "../models/rawProduct";
import { Stock } from '../models/Stock';
import { Product } from '../models/product';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

defineLocale('fr', frLocale); 

@Component({
  selector: 'app-scan-product',
  templateUrl: './scan-product.component.html',
  styleUrls: ['./scan-product.component.css']
})
export class ScanProductComponent implements OnInit {

  public productForm: FormGroup;
  public stocks: Stock[] = [];
  public stockListSelected: String = '';
  public stockId: number;
  public products$: Observable<Product[]>;
  private searchTerms = new Subject<string>();

  public productName: string = '';
  public barcodeValue: string = '';
  public locale: string = 'fr';
  public locales = listLocales();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private stockService: StockService,
    private _localeService: BsLocaleService
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required ],
      barcode : ['', Validators.required ],
      expiry : ['', Validators.required ],
    });
  }

  // Implement the function to search terms into the DB
  search(term: string): void {
    this.searchTerms.next(term);
  }

  // Change the DatePicker language
  applyLocale() {
    this._localeService.use(this.locale);
  }

  ngOnInit() {
    this.getStocks();
    this.applyLocale();
    this.products$ = this.searchTerms.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term: string) =>
        this.productService.searchProducts(term)),
    );
  }

  // Fetched stocks lists
  getStocks(): void {
    this.stockService.getStocks()
      .subscribe(shoppings => this.stocks = shoppings);
  }

  // Send product data from the search function into the form
  sendProductData(product: Product): void {
    this.productName = product.name;
    this.barcodeValue = product.barcode;
    this.search('');
  };

  // Clean form fields after the product has been created
  resetForm() {
    let control = null;
    this.productForm.reset();
    this.productForm.markAsUntouched();
    Object.keys(this.productForm.controls).forEach((name) => {;
      control = this.productForm.controls[name];
      control.setErrors(null);
    });
    this.stockListSelected = '';
  }

  // Create the product in its list when submit
  createProduct(){
    const formModel = this.productForm.value;
    const shoppingString = this.stockListSelected["name"];
    
    if (shoppingString != '') {
      this.stockService.getStockId(shoppingString)
        .subscribe(shopping => {
          this.stockId = shopping[0]["id"];

          const rawProduct: RawProduct = {
            name : formModel.name,
            barcode : formModel.barcode,
            expiry: formModel.expiry,
            idStock: this.stockId,
            idShopping: 0,
          }
          this.productService.createProduct(rawProduct).subscribe();
      });
    }
    this.resetForm();
  }
}
