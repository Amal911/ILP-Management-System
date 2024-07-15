import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listing-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './batch-listing-card.component.html',
  styleUrl: './batch-listing-card.component.scss'
})
export class ListingCardComponent {

@Input() batches:any='';


}
