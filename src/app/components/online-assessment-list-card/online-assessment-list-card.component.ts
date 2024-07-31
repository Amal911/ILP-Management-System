import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-online-assessment-list-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './online-assessment-list-card.component.html',
  styleUrl: './online-assessment-list-card.component.scss'
})
export class OnlineAssessmentListCardComponent {

  @Input() assessment: any;
  @Output() assessmentId=new EventEmitter<number>(); 

  emitId(assessmentId:number){
      this.assessmentId = this.assessment.assessmentId;
      console.log(assessmentId);
  }

}
