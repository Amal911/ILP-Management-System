import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-session-details',
  standalone: true,
  imports: [],
  templateUrl: './session-details.component.html',
  styleUrl: './session-details.component.scss',
})
export class SessionDetailsComponent implements OnInit {
  @Input() session: any = '';
  @Output() assessmentDetailsEmitter = new EventEmitter<any>();

  emitAssessmentDetails() {
    this.assessmentDetailsEmitter.emit(this.session);
  }

  ngOnInit() {
    this.emitAssessmentDetails();
  }
}
