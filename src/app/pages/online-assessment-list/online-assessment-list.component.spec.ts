import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineAssessmentListComponent } from './online-assessment-list.component';

describe('OnlineAssessmentListComponent', () => {
  let component: OnlineAssessmentListComponent;
  let fixture: ComponentFixture<OnlineAssessmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineAssessmentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineAssessmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
