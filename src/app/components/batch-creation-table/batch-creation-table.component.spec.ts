import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCreationTableComponent } from './batch-creation-table.component';

describe('BatchCreationTableComponent', () => {
  let component: BatchCreationTableComponent;
  let fixture: ComponentFixture<BatchCreationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchCreationTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchCreationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
