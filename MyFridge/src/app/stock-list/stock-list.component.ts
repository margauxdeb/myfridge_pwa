import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

import { Stock } from '../models/stock';
import { Product } from '../models/product';
import { Shopping } from '../models/shopping';
import { StockService } from '../services/stock.service';
import { ShoppingService } from '../services/shopping.service';
import { ProductService } from '../services/product.service';

import { ModalModule } from 'ngx-bootstrap';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {

  public stock: Stock;
  public products: Product[] = [];
  public shoppings: Shopping[] = [];
  public currentProduct: Product;
  public shoppingListSelected: String = '';
  public shoppingItem: Shopping;

  public modalRef: BsModalRef;
  public bsConfig: Partial<BsDatepickerConfig>;
    
  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private shoppingService: ShoppingService,
    private productService: ProductService,
    private location: Location,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getStock();
    this.getProducts();
    this.getShoppings();
  }

  // Get all shoppings lists
  getShoppings(): void {
    this.shoppingService.getShoppings()
      .subscribe(shoppings => this.shoppings = shoppings);
  }

  // Get stock list detail
  getStock(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.stockService.getStock(id)
      .subscribe(stock => this.stock = stock);
  }

  // Update stock list name
  updateStock(): void {
    if (this.stock.name != '') {
      this.stockService.updateStock(this.stock, this.stock.id)
        .subscribe();
    }
  }

  // Get all products from this stock list
  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductsStock(id)
      .subscribe(products => this.products = products);
  }

  // If needed, currently not used
  // Delete a product into the DB
  deleteProduct(product: Product): void {
    this.products = this.products.filter(s => s !== product);
    this.productService.deleteProduct(product).subscribe();
    this.modalRef.hide();
  }

  // Move product from list A to B
  // For the user, means that the product has been deleted from list A
  deleteMoveProduct(product: Product, shopping: string): void {
    this.products = this.products.filter(s => s !== product);
    if (shopping != '') {
      this.shoppingService.getShoppingId(shopping)
      .subscribe(shopping => {
        const shoppingId = shopping[0]["id"];
        product.idStock = 0;
        product.idShopping = shoppingId;
        this.productService.editProduct(product, product.id)
        .subscribe();
      });
    }
    else {
      this.productService.deleteProduct(product).subscribe();
    }
    this.modalRef.hide();
  }

  // Go to the previous page
  goBack(): void {
    this.location.back();
  } 

  // Open the modal that allow suppression
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // Pass as argument the selected product for suppression to the modal
  modalAction(template: TemplateRef<any>, product: Product) {
    this.openModal(template);
    this.currentProduct = product;
  }
}