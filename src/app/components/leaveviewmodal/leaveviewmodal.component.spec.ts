import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveviewmodalComponent } from './leaveviewmodal.component';

describe('LeaveviewmodalComponent', () => {
  let component: LeaveviewmodalComponent;
  let fixture: ComponentFixture<LeaveviewmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveviewmodalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveviewmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
