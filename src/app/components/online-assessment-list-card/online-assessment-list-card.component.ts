import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-online-assessment-list-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './online-assessment-list-card.component.html',
  styleUrl: './online-assessment-list-card.component.scss'
})
export class OnlineAssessmentListCardComponent {

  @Input() assessment: any; 

}
