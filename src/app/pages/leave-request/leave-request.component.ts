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
  LeaveRequests = [
    {
      name: 'Amal E A',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      is_approved_trainer: true,
      is_approved_l_and_d: false,
      is_pending: true
    },
    {
      name: 'Devipriya MS',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: true,
      is_approved_l_and_d: false,
      is_pending: true
    },
    {
      name: 'Reshmi M',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: false,
      is_approved_l_and_d: false,
      is_pending: true
    },
    {
      name: 'Amal E A',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: true,
      is_approved_l_and_d: false,
      is_pending: false
    },
    {
      name: 'Devipriya MS',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: false,
      is_approved_l_and_d: true,
      is_pending: false
    },
    {
      name: 'Reshmi M',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Sick leave',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-11',
      is_approved_trainer: false,
      is_approved_l_and_d: false,
      is_pending: false
    }
    ];
  constructor() {

  }


}
