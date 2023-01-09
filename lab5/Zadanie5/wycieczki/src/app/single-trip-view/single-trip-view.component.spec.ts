import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTripViewComponent } from './single-trip-view.component';

describe('SingleTripViewComponent', () => {
  let component: SingleTripViewComponent;
  let fixture: ComponentFixture<SingleTripViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTripViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTripViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
