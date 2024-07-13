import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineAssessmentListCardComponent } from './online-assessment-list-card.component';

describe('OnlineAssessmentListCardComponent', () => {
  let component: OnlineAssessmentListCardComponent;
  let fixture: ComponentFixture<OnlineAssessmentListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineAssessmentListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineAssessmentListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
