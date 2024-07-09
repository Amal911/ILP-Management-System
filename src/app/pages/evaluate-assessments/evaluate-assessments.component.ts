import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { evaluateAssessmentData } from '../../../models/evaluateAssessmentData.interface';

@Component({
  selector: 'app-evaluate-assessments',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,NgIf],
  templateUrl: './evaluate-assessments.component.html',
  styleUrl: './evaluate-assessments.component.scss'
})
export class EvaluateAssessmentsComponent {

  @Input() assessment:evaluateAssessmentData = {
    links: ["https://google.com", "https://wikipedia.com", "https://google.com"],
    docs: ["Screenshot.png", "Document.pdf"],
    totalMarks: 100,
    assessmentTitle: "OOPS Assignment",
    submittedBy: "Kailas Nadh J",
    submittedOn: "27 June 2024",
    submittedAt: "17:30"
  };
  

  public evaluateAssessmentForm= new FormGroup({
    score: new FormControl('',[Validators.required]),
    comments: new FormControl('')
  });


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  onSubmit() {
    if (this.evaluateAssessmentForm.valid) {
      console.log(this.evaluateAssessmentForm.value);
      this.evaluateAssessmentForm.reset();
    } else {
      // Mark all fields as touched to display validation messages
      this.evaluateAssessmentForm.markAllAsTouched();
    }
  }
}
