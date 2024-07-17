import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineAssessmentCreateComponent } from './online-assessment-create.component';

describe('OnlineAssessmentCreateComponent', () => {
  let component: OnlineAssessmentCreateComponent;
  let fixture: ComponentFixture<OnlineAssessmentCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineAssessmentCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineAssessmentCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
