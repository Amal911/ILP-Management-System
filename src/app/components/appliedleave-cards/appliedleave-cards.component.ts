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

  @Input() cardItems:any[]=[];
}
