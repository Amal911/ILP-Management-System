import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineeTableComponent } from './trainee-table.component';

describe('TraineeTableComponent', () => {
  let component: TraineeTableComponent;
  let fixture: ComponentFixture<TraineeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraineeTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraineeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
