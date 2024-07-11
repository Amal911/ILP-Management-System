import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AppliedleaveCardsComponent } from '../../components/appliedleave-cards/appliedleave-cards.component';

@Component({
  selector: 'app-trainee-leave-request',
  standalone: true,
  imports: [ButtonComponent, AppliedleaveCardsComponent],
  templateUrl: './trainee-leave-request.component.html',
  styleUrl: './trainee-leave-request.component.scss'
})
export class TraineeLeaveRequestComponent {

  pendingLeaveRequests = [
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      name: 'Amal E A',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Hospital Emergency and need a consultation',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      requested_date: '2024-07-01',
      reason: 'Sick Leave',
      is_approved_trainer: true,
      cardLeftText: '',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      name: 'Dharsan C Sajeev',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Hospital Emergency and need a consultation',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      requested_date: '2024-07-01',
      reason: 'Sick Leave',
      is_approved_trainer: true,
      cardLeftText: '',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      name: 'Reshmi M',
      batch_name: 'ILP Batch 03 2023-24',
      description: 'Hospital Emergency and need a consultation',
      leave_date_from: '2024-07-11',
      leave_date_to: '2024-07-12',
      requested_date: '2024-07-01',
      reason: 'Sick Leave',
      is_approved_trainer: true,
      cardLeftText: '',
      cardLeftIcon: 'bi bi-circle-fill'
    }];

}
