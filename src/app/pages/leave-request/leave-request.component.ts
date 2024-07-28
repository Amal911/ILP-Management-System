import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { LeaveRequestCardComponent } from "../../components/leave-request-card/leave-request-card.component";
import { LeaveviewmodalComponent } from '../../components/leaveviewmodal/leaveviewmodal.component';
import { TableModule } from 'primeng/table';
import { NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';

import { LeaveService } from '../../services/API/leave.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss',
  imports: [DropdownComponent, ButtonComponent, ListingCardComponent, LeaveRequestCardComponent, LeaveviewmodalComponent, TableModule, NgIf],
  providers: [DatePipe]

})
export class LeaveRequestComponent implements OnInit {

  filteredLeaveRequests: any[] = [];
  pendingLeaveRequests: any[] = [];
  leaveRequestHistory: any[] = [];
  LeaveRequests: any[] = [];
  selectedLeave: any;
  showRejectReason: boolean = false;
  leaveRequestForm = this.fb.group({
    rejectReason: [''],
  });

  constructor(private datePipe: DatePipe, private leaveService: LeaveService, private fb: FormBuilder) {
    this.loadLeaveRequests();
  }

  ngOnInit() {
    this.loadLeaveRequests();
  }

  calculateDaysBetween(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    return timeDiff / (1000 * 3600 * 24) + 1;
  }

  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MMM d, y');
    return formattedDate || '';
  }

  openModal(leave: any) {
    this.selectedLeave = leave;
  }

  loadLeaveRequests() {
    this.leaveService.getLeaveRequests().subscribe((leaves: any[]) => {
      this.LeaveRequests = leaves;
      const loggedInUserId = this.getLoggedInUserId(); // Add this method to get the logged-in user ID
      this.pendingLeaveRequests = leaves.filter(leave => leave.isPending && leave.pocIds.includes(loggedInUserId));
      this.leaveRequestHistory = leaves.filter(leave => !leave.isPending && leave.pocIds.includes(loggedInUserId));
      this.filteredLeaveRequests = this.leaveRequestHistory;
      this.LeaveRequests.forEach(request => {
        request.no_of_days = this.calculateDaysBetween(request.leaveDateFrom, request.leaveDateTo);
        request.leaveDateFrom = this.formatDate(request.leaveDateFrom);
        request.leaveDateTo = this.formatDate(request.leaveDateTo);
        request.leaveDate = this.formatDate(request.leaveDate);
        request.createdDate = this.formatDate(request.createdDate);
      });
    });
  }

  approveLeave() {
    if (this.selectedLeave) {
      const approvalData = { userId: this.selectedLeave.userId, isApproved: true };
      this.leaveService.updateApprovalStatus(this.selectedLeave.id, approvalData).subscribe(() => {
        this.loadLeaveRequests();
      });
    }
  }

  rejectLeave() {
    if (this.selectedLeave) {
      const approvalData = { userId: this.selectedLeave.userId, isApproved: false, rejectReason: this.leaveRequestForm.value.rejectReason };
      this.leaveService.updateApprovalStatus(this.selectedLeave.id, approvalData).subscribe(() => {
        this.loadLeaveRequests();
        this.showRejectReason = false;  // Reset the form state
      });
    }
  }

  showRejectReasonField() {
    this.showRejectReason = true;
  }

  onSubmit() {
    this.rejectLeave();
  }

  refreshLeaveRequests(): void {
    this.loadLeaveRequests();
  }

  private getLoggedInUserId(): number {
    // Implement this method to get the logged-in user's ID from the local storage or authentication service
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.UserId;
  }

}

// LeaveRequests = [
//   {
//     name: 'Amal E A',
//     batch_name: 'ILP Batch 03 2023-24',
//     description: 'Blah blah blah blah',
//     days:'1',
//     leave_date: '2023-06-12',
//     leave_date_from: '2024-07-11',
//     leave_date_to: '2024-07-12',
//     requested_date: '2024-07-01',
//     reason: 'Sick Leave',
//     is_approved_trainer: true,
//     is_approved_l_and_d: false,
//     is_pending: true
//   },
//   {
//     name: 'Devipriya MS',
//     batch_name: 'ILP Batch 03 2023-24',
//     description: 'what to write here !!!!!!',
//     days:'3',
//     leave_date: '2023-06-12',
//     leave_date_from: '2024-07-11',
//     leave_date_to: '2024-07-13',
//     requested_date: '2024-07-01',
//     reason: 'Sick Leave',
//     is_approved_trainer: true,
//     is_approved_l_and_d: false,
//     is_pending: true
//   },
//   {
//     name: 'Dharsan C Sajeev',
//     batch_name: 'ILP Batch 03 2023-24',
//     description: 'Hospital Emergency and need a consultation',
//     days:'4',
//     leave_date: '2023-06-12',
//     leave_date_from: '2024-07-11',
//     leave_date_to: '2024-07-14',
//     requested_date: '2024-07-01',
//     reason: 'Sick Leave',
//     is_approved_trainer: false,
//     is_approved_l_and_d: false,
//     is_pending: true
//   },
//   {
//     name: 'Amal E A',
//     batch_name: 'ILP Batch 03 2023-24',
//     description: 'Hospital Emergency and need a consultation',
//     days:'1',
//     leave_date: '2023-06-12',
//     leave_date_from: '2024-07-11',
//     leave_date_to: '2024-07-12',
//     requested_date: '2024-07-01',
//     reason: 'Sick Leave',
//     is_approved_trainer: true,
//     is_approved_l_and_d: false,
//     is_pending: false
//   },
//   {
//     name: 'Devipriya M S',
//     batch_name: 'ILP Batch 03 2023-24',
//     description: 'blah blah blah blah',
//     days:'1',
//     leave_date: '2023-06-12',
//     leave_date_from: '2024-07-11',
//     leave_date_to: '2024-07-11',
//     requested_date: '2024-07-01',
//     reason: 'Sick Leave',
//     is_approved_trainer: false,
//     is_approved_l_and_d: true,
//     is_pending: false
//   },
//   {
//     name: 'Reshmi M',
//     batch_name: 'ILP Batch 03 2023-24',
//     description: 'Hospital Emergency and need a consultation',
//     days:'2',
//     leave_date: '2023-06-12',
//     leave_date_from: '2024-07-11',
//     leave_date_to: '2024-07-12',
//     requested_date: '2024-07-01',
//     reason: 'Sick Leave',
//     is_approved_trainer: true,
//     is_approved_l_and_d: true,
//     is_pending: false
//   }
// ];


