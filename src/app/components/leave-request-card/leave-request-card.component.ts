import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-leave-request-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave-request-card.component.html',
  styleUrl: './leave-request-card.component.scss'
})
export class LeaveRequestCardComponent {
  @Input() cardItems:any[]=[];

  getLeftIconColor(is_approved_trainer: boolean): string {
    return is_approved_trainer ? 'green' : 'red';
  }

}
