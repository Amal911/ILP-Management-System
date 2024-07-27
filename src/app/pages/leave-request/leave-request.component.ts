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

@Component({
  selector: 'app-leave-request',
  standalone: true,
  templateUrl: './leave-request.component.html',
  styleUrl: './leave-request.component.scss',
  imports: [DropdownComponent, ButtonComponent, ListingCardComponent, LeaveRequestCardComponent, LeaveviewmodalComponent, TableModule,NgIf],
  providers: [DatePipe]

})
export class LeaveRequestComponent  implements OnInit {
  filteredLeaveRequests: any[] = [];


  LeaveRequests: any[] = [];
  pendingLeaveRequests: any[] = [];
  leaveRequestHistory: any[] = [];
  // LeaveRequests = [
  //   {
  //     name: 'Amal E A',
  //     batch_name: 'ILP Batch 03 2023-24',
  //     description: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eius deleniti pariatur dolore, excepturi dicta vel doloremque modi sequi corporis, maxime necessitatibus harum est quam iusto a esse eligendi ex!',
  //     leave_date: '2023-06-12',
  //     no_of_days:0,
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
  //     leave_date: '2023-06-12',
  //     no_of_days:0,
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
  //     leave_date: '2023-06-12',
  //     no_of_days:0,
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
  //     description: ' Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsum eius deleniti pariatur dolore, excepturi dicta vel doloremque modi sequi corporis, maxime necessitatibus harum est quam iusto a esse eligendi ex!',
  //     leave_date: '2023-06-12',
  //     no_of_days:0,
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
  //     leave_date: '2023-06-12',
  //     no_of_days:0,
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
  //     leave_date: '2023-06-12',
  //     no_of_days:0,
  //     leave_date_from: '2024-07-11',
  //     leave_date_to: '2024-07-12',
  //     requested_date: '2024-07-01',
  //     reason: 'Sick Leave',
  //     is_approved_trainer: true,
  //     is_approved_l_and_d: true,
  //     is_pending: false
  //   }
  // ];
  
  constructor(private datePipe:DatePipe,
    private leaveService: LeaveService
  ) { 
    this.loadLeaveRequests();
  }


  ngOnInit() {

    this.getLeaveRequests();


    this.filteredLeaveRequests = this.LeaveRequests.filter(request => !request.is_pending);

    this.LeaveRequests.forEach(request => {
      request.no_of_days = this.calculateDaysBetween(request.leave_date_from, request.leave_date_to);
      request.leave_date_from = this.formatDate(request.leave_date_from);
      request.leave_date_to = this.formatDate(request.leave_date_to);
      request.leave_date = this.formatDate(request.leave_date);
    });

  }

  calculateDaysBetween(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24) + 1;
    return dayDiff;
  }


  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MMM d, y');
    return formattedDate || '';
  }


  selectedLeave: any;


  openModal(leave: any) {
    this.selectedLeave = leave;
  }

  loadLeaveRequests() {
    this.leaveService.getLeaveRequests().subscribe((leaves: any[]) => {
      this.LeaveRequests = leaves;
      this.pendingLeaveRequests = leaves.filter(leave => leave.isPending);
      this.leaveRequestHistory = leaves.filter(leave => !leave.isPending);
    });
  }

  getLeaveRequests() {
    this.leaveService.getLeaveRequests().subscribe((data: any) => {
      this.LeaveRequests = data;
    });
  }

  approveLeave(leave: any) {
    const approvalData = {
      userId: leave.userId,
      isApproved: true
    };
    this.leaveService.updateApprovalStatus(leave.id, approvalData).subscribe(() => {
      this.getLeaveRequests();
    });
  }

  rejectLeave(leave: any) {
    const approvalData = {
      userId: leave.userId,
      isApproved: false
    };
    this.leaveService.updateApprovalStatus(leave.id, approvalData).subscribe(() => {
      this.getLeaveRequests();
    });
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


