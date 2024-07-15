import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assessment-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './assessment-details.component.html',
  styleUrl: './assessment-details.component.scss'
})
export class AssessmentDetailsComponent {
  @Input() assessment: any = '';

}
