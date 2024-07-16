import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCreateEvaluationCriteriaComponent } from './batch-create-evaluation-criteria.component';

describe('BatchCreateEvaluationCriteriaComponent', () => {
  let component: BatchCreateEvaluationCriteriaComponent;
  let fixture: ComponentFixture<BatchCreateEvaluationCriteriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchCreateEvaluationCriteriaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchCreateEvaluationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
