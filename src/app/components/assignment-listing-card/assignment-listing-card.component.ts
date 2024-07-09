import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-assignment-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignment-listing-card.component.html',
  styleUrl: './assignment-listing-card.component.scss'
})
export class AssignmentListingCardComponent {
  @Input() cardItems:any[]=[];

  getLeftIconColor(is_active: boolean): string {
    return is_active ? 'green' : 'red';
}}