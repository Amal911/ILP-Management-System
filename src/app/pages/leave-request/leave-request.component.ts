import { Component } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { LeaveRequestCardComponent } from "../../components/leave-request-card/leave-request-card.component";
import { LeaveviewmodalComponent } from '../../components/leaveviewmodal/leaveviewmodal.component';
import { LeaveService } from '../../services/API/leave.service';

@Component({
  selector: 'app-leave-request',
  standalone: true,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss',
  imports: [DropdownComponent, ButtonComponent, ListingCardComponent, LeaveRequestCardComponent, LeaveviewmodalComponent]
})
export class LeaveRequestComponent {

  LeaveRequests: any[] = [];
  pendingLeaveRequests: any[] = [];
  leaveRequestHistory: any[] = [];
  selectedLeave: any;

  constructor(private leaveService: LeaveService) {
    this.loadLeaveRequests();
  }

  loadLeaveRequests() {
    this.leaveService.getLeaveRequests().subscribe((leaves: any[]) => {
      this.LeaveRequests = leaves;
      this.pendingLeaveRequests = leaves.filter(leave => leave.isPending);
      this.leaveRequestHistory = leaves.filter(leave => !leave.isPending);
    });
  }

  openModal(leaves: any) {
    this.selectedLeave = leaves;
  }

  // ngOnInit() {
  //   this.getLeaveRequests();
  // }

  // getLeaveRequests() {
  //   this.leaveService.getLeaveRequests().subscribe((data: any) => {
  //     this.leaveRequests = data;
  //   });
  // }

  // approveLeave(leave: any) {
  //   const approvalData = {
  //     userId: leave.userId,
  //     isApproved: true
  //   };
  //   this.leaveService.updateApprovalStatus(leave.id, approvalData).subscribe(() => {
  //     this.getLeaveRequests();
  //   });
  // }

  // rejectLeave(leave: any) {
  //   const approvalData = {
  //     userId: leave.userId,
  //     isApproved: false
  //   };
  //   this.leaveService.updateApprovalStatus(leave.id, approvalData).subscribe(() => {
  //     this.getLeaveRequests();
  //   });
  // }

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

}
