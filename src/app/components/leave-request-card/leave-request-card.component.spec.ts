import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestCardComponent } from './leave-request-card.component';

describe('LeaveRequestCardComponent', () => {
  let component: LeaveRequestCardComponent;
  let fixture: ComponentFixture<LeaveRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveRequestCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
