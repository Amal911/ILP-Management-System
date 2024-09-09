import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-listing-card.component.html',
  styleUrl: './assignment-listing-card.component.scss',
})
export class AssignmentListingCardComponent {
  @Input() assignments: any;
  constructor(private datePipe: DatePipe) {}
  formatDate(date: string): string {
    const formattedDate = this.datePipe.transform(date, 'MMM d, y');
    return formattedDate || '';
  }
}
