import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleOperationsComponent } from './schedule-operations.component';

describe('ScheduleOperationsComponent', () => {
  let component: ScheduleOperationsComponent;
  let fixture: ComponentFixture<ScheduleOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleOperationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
