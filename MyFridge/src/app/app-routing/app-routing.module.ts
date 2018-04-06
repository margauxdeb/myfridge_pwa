import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StockListsComponent } from '../stock-lists/stock-lists.component';
import { StockListComponent } from '../stock-list/stock-list.component';
import { ShoppingListsComponent } from '../shopping-lists/shopping-lists.component';
import { ShoppingListComponent } from '../shopping-list/shopping-list.component';
import { ScanProductComponent } from '../scan-product/scan-product.component';

const routes: Routes = [
  { path: '', component: ScanProductComponent },
  { path: 'scan', component: ScanProductComponent },
  { path: 'stock', component: StockListsComponent },
  { path: 'stock/:id', component: StockListComponent },
  { path: 'shopping', component: ShoppingListsComponent },
  { path: 'shopping/:id', component: ShoppingListComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
