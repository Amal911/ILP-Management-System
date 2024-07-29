import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { HollowButtonComponent } from '../hollow-button/hollow-button.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LeaveService } from '../../services/API/leave.service';

declare const bootstrap: any;

@Component({
  selector: 'app-leaveviewmodal',
  standalone: true,
  imports: [ButtonComponent, HollowButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './leaveviewmodal.component.html',
  styleUrl: './leaveviewmodal.component.scss'
})

export class LeaveviewmodalComponent {

  @Input() leaves: any;
  leaveRequestForm: FormGroup;
  showRejectReason: boolean = false;
  @Output() refreshRequests = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private leaveService: LeaveService) {
    this.leaveRequestForm = this.fb.group({
      rejectReason: ['']
    });
  }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  showRejectReasonField(): void {
    this.showRejectReason = true;
  }

  private getLoggedInUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.UserId;
  }

  approveLeave(): void {
    // let userData =  localStorage.getItem("user") as string;
    // userData  =JSON.parse(userData); 
    const loggedInUserId = this.getLoggedInUserId();
    const approvalData = {
      userId:loggedInUserId,
      isApproved: true
    };
    console.log(approvalData);
    
    this.leaveService.updateApprovalStatus(this.leaves.id, approvalData).subscribe(() => {
      // Refresh leave requests or handle success message
      this.refreshRequests.emit();
    });
    const modalElement = document.getElementById('leaveviewModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  RejectLeave(): void{
    const loggedInUserId = this.getLoggedInUserId();
      const rejectionData = {
        userId: loggedInUserId,
        isApproved: false,
        // rejectReason: this.leaveRequestForm.value.rejectReason
      };
      this.leaveService.updateApprovalStatus(this.leaves.id, rejectionData).subscribe(() => {
        console.log("leave request rejected")
        this.refreshRequests.emit();
      });
      const modalElement = document.getElementById('leaveviewModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
      }
  }

  // onSubmit(): void {
  //   if (this.leaveRequestForm.valid) {
  //     const loggedInUserId = this.getLoggedInUserId();
  //     const rejectionData = {
  //       userId: loggedInUserId,
  //       isApproved: false,
  //       // rejectReason: this.leaveRequestForm.value.rejectReason
  //     };
  //     this.leaveService.updateApprovalStatus(this.leaves.id, rejectionData).subscribe(() => {
  //       console.log("leave request rejected")
  //       this.refreshRequests.emit();
  //     });
  //     const modalElement = document.getElementById('leaveviewModal');
  //     if (modalElement) {
  //       const modal = bootstrap.Modal.getInstance(modalElement);
  //       modal.hide();
  //     }
  //   }
  // }


}

