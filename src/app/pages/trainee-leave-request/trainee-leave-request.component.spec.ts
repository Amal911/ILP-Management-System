import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeLeaveRequestComponent } from './trainee-leave-request.component';

describe('TraineeLeaveRequestComponent', () => {
  let component: TraineeLeaveRequestComponent;
  let fixture: ComponentFixture<TraineeLeaveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeLeaveRequestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
