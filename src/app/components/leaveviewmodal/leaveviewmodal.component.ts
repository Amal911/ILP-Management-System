import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

declare const bootstrap: any;

@Component({
  selector: 'app-leaveviewmodal',
  standalone: true,
  imports: [ButtonComponent, HollowButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './leaveviewmodal.component.html',
  styleUrl: './leaveviewmodal.component.scss'
})

export class LeaveviewmodalComponent {

  @Input() leave: any;
  showRejectReason: boolean = false;
  leaveRequestForm: FormGroup;
  @Output() approve = new EventEmitter<any>();
  @Output() reject = new EventEmitter<any>();



  constructor(private fb: FormBuilder) {
    this.leaveRequestForm = this.fb.group({
      rejectReason: ['']
    });
  }

  approveLeave() {
    // Logic to approve the leave request
    this.approve.emit(this.leave);
    const modalElement = document.getElementById('leaveviewModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  showRejectReasonField() {
    this.showRejectReason = true;
  }

  rejectLeave() {
    this.reject.emit(this.leave);
  }

  onSubmit() {
    if (this.leaveRequestForm.valid) {
      // Logic to handle form submission
      const rejectReason = this.leaveRequestForm.get('rejectReason')?.value;
      console.log(rejectReason);
      this.showRejectReason = false;
      const modalElement = document.getElementById('leaveviewModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
    }
  }
}

