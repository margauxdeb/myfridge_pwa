import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingSearchComponent } from './shopping-search.component';

describe('ShoppingSearchComponent', () => {
  let component: ShoppingSearchComponent;
  let fixture: ComponentFixture<ShoppingSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
