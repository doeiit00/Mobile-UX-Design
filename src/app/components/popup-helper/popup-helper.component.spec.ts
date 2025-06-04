import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupHelperComponent } from './popup-helper.component';

describe('PopupHelperComponent', () => {
  let component: PopupHelperComponent;
  let fixture: ComponentFixture<PopupHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupHelperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
