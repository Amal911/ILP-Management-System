import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-appliedleave-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appliedleave-cards.component.html',
  styleUrl: './appliedleave-cards.component.scss'
})
export class AppliedleaveCardsComponent {

  @Input() leaves:any;

  getLeaveStatus(isPending: (boolean | null)[]): string {
    if (isPending.every(status => status === true)) {
      return 'Approved';
    }
    if (isPending.some(status => status === false)) {
      return 'Rejected';
    }
    if (isPending.some(status => status === null)) {
      return 'Pending';
    }
    return 'Unknown';
  }

  getLeaveStatusColor(isPending: (boolean | null)[]): string {
    if (isPending.every(status => status === true)) {
      return 'green';
    }
    if (isPending.some(status => status === false)) {
      return 'red';
    }
    if (isPending.some(status => status === null)) {
      return 'orange';
    }
    return 'black';
  }
}
