import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-card.component.html',
  styleUrl: './listing-card.component.scss'
})
export class ListingCardComponent {

@Input() cardItems:any[]=[];

getLeftIconColor(cardStatusFlag: string): string {
  if (cardStatusFlag === 'green') {
    return 'green';
  } else if (cardStatusFlag === 'red') {
    return 'red';
  } else {
    return 'black';
  }
}
}
