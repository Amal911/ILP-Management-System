import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchListingComponent } from './batch-listing.component';

describe('BatchListingComponent', () => {
  let component: BatchListingComponent;
  let fixture: ComponentFixture<BatchListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
