import { ComponentFixture, TestBed } from '@angular/core/testing';
import { offerView } from './offer-view.component';


describe('MainPageComponent', () => {
  let component: offerView;
  let fixture: ComponentFixture<offerView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ offerView ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(offerView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
