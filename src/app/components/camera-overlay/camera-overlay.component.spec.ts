import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CameraOverlayComponent } from './camera-overlay.component';

describe('CameraOverlayComponent', () => {
  let component: CameraOverlayComponent;
  let fixture: ComponentFixture<CameraOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CameraOverlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CameraOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
