import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModule } from './bootstrap.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
 
import { AppComponent } from './app.component';
import { StockListsComponent } from './stock-lists/stock-lists.component';
import { StockListComponent } from './stock-list/stock-list.component';
import { ShoppingListsComponent } from './shopping-lists/shopping-lists.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ScanProductComponent } from './scan-product/scan-product.component';
import { DatePipe } from './pipe/date-pipe';

import { StockService } from './services/stock.service';
import { ShoppingService } from './services/shopping.service';
import { ProductService } from './services/product.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { StockSearchComponent } from './stock-search/stock-search.component';
import { ShoppingSearchComponent } from './shopping-search/shopping-search.component';

@NgModule({
  declarations: [
    AppComponent,
    StockListsComponent,
    StockListComponent,
    ShoppingListsComponent,
    ShoppingListComponent,
    ScanProductComponent,
    StockSearchComponent,
    ShoppingSearchComponent,
    DatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BootstrapModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}) : []
  ],
  providers: [
    StockService,
    ShoppingService,
    ProductService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
