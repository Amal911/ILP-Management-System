import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchCreatePhaseTableComponent } from './batch-create-phase-table.component';

describe('BatchCreatePhaseTableComponent', () => {
  let component: BatchCreatePhaseTableComponent;
  let fixture: ComponentFixture<BatchCreatePhaseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BatchCreatePhaseTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchCreatePhaseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
