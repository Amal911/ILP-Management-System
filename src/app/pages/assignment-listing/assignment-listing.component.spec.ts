import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentListingComponent } from './assignment-listing.component';

describe('AssignmentListingComponent', () => {
  let component: AssignmentListingComponent;
  let fixture: ComponentFixture<AssignmentListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignmentListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignmentListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
