import { SessionService } from './../../services/API/session.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HollowButtonComponent } from '../../components/hollow-button/hollow-button.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AttendanceTableComponent } from '../../components/attendance-table/attendance-table.component';
import { SessionDetailsComponent } from '../../components/session-details/session-details.component';
import { ActivatedRoute } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';

@Component({
  selector: 'app-session-attendance',
  standalone: true,
  imports: [AttendanceTableComponent,ButtonComponent,HollowButtonComponent,SessionDetailsComponent],
  templateUrl: './session-attendance.component.html',
  styleUrl: './session-attendance.component.scss',
})
export class SessionAttendanceComponent implements OnInit {
  session: any;
  traineeTable: any[] = [];
  absentees: any[] = [];
  searchControl: FormControl = new FormControl('');
  sessionDetails: any;
  attendanceDetails: any;

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private sessionService:SessionService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadSessionDetails(+id);
    }


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
        TraineeId: trainee.id,
      IsPresent: trainee.attendance,
      Remarks: trainee.remarks || '',
      }));

      const output = {
        sessionId: this.session.id,
        attendees: attendees,
      }; this.sessionService.PostAttendance(output).subscribe(
        (response) => {
          console.log('Attendance added successfully:', response);
        },
        (error) => {
          console.error('Error adding attendance:', error);
        }
      );
    }else {
      console.log('Session or attendance details are missing.');
    }
  }

  loadSessionDetails(id: number) {
    this.scheduleService.fetchSession(id).subscribe(
      (response) => {
        if (response.isSuccess) {
          console.log(response);
          this.session = {
            id: response.result.id,
            session_name: response.result.sessionName,
            trainer_name: response.result.trainerId,
            sessionDescription: response.result.sessionDescription,
            date: new Date(response.result.startTime).toISOString().split('T')[0],
            start_time: new Date(response.result.startTime).toTimeString().slice(0, 5),
            end_time: new Date(response.result.endTime).toTimeString().slice(0, 5),
          };
        } else {
          console.error('Failed to load session details:', response.message);
        }
      },
      (error) => {
        console.error('Error loading session details:', error);
      }
    );
  }
}


