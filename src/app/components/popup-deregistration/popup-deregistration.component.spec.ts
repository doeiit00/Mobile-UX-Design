import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupDeregistrationComponent } from './popup-deregistration.component';

describe('PopupDeregistrationComponent', () => {
  let component: PopupDeregistrationComponent;
  let fixture: ComponentFixture<PopupDeregistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupDeregistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupDeregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
