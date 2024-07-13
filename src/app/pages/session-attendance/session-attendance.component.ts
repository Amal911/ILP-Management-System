import { Component, OnInit } from '@angular/core';
import { SessionDetailsComponent } from '../../components/session-details/session-details.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../components/table/table.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AttendanceTableComponent } from '../../components/attendance-table/attendance-table.component';
import { HollowButtonComponent } from '../../components/hollow-button/hollow-button.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-session-attendance',
  standalone: true,
  imports: [
    SessionDetailsComponent,
    TableModule,
    CommonModule,
    TableComponent,
    ReactiveFormsModule,
    AttendanceTableComponent,
    HollowButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './session-attendance.component.html',
  styleUrl: './session-attendance.component.scss',
})
export class SessionAttendanceComponent implements OnInit {
  // tableData: any[] = [];
  session: any;
  traineeTable: any[] = [];
  absentees: any[] = [];
  searchControl: FormControl = new FormControl('');
  sessionDetails: any;
  attendanceDetails: any;
  ngOnInit() {
    this.session = {
      id: 1,
      session_name: 'Angular Workshop',
      trainer_name: 'John Doe',
      date: '2024-07-11',
      start_time: '10:00',
      end_time: '12:00',
    };

    this.traineeTable = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' },
      { id: 3, name: 'Mark Johnson' },
      { id: 4, name: 'Lucy Brown' },
      { id: 5, name: 'Emma Davis' },
      { id: 6, name: 'Liam Wilson' },
      { id: 7, name: 'Olivia Moore' },
      { id: 8, name: 'Noah Taylor' },
      { id: 9, name: 'Sophia Anderson' },
      { id: 10, name: 'Mason Thomas' },
      { id: 11, name: 'Isabella Jackson' },
      { id: 12, name: 'Ethan White' },
      { id: 13, name: 'Mia Harris' },
      { id: 14, name: 'Aiden Martin' },
      { id: 15, name: 'Ava Lee' },
    ];

    this.absentees = [{ id: 2 }, { id: 5 }, { id: 11 }, { id: 13 }];
  }

  onSessionDetailsEmit(sessionDetails: any) {
    this.sessionDetails = sessionDetails;
  }

  onAttendanceDetailsEmit(attendanceDetails: any) {
    this.attendanceDetails = attendanceDetails;
  }

  onSubmit() {
    if (this.attendanceDetails && this.sessionDetails) {
      const attendees = this.attendanceDetails.columns.map((trainee: any) => ({
        id: trainee.id,
        name: trainee.name,
        attendance: trainee.attendance !== false,
        remarks: trainee.remarks || '',
      }));

      const output = {
        session_id: this.session.id,
        attendees: attendees,
      };

      console.log('Session Wise attendance:', output);
    } else {
      console.log('Session or attendance details are missing.');
    }
  }
}

// output = {
//   sessionid:09,
//   participants=[
//     {},{}
//   ]
// }
