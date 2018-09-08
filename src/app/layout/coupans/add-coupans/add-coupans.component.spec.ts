import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoupansComponent } from './add-coupans.component';

describe('AddCoupansComponent', () => {
  let component: AddCoupansComponent;
  let fixture: ComponentFixture<AddCoupansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCoupansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCoupansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
