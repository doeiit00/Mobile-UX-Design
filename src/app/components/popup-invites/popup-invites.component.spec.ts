import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupInvitesComponent } from './popup-invites.component';

describe('PopupInvitesComponent', () => {
  let component: PopupInvitesComponent;
  let fixture: ComponentFixture<PopupInvitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupInvitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupInvitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
