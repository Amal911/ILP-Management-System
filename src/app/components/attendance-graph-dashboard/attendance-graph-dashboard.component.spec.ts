import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceGraphDashboardComponent } from './attendance-graph-dashboard.component';

describe('AttendanceGraphDashboardComponent', () => {
  let component: AttendanceGraphDashboardComponent;
  let fixture: ComponentFixture<AttendanceGraphDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceGraphDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceGraphDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
