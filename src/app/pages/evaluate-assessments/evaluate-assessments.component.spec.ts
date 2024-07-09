import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluateAssessmentsComponent } from './evaluate-assessments.component';

describe('EvaluateAssessmentsComponent', () => {
  let component: EvaluateAssessmentsComponent;
  let fixture: ComponentFixture<EvaluateAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluateAssessmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluateAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
