import { Component } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { LeaveRequestCardComponent } from "../../components/leave-request-card/leave-request-card.component";

@Component({
    selector: 'app-leave-request',
    standalone: true,
    templateUrl: './leave-request.component.html',
    styleUrl: './leave-request.component.scss',
    imports: [DropdownComponent, ButtonComponent, ListingCardComponent, LeaveRequestCardComponent]
})
export class LeaveRequestComponent {
  pendingLeaveRequests = [
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      name: 'Amal E A',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      is_approved_trainer: true,
      cardLeftText: '',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      name: 'Devipriya MS',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: true,
      cardLeftText: '',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      name: 'Reshmi M',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: false,
      cardLeftText: '',
      cardLeftIcon: 'bi bi-circle-fill'
    }];

    leaveRequestHistory = [
      {
        cardMainIconSRC: 'assets/Leave-request.svg',
        name: 'Amal E A',
        batch_name: 'ILP Batch 03 2023-24',
        description: 'Sick leave',
        leave_date_from: '2024-07-11',
        leave_date_to: '2024-07-11',
        is_approved_trainer: true,
        cardLeftText: '',
        cardLeftIcon: 'bi bi-circle-fill'
      },
      {
        cardMainIconSRC: 'assets/Leave-request.svg',
        name: 'Devipriya MS',
        batch_name: 'ILP Batch 03 2023-24',
        description: 'Sick leave',
        leave_date_from: '2024-07-11',
        leave_date_to: '2024-07-11',
        is_approved_trainer: false,
        cardLeftText: '',
        cardLeftIcon: 'bi bi-circle-fill'
      },
      {
        cardMainIconSRC: 'assets/Leave-request.svg',
        name: 'Reshmi M',
        batch_name: 'ILP Batch 03 2023-24',
        description: 'Sick leave',
        leave_date_from: '2024-07-11',
        leave_date_to: '2024-07-11',
        is_approved_trainer: false,
        cardLeftText: '',
        cardLeftIcon: 'bi bi-circle-fill'
      }
    ];
  constructor() {
    this.setRequestStatus();
    this.setRequestStatusInHistory();

  }
  setRequestStatus() {
    this.pendingLeaveRequests.forEach(request => {
      if (request.is_approved_trainer) {
        request.cardLeftText = 'Trainer Approved';
      } else {
        request.cardLeftText = 'Trainer Rejected';
      }
    });
  }
  setRequestStatusInHistory() {
    this.leaveRequestHistory.forEach(request => {
      if (request.is_approved_trainer) {
        request.cardLeftText = 'Trainer Approved';
      } else {
        request.cardLeftText = 'Trainer Rejected';
      }
    });
  }

}
