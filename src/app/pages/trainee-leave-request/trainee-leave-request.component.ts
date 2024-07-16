import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AppliedleaveCardsComponent } from '../../components/appliedleave-cards/appliedleave-cards.component';
import { ApplyleavemodalComponent } from '../../components/applyleavemodal/applyleavemodal.component';

@Component({
  selector: 'app-trainee-leave-request',
  standalone: true,
  imports: [ButtonComponent, AppliedleaveCardsComponent, ApplyleavemodalComponent],
  templateUrl: './trainee-leave-request.component.html',
  styleUrl: './trainee-leave-request.component.scss'
})
export class TraineeLeaveRequestComponent {

  LeaveRequests = [
    {
      name: 'Amal E A',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Hospital Emergency and need a consultation',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      requested_date: '2024-07-01',
      reason: 'Sick Leave',
      is_approved_trainer: true,
      is_approved_l_and_d: false,
    },
    {
      name: 'Dharsan C Sajeev',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Hospital Emergency and need a consultation',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      requested_date: '2024-07-01',
      reason: 'Sick Leave',
      is_approved_trainer: false,
      is_approved_l_and_d: false,
    },
    {
      name: 'Reshmi M',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Hospital Emergency and need a consultation',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      requested_date: '2024-07-01',
      reason: 'Sick Leave',
      is_approved_trainer: true,
      is_approved_l_and_d: true,
    }];

}
