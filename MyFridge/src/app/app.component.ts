import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Fridge !';
  isCollapsed: boolean = true;

  collapsed(event: any): void {
  }
 
  expanded(event: any): void {
  }
}
