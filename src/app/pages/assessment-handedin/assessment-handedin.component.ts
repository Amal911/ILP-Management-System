import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AttendanceTableComponent } from '../../components/attendance-table/attendance-table.component';
import { ButtonComponent } from '../../components/button/button.component';
import { HollowButtonComponent } from '../../components/hollow-button/hollow-button.component';
import { SessionDetailsComponent } from '../../components/session-details/session-details.component';
import { AssessmentDetailsComponent } from "../../components/assessment-details/assessment-details.component";
import { TraineeTableComponent } from "../../components/trainee-table/trainee-table.component";

@Component({
  selector: 'app-assessment-handedin',
  standalone: true,
  imports: [AttendanceTableComponent, ButtonComponent, HollowButtonComponent, SessionDetailsComponent, AssessmentDetailsComponent, TraineeTableComponent],
  templateUrl: './assessment-handedin.component.html',
  styleUrl: './assessment-handedin.component.scss'
})
export class AssessmentHandedinComponent {


  assessment: any;
  traineeTable: any[] = [];
  absentees: any[] = [];
  searchControl: FormControl = new FormControl('');
  assessmentDetails: any;
  handeInDetails: any;
  ngOnInit() {
    this.assessment = {
      id: 1,
      assessment_title: 'GG Hospital',
      description:'Create GG Hospital website using HTML/CSS',
      trainer_name: 'Lekshmi A',
      post_date: '2024-07-11',
      comments:'You may use Bootstrap as well',
      due_date: '2024-07-14',
      end_time: '12:00',
    };

    this.traineeTable = [
      { id: 1, name: 'John Doe', status: 'handed_in', score: 8 },
      { id: 2, name: 'Jane Smith', status: 'pending', score: 7 },
      { id: 3, name: 'Mark Johnson', status: 'handed_in', score: 9 },
      { id: 4, name: 'Lucy Brown', status: 'pending', score: 6 },
      { id: 5, name: 'Emma Davis', status: 'handed_in', score: 10 },
      { id: 6, name: 'Liam Wilson', status: 'pending', score: 5 },
      { id: 7, name: 'Olivia Moore', status: 'handed_in', score: 7 },
      { id: 8, name: 'Noah Taylor', status: 'pending', score: 6 },
      { id: 9, name: 'Sophia Anderson', status: 'handed_in', score: 8 },
      { id: 10, name: 'Mason Thomas', status: 'pending', score: 4 },
      { id: 11, name: 'Isabella Jackson', status: 'handed_in', score: 9 },
      { id: 12, name: 'Ethan White', status: 'pending', score: 5 },
      { id: 13, name: 'Mia Harris', status: 'handed_in', score: 7 },
      { id: 14, name: 'Aiden Martin', status: 'pending', score: 6 },
      { id: 15, name: 'Ava Lee', status: 'handed_in', score: 8 }

    ];
    }

  }
