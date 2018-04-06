import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

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
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public shopping: Shopping;
  public products: Product[] = [];
  public shoppings: Shopping[] = [];
  public currentProduct: Product;
  public shoppingListSelected: String = '';
  public shoppingItem: Shopping;

  public modalRef: BsModalRef;
  public bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private route: ActivatedRoute,
    private shoppingService: ShoppingService,
    private productService: ProductService,
    private location: Location,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getShopping();
    this.getProducts();
    this.getShoppings();
  }

  // Get shopping list detail from its ID
  getShopping(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.shoppingService.getShopping(id)
      .subscribe(shopping => this.shopping = shopping);
  }

  // Get shoppings lists
  getShoppings(): void {
    this.shoppingService.getShoppings()
      .subscribe(shoppings => this.shoppings = shoppings);
  }

  // Update shopping list name
  updateShopping(): void {
    if (this.shopping.name != '') {
      this.shoppingService.updateShopping(this.shopping, this.shopping.id)
      .subscribe();
    }
  }

  // Get shopping list products
  getProducts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.getProductsShopping(id)
      .subscribe(products => this.products = products);
  }

  // If needed, currently not used
  // Delete a product from the DB
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
