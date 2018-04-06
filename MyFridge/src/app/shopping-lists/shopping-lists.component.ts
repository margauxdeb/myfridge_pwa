import { Component, OnInit } from '@angular/core';
import { Shopping } from '../models/shopping';
import { ShoppingService } from '../services/shopping.service';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
  styleUrls: ['./shopping-lists.component.css']
})
export class ShoppingListsComponent implements OnInit {

  shoppings: Shopping[] = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.getShoppings();
  }

  // Get all shoppings lists
  getShoppings(): void {
    this.shoppingService.getShoppings()
      .subscribe(shoppings => this.shoppings = shoppings);
  }

  // Create new shopping list
  addShopping(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.shoppingService.addShopping({ name } as Shopping)
      .subscribe(shopping => {
        this.shoppings.push(shopping);
      }
    );
  }

  // Delete a shopping list
  deleteShopping(shopping: Shopping): void {
    this.shoppings = this.shoppings.filter(s => s !== shopping);
    this.shoppingService.deleteShopping(shopping).subscribe();
  }
}
