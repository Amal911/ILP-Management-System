import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionAttendanceComponent } from './session-attendance.component';

describe('SessionAttendanceComponent', () => {
  let component: SessionAttendanceComponent;
  let fixture: ComponentFixture<SessionAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SessionAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
