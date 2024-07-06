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
@Input() cardMainTitle:string='';
@Input() cardFirstSubTitle:string='';
@Input() cardSecondSubTitle:string='';
@Input() cardLeftText: string='';
@Input() cardStatusFlag: string='';
@Input() cardLeftIcon: string='';
@Input() cardMainIconSRC:string='';
@Input() cardSmallSubTitle:string='';




get cardLeftIconColor(): string {
  if(this.cardStatusFlag=='green'){
    return 'green';
  }
  else if(this.cardStatusFlag=='red'){
    return'red';
  }
  else{
    return 'black';
  }
}
}
