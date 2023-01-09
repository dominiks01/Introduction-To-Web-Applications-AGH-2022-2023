import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTrip } from './new-trip.component';

describe('FormComponent', () => {
  let component: NewTrip;
  let fixture: ComponentFixture<NewTrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTrip ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewTrip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
