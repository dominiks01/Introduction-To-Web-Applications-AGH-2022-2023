import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddingTripComponent } from './adding-trip.component';

describe('AddingTripComponent', () => {
  let component: AddingTripComponent;
  let fixture: ComponentFixture<AddingTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddingTripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddingTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
