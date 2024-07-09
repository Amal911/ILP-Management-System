import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentListingCardComponent } from './assignment-listing-card.component';

describe('AssignmentListingCardComponent', () => {
  let component: AssignmentListingCardComponent;
  let fixture: ComponentFixture<AssignmentListingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentListingCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentListingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
