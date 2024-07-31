import { Component, OnInit } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { LeaveRequestCardComponent } from "../../components/leave-request-card/leave-request-card.component";
import { LeaveviewmodalComponent } from '../../components/leaveviewmodal/leaveviewmodal.component';
import { TableModule } from 'primeng/table';
import { CommonModule, NgIf, NgSwitch } from '@angular/common';
import { DatePipe } from '@angular/common';

import { LeaveService } from '../../services/API/leave.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss',
  imports: [DropdownComponent, ButtonComponent, ListingCardComponent, LeaveRequestCardComponent, LeaveviewmodalComponent, TableModule, NgIf, NgSwitch, CommonModule],
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

  private getLoggedInUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Logged in User:', user);
    return user.UserId;
  }
  private getLoggedInUserRole(): string {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roleName;
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaveRequests().subscribe((leaves: any[]) => {
      this.LeaveRequests = leaves;
      
      const loggedInUserId = this.getLoggedInUserId();
      const loggedInUserRole = this.getLoggedInUserRole();
      console.log('Logged in User ID:', loggedInUserId); // Debugging statement

      // Debugging statements to inspect leave requests
      console.log('All Leave Requests:', leaves);

      this.pendingLeaveRequests = leaves.filter(leave => {
        return leave.approvals.some((approval: { userId: number; isApproved: null; }) => 
          approval.userId === loggedInUserId && approval.isApproved === null
        );
      });

      this.leaveRequestHistory = leaves.filter((leave) => {
        return leave.approvals.some((approval: { userId: number; isApproved: null; }) => 
          approval.userId === loggedInUserId && approval.isApproved !== null
        );
      });

      if (loggedInUserRole === 'Admin') {
        // Filter requests approved by trainers and pending admin approval
        this.filteredLeaveRequests = leaves.filter(leave => {
          const trainerApproved = leave.approvals.some((approval: { role: string; isApproved: boolean }) =>
            approval.role === 'Trainer' && approval.isApproved === true
          );
          const adminPending = leave.approvals.some((approval: { role: string; userId: number; isApproved: null }) =>
            approval.role === 'Admin' && approval.userId === loggedInUserId && approval.isApproved === null
          );
          return trainerApproved && adminPending;
        });
      } else {
        this.filteredLeaveRequests = this.leaveRequestHistory;
      }

      this.filteredLeaveRequests = this.leaveRequestHistory;
      this.LeaveRequests.forEach(request => {
        request.no_of_days = this.calculateDaysBetween(request.leaveDateFrom, request.leaveDateTo);
        request.leaveDateFrom = this.formatDate(request.leaveDateFrom);
        request.leaveDateTo = this.formatDate(request.leaveDateTo);
        request.leaveDate = this.formatDate(request.leaveDate);
        request.createdDate = this.formatDate(request.createdDate);
      });

      // Debugging output
      console.log('Pending Leave Requests:', this.pendingLeaveRequests);
      console.log('Leave Request History:', this.leaveRequestHistory);
    },
    error => {
      console.error('Error:', error);
    });
  }

  getApprovalStatus(leave: any): string {
    const approval = leave.approvals.find((a: { userId: number; }) => a.userId === this.getLoggedInUserId());
    if (!approval) return 'pending';
    
    if (approval.isApproved === true) return 'approved';
    if (approval.isApproved === false) return 'rejected';
    return 'pending';
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
        this.showRejectReason = false;  
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

}


