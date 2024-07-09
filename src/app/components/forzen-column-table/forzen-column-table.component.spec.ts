import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForzenColumnTableComponent } from './forzen-column-table.component';

describe('ForzenColumnTableComponent', () => {
  let component: ForzenColumnTableComponent;
  let fixture: ComponentFixture<ForzenColumnTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForzenColumnTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForzenColumnTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
