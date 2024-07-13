import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScheduleComponent } from './create-schedule.component';

describe('CreateScheduleComponent', () => {
  let component: CreateScheduleComponent;
  let fixture: ComponentFixture<CreateScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateScheduleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
