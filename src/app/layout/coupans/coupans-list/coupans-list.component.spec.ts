import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoupansListComponent } from './coupans-list.component';

describe('CoupansListComponent', () => {
  let component: CoupansListComponent;
  let fixture: ComponentFixture<CoupansListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoupansListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoupansListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
