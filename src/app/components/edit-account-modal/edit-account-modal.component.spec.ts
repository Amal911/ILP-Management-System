import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountModalComponent } from './edit-account-modal.component';

describe('EditAccountModalComponent', () => {
  let component: EditAccountModalComponent;
  let fixture: ComponentFixture<EditAccountModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAccountModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAccountModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
