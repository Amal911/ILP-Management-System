import { Component, OnInit} from '@angular/core';
import { OnlineAssessmentListCardComponent } from '../../components/online-assessment-list-card/online-assessment-list-card.component';
import { NgFor } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-online-assessment-list',
  standalone: true,
  imports: [OnlineAssessmentListCardComponent,NgFor,FormsModule,ReactiveFormsModule],
  templateUrl: './online-assessment-list.component.html',
  styleUrl: './online-assessment-list.component.scss'
})
export class OnlineAssessmentListComponent implements OnInit {

  assessmentForm !: FormGroup;

   pendingAssessments = [
    { title: 'Assessment 1', createdBy: 'Lekshmi A', dueTime: '2024-08-01 10:00 AM',isPending:'true' },
    { title: 'Assessment 2', createdBy: 'Veena ', dueTime: '2024-08-05 02:00 PM',isPending:'false' },
    { title: 'Assessment 3', createdBy: 'Lekshmi A', dueTime: '2024-08-09 09:00 AM',isPending:'true'},
  ];

  completedAssessments = [
    { title: 'Assessment 3', createdBy: 'Veena', dueTime: '2024-07-10 11:00 AM', score: '9',totalScore:10 },
    { title: 'Assessment 4', createdBy: 'Lekshmi A', dueTime: '2024-07-12 03:00 PM', score: '5',totalScore:10  },
    { title: 'Assessment 4', createdBy: 'Lekshmi A', dueTime: '2024-07-12 03:00 PM', score: '9',totalScore:10 }
  ];

  ngOnInit(): void {}

  

}


